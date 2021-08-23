'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('video', [
      {
        video_id: uuidv4(),
        record_date: '2021-08-12',
        storage_name: '한화테크윈 HRX-421',
        cctv_id: '6565cdb9-815e-4487-b370-459edafe414e',
      },
      {
        video_id: uuidv4(),
        record_date: '2021-08-12',
        storage_name: '한화테크윈 HRX-421',
        cctv_id: '40784ca9-5532-4a30-8ee0-e4e6ae5e490a',
      },
      {
        video_id: uuidv4(),
        record_date: '2021-08-12',
        storage_name: '한화테크윈 HRX-421',
        cctv_id: '15a7f2ad-20f2-4a5e-afe7-18cfcd0336b3',
      },
      {
        video_id: uuidv4(),
        record_date: '2021-08-12',
        storage_name: '한화테크윈 HRX-421',
        cctv_id: '2d1ace82-9d56-4431-b12a-5cc8ef2f5501',
      },
      {
        video_id: uuidv4(),
        record_date: '2021-08-12',
        storage_name: '한화테크윈 HRX-421',
        cctv_id: 'fb5fb955-a748-4eb3-bf8d-d1a621587050',
      },
      {
        video_id: uuidv4(),
        record_date: '2021-08-12',
        storage_name: '한화테크윈 HRX-421',
        cctv_id: '91efe5cf-7bda-45c9-b726-7e39bbb8413c',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('video', { record_date: ['2021-08-12'] });
  },
};
