'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('cctv', [
      {
        cctv_id: uuidv4(),
        cctv_name: '제주1반_1',
        cctv_mac: '44C4153B5737',
        quality: 'HD',
        install_date: '2015-09-01',
        center_id: '49110000558',
      },
      {
        cctv_id: uuidv4(),
        cctv_name: '제주2반_1',
        cctv_mac: '0A2B3C4D5E6F',
        quality: 'HD',
        install_date: '2015-09-01',
        center_id: '49110000606',
      },
      {
        cctv_id: uuidv4(),
        cctv_name: '제주3반_1',
        cctv_mac: '5A564D3F2916',
        quality: 'HD',
        install_date: '2015-09-01',
        center_id: '49110000224',
      },
      {
        cctv_id: uuidv4(),
        cctv_name: '서귀포반_1',
        cctv_mac: '154D6E881337',
        quality: 'HD',
        install_date: '2015-09-01',
        center_id: '49130000165',
      },
      {
        cctv_id: uuidv4(),
        cctv_name: '서귀포2반_1',
        cctv_mac: '8A5C1D0F0B9E',
        quality: 'HD',
        install_date: '2015-07-15',
        center_id: '49130000076',
      },
      {
        cctv_id: uuidv4(),
        cctv_name: '서귀포3반_1',
        cctv_mac: '04850B9B1A07',
        quality: 'HD',
        install_date: '2015-07-15',
        center_id: '49130000129',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cctv', {
      cctv_mac: [
        '44C4153B5737',
        '0A2B3C4D5E6F',
        '5A564D3F2916',
        '154D6E881337',
        '8A5C1D0F0B9E',
        '04850B9B1A07',
      ],
    });
  },
};
