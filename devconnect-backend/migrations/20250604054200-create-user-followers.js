'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserFollowers', {
      followerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      followingId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });

    // Optionally add a unique constraint to avoid duplicates
    await queryInterface.addConstraint('UserFollowers', {
      fields: ['followerId', 'followingId'],
      type: 'unique',
      name: 'unique_follow_relationship'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserFollowers');
  }
};
