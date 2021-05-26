'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('video_managements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      manage_id: {
        type: Sequelize.INTEGER
      },
      manage_type: {
        type: Sequelize.ENUM
      },
      manage_date: {
        type: Sequelize.DATE
      },
      requester_id: {
        type: Sequelize.INTEGER
      },
      video_id: {
        type: Sequelize.INTEGER
      },
      purpose: {
        type: Sequelize.ENUM
      },
      monitor_time: {
        type: Sequelize.TIME
      },
      area_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('video_managements');
  }
};