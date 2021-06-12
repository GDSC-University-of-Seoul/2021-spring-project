'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cctvs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cctv_id: {
        type: Sequelize.INTEGER,
      },
      area_id: {
        type: Sequelize.INTEGER,
      },
      install_date: {
        type: Sequelize.DATE,
      },
      quality: {
        type: Sequelize.ENUM,
      },
      uninstall_date: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cctvs');
  },
};
