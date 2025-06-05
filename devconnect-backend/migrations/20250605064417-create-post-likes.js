module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostLikes', {
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'postId', // Ensures exact casing
        references: { model: 'Posts', key: 'id' },
        onDelete: 'CASCADE'
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'userId', // Ensures exact casing
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostLikes');
  }
};
