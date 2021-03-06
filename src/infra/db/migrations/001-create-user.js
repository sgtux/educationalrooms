module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('User', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      defaultValue: ''
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    },
    type: {
      type: Sequelize.CHAR(1),
      defaultValue: ''
    }
  }, {
      freezeTableName: 'User',
      undercored: false,
      updatedAt: false,
      createdAt: false
    }),
  down: (queryInterface) => queryInterface.dropTable('User')
}