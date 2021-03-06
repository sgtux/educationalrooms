import Sequelize from 'sequelize'
import * as User from './user'
import * as Log from './log'
import * as Question from './question'
import * as Answer from './answer'
import * as Room from './room'
import * as RoomUser from './roomUser'
import * as RoomQuestion from './roomQuestion'
import * as Notif from './notification'
import * as OnlineRoom from './onlineRoom'
import * as RoomAnswer from './roomAnswer'

import config from '../../config'

const env = config.NODE_ENV
const DbConfig = config[env]

const sequelize = env !== 'test'
  ? new Sequelize(DbConfig.DATABASE_URI, {
    dialect: config[env].dialect,
    logging: config[env].logging,
    dialectOptions: config[env].dialectOptions,
    operatorsAliases: false
  })
  : new Sequelize('quizroom', null, null, DbConfig)

let db = {}

db.Log = sequelize.define(Log.modelName, Log.modelAttributes, Log.modelOptions)

db.User = sequelize.define(User.modelName, User.modelAttributes, User.modelOptions)

db.Question = sequelize.define(Question.modelName, Question.modelAttributes, Question.modelOptions)

db.Answer = sequelize.define(Answer.modelName, Answer.modelAttributes, Answer.modelOptions)

db.Room = sequelize.define(Room.modelName, Room.modelAttributes, Room.modelOptions)

db.RoomUser = sequelize.define(RoomUser.modelName, RoomUser.modelAttributes, RoomUser.modelOptions)

db.RoomQuestion = sequelize.define(RoomQuestion.modelName, RoomQuestion.modelAttributes, RoomQuestion.modelOptions)

db.Notification = sequelize.define(Notif.modelName, Notif.modelAttributes, Notif.modelOptions)

db.OnlineRoom = sequelize.define(OnlineRoom.modelName, OnlineRoom.modelAttributes, OnlineRoom.modelOptions)

db.RoomAnswer = sequelize.define(RoomAnswer.modelName, RoomAnswer.modelAttributes, RoomAnswer.modelOptions)

db.Question.hasMany(db.Answer, {
  foreignKey: {
    name: 'questionId',
    allowNull: false
  }
})

db.User.hasMany(db.Question, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  }
})

db.User.hasMany(db.Room, { foreignKey: 'userId' })

db.Room.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' })

db.Room.hasMany(db.RoomUser, { foreignKey: 'roomId' })

db.RoomUser.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' })

db.Room.hasMany(db.RoomQuestion, { foreignKey: 'roomId' })

db.RoomQuestion.belongsTo(db.Question, { foreignKey: 'questionId', targetKey: 'id' })

db.User.hasMany(db.Notification, { foreignKey: 'userId' })

db.Room.hasMany(db.RoomAnswer, { foreignKey: 'roomId' })

db.RoomAnswer.belongsTo(db.User, { foreignKey: 'userId' })

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db