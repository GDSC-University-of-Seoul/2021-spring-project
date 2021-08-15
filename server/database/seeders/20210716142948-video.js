'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('video', [
      {
        video_id: uuidv4(),
        record_date: '2021-07-07',
        storage_name: '한화테크윈 HRX-421',
        cctv_id: 'da669f9a-a757-4e31-aa5f-1eba583ac903',
      },
      {
        video_id: uuidv4(),
        record_date: '2020-09-11',
        storage_name: '한화테크윈 HRX-421',
        cctv_id: 'da669f9a-a757-4e31-aa5f-1eba583ac903',
      },
      {
        video_id: uuidv4(),
        record_date: '2019-12-20',
        storage_name: '한화테크윈 HRX-421',
        cctv_id: '48096782-fba4-4c18-aa66-d25154ef5a63',
      },
      {
        video_id: uuidv4(),
        record_date: '2019-12-21',
        storage_name: '한화테크윈 HRX-421',
        cctv_id: '14f6aff1-d9f6-423d-b64d-bd0f382387e4',
      },
      {
        video_id: uuidv4(),
        record_date: '2020-04-05',
        storage_name: '한화테크윈 HRX-421',
        cctv_id: 'a9019d4b-f549-4e44-b00d-a552626f2743',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('video', null);
  },
};
