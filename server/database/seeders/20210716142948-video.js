'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('video', [{
      video_id : uuidv4(),
      record_date : '2021-07-07',
      storage_name : '한화테크윈 HRX-421',
      cctv_id : '82b04708-cb9f-4a57-9472-889defb7b478'
    },{
      video_id : uuidv4(),
      record_date : '2020-09-11',
      storage_name : '한화테크윈 HRX-421',
      cctv_id : '82b04708-cb9f-4a57-9472-889defb7b478'
    },{
      video_id : uuidv4(),
      record_date : '2019-12-20',
      storage_name : '한화테크윈 HRX-421',
      cctv_id : 'b6895708-c8f6-4f03-85bb-9e430ab2603f'
    },{
      video_id : uuidv4(),
      record_date : '2019-12-21',
      storage_name : '한화테크윈 HRX-421',
      cctv_id : '583e9e13-017a-4b95-ab59-158ff1840b41'
    },{
      video_id : uuidv4(),
      record_date : '2020-04-05',
      storage_name : '한화테크윈 HRX-421',
      cctv_id : 'acfd8797-c61b-4311-963a-b8bdcbd246a6'
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('video', null);
  }
};
