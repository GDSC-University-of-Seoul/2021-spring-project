'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('cctv', [
      {
        cctv_id: uuidv4(),
        cctv_name: '참새반_1',
        cctv_mac: '54C4153B5737',
        quality: 'HD',
        install_date: '2015-09-01',
        center_id: '11110000143',
      },
      {
        cctv_id: uuidv4(),
        cctv_name: '병아리반_1',
        cctv_mac: '1A2B3C4D5E6F',
        quality: 'HD',
        install_date: '2015-09-01',
        center_id: '11110000143',
      },
      {
        cctv_id: uuidv4(),
        cctv_name: '토끼반_1',
        cctv_mac: '6A5S4D3F2G1H',
        quality: 'HD',
        install_date: '2015-09-01',
        center_id: '11110000143',
      },
      {
        cctv_id: uuidv4(),
        cctv_name: '거북이반_1',
        cctv_mac: '2Q4W6E8R1T3Y',
        quality: 'HD',
        install_date: '2015-09-01',
        center_id: '11110000143',
      },
      {
        cctv_id: uuidv4(),
        cctv_name: '영아1반_1',
        cctv_mac: '9H5S1I0G0B9E',
        quality: 'HD',
        install_date: '2015-07-15',
        center_id: '11110000019',
      },
      {
        cctv_id: uuidv4(),
        cctv_name: '영아2반_1',
        cctv_mac: '9S8Y0B9B1A0R',
        quality: 'HD',
        install_date: '2015-07-15',
        center_id: '11110000019',
      },
      {
        cctv_name: '유아1반_1',
        cctv_mac: '0A182D3D4D5B',
        quality: 'HD',
        install_date: '2015-04-30',
        center_id: '11110000019',
      },
      {
        cctv_id: uuidv4(),
        cctv_name: '유아2반_1',
        cctv_mac: '1234567890AB',
        quality: 'HD',
        install_date: '2015-04-30',
        center_id: '11110000019',
      },
      {
        cctv_name: '개나리반_1',
        cctv_mac: '12C4B6987654',
        quality: 'HD',
        install_date: '2020-02-20',
        center_id: '11110000174',
      },
      {
        cctv_id: uuidv4(),
        cctv_name: '장미반_1',
        cctv_mac: '6B5W4C3Y2Q1J',
        quality: 'HD',
        install_date: '2020-02-20',
        center_id: '11110000174',
      },
      {
        cctv_id: uuidv4(),
        cctv_name: '보리수반_1',
        cctv_mac: '3Q5E8G0V2J7W',
        quality: 'HD',
        install_date: '2020-02-20',
        center_id: '11110000174',
      },
      {
        cctv_id: uuidv4(),
        cctv_name: '목화반_1',
        cctv_mac: '6M8C5D0W3C7D',
        quality: 'HD',
        install_date: '2020-02-20',
        center_id: '11110000174',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cctv', null);
  },
};
