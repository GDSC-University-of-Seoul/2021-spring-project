'use strict';
const fs = require('fs');

const cctvsBuffer = fs.readFileSync('../../.dummy/500cctvs_jeju_sejong.json');
const cctvsJson = cctvsBuffer.toString();
const cctvs = JSON.parse(cctvsJson);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cctv', cctvs);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cctv', { install_date: ['2021-08-24'] });
  },
};
