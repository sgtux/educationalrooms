import { throwValidationError, handlerError } from '../helpers/error'

import db from '../infra/db/models/index'

const { sequelize, Question, Answer } = db

const validate = (question) => {

  if (!question || !question.description)
    throwValidationError('Descrição inválida.')

  const { points, answers } = question

  if (!Array.isArray(question.answers) || question.answers.length != 4)
    throwValidationError('A questão deve ter 4 respostas.')
  if (isNaN(points) || points < 1 || points > 10)
    throwValidationError('Os pontos devem estar entre 1 and 10.')
  let corrects = 0
  for (let i = 0; i < answers.length; i++) {
    const answer = answers[i]
    if (answer.correct)
      corrects++
    if (!answer.description)
      throwValidationError('A questão possui respostas sem descrição.')
  }
  if (corrects != 1)
    throwValidationError('A questão deve possuir 1 resposta correta.')
}

const toResult = (questions) => {
  if (Array.isArray(questions))
    return questions.map(q => toResult(q))
  else
    return {
      id: questions.id,
      description: questions.description,
      points: questions.points,
      answers: questions.Answers,
      shared: questions.shared,
      userId: questions.userId
    }
}

export default {

  getById: async (req, res) => {
    const { id } = req.params
    const question = await Question.findOne({ include: Answer, where: { id: id } })
    res.json(toResult(question))
  },

  getMy: async (req, res) => {
    const questions = await Question.findAll({ include: Answer, where: { userId: req.claims.id } })
    res.json(toResult(questions))
  },

  getOthers: async (req, res) => {
    const questions = await Question.findAll({
      include: Answer,
      where: sequelize.and(
        { userId: { [sequelize.Op.ne]: req.claims.id } },
        { shared: true }
      )
    })
    res.json(toResult(questions))
  },

  create: async (req, res) => {
    const question = req.body
    const transaction = await sequelize.transaction()
    try {
      question.userId = req.claims.id
      validate(question)
      const questionDB = await Question.create(question, { transaction: transaction })
      const { answers } = question
      for (let i = 0; i < answers.length; i++) {
        answers[i].questionId = questionDB.id
        await Answer.create(answers[i], { transaction: transaction })
      }
      transaction.commit()
      res.json({ message: 'Criado com sucesso.' })
    } catch (ex) {
      transaction.rollback()
      handlerError(ex, res, req)
    }
  },

  update: async (req, res) => {
    const question = req.body
    let transaction = null
    try {

      const questionDb = await Question.findOne({ include: Answer, where: { id: question.id } })

      if (questionDb.userId != req.claims.id)
        throwValidationError('Usuário sem permissão para alterar o item.')

      validate(question)

      question.userId = req.claims.id

      transaction = await sequelize.transaction()
      await Question.update(question, {
        where: { id: question.id },
        transaction: transaction
      })
      const { answers } = question
      for (let i = 0; i < answers.length; i++)
        await Answer.update(answers[i], {
          where: { id: answers[i].id },
          transaction: transaction
        })
      transaction.commit()
      res.json({ message: 'Atualizado com sucesso.' })
    } catch (ex) {
      if (transaction)
        transaction.rollback()
      handlerError(ex, res, req)
    }
  },

  remove: async (req, res) => {
    const { id } = req.params
    const transaction = await sequelize.transaction()
    try {
      const question = await Question.findOne({ where: { id: id } })
      if (!question)
        throwValidationError('A questão não existe.')
      if (question.userId != req.claims.id)
        throwValidationError('Usuário sem permissão para remover o item.')

      await Answer.destroy({ where: { questionId: id }, transaction: transaction })
      await Question.destroy({ where: { id: id }, transaction: transaction })

      transaction.commit()
      res.json({ message: 'Questão removida com sucesso.' })
    } catch (ex) {
      transaction.rollback()
      handlerError(ex, res, req)
    }
  }
}