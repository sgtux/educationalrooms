module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('RoomQuestion',
    ['roomId', 'questionId'], {
      type: 'unique',
      name: 'pk_room_question'
    }),
  down: (queryInterface, Sequelize) => null
}