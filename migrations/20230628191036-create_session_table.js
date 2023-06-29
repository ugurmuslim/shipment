'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('shopify_sessions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      shop: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isOnline: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      expires: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      scope: {
        type: Sequelize.STRING(1024),
        allowNull: true,
      },
      accessToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      onlineAccessInfo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      authKey: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('shopify_sessions');
  },
};
