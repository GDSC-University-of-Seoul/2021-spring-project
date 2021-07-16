'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('video', [{
      record_date : '21-07-07',
      storage_name : '한화테크윈 HRX-421',
      cctv_id : '1'
    },{
      record_date : '20-09-11',
      storage_name : '한화테크윈 HRX-421',
      cctv_id : '1'
    },{
      record_date : '19-12-20',
      storage_name : '한화테크윈 HRX-421',
      cctv_id : '3'
    },{
      record_date : '19-12-21',
      storage_name : '한화테크윈 HRX-421',
      cctv_id : '7'
    },{
      record_date : '20-04-05',
      storage_name : '한화테크윈 HRX-421',
      cctv_id : '6'
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('video', null);
  }
};
