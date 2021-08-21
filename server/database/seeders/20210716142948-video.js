'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('video', [
      {
        video_id: uuidv4(), // a7b
        record_date: '2021-07-07',
        storage_name: '한화테크윈 HRX-421',
        cctv_id: 'da669f9a-a757-4e31-aa5f-1eba583ac903', // 143
      },
      {
        video_id: uuidv4(), // 258
        record_date: '2021-07-08',
        storage_name: '한화테크윈 HRX-421',
        cctv_id: 'da669f9a-a757-4e31-aa5f-1eba583ac903', // 143
      },
      {
        video_id: uuidv4(), // 7aa
        record_date: '2021-07-07',
        storage_name: '한화테크윈 HRX-421',
        cctv_id: '48096782-fba4-4c18-aa66-d25154ef5a63', // 143
      },
      {
        video_id: uuidv4(), // 9b0
        record_date: '2021-07-07',
        storage_name: '한화테크윈 HRX-421',
        cctv_id: '14f6aff1-d9f6-423d-b64d-bd0f382387e4', // 019
      },
      {
        video_id: uuidv4(), // f0e
        record_date: '2021-07-07',
        storage_name: '한화테크윈 HRX-421',
        cctv_id: 'a9019d4b-f549-4e44-b00d-a552626f2743', // 019
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('video', {
      record_date: ['2021-07-08', '2021-07-07'],
    });
  },
};
