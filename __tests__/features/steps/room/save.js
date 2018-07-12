import { Given, When, Then } from 'cucumber'
import supertest from 'supertest'
import { expect } from 'chai'

import app from '../../../../src/server'

const request = supertest(app)
let room = null
let token = ''

Given('Dado eu que queira entrar ou sair de uma sala', () => {

  room = { id: 2, associate: true }

  return request
    .post('/api/token')
    .send({ email: 'questionmock1@mail.com', password: '123qwe' })
    .then((result) => {
      token = result.body.token
    })
})

When('Quando eu entrar ou sair de uma sala {string} atribuindo {string}', (caso, p) => {

  if (p) {
    const props = JSON.parse(p)
    for (let key in props)
      room[key] = props[key]
  }
  else
    room = null
})

Then('Então eu devo obter a mensagem {string} depois de entrar ou sair da sala', (message) => {
  return request
    .put('/api/room-associate')
    .set({ token: token })
    .send(room)
    .then((result) => {
      expect(result.body.message).to.eql(message)
    })
})

Given('Dado eu que queira salvar uma sala', () => {
  room = {
    name: 'sala de mock test',
    questions: [
      { id: 16, order: 1 },
      { id: 17, order: 2 },
      { id: 18, order: 3 }
    ],
    roomId: 1
  }

  return request
    .post('/api/token')
    .send({ email: 'test_room@mail.com', password: '123qwe' })
    .then((result) => {
      token = result.body.token
    })
})

When('Quando enviar {string} atribuindo {string}', (caso, p) => {
  if (p) {
    const props = JSON.parse(p)
    for (let key in props)
      room[key] = props[key]
  }
  else
    room = null
})

Then('Então eu devo obter a mensagem {string} depois de salvar a sala', (message) => {
  return request
    .post('/api/room')
    .set({ token: token })
    .send(room)
    .then((result) => {
      expect(result.body.message).to.eql(message)
    })
})