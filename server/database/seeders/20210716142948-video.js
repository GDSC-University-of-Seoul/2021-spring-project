'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('video', [{
      record_date : '2021-07-07',
      storage_name : '한화테크윈 HRX-421',
      cctv_id : '1'
    },{
      record_date : '2020-09-11',
      storage_name : '한화테크윈 HRX-421',
      cctv_id : '1'
    },{
      record_date : '2019-12-20',
      storage_name : '한화테크윈 HRX-421',
      cctv_id : '3'
    },{
      record_date : '2019-12-21',
      storage_name : '한화테크윈 HRX-421',
      cctv_id : '7'
    },{
      record_date : '2020-04-05',
      storage_name : '한화테크윈 HRX-421',
      cctv_id : '6'
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('video', null);
  }
};
