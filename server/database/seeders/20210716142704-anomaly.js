'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('anomaly', [{
      anomaly_type : '폭행',
      start_time : '12:04:03',
      end_time : '12:04:30',
      follow_up : '이상행동감지',
      video_id : '1'
    },{
      anomaly_type : '폭행',
      start_time : '14:12:34',
      end_time : '14:13:21',
      follow_up : '이상행동감지',
      video_id : '2'
    },{
      anomaly_type : '실신',
      start_time : '10:59:58',
      end_time : '11:02:41',
      follow_up : '이상행동감지',
      video_id : '3'
    },{
      anomaly_type : '실신',
      start_time : '11:34:04',
      end_time : '11:34:23',
      follow_up : '이상행동감지',
      video_id : '5'
    },{
      anomaly_type : '싸움',
      start_time : '13:21:34',
      end_time : '13:23:31',
      follow_up : '이상행동감지',
      video_id : '4'
    },{
      anomaly_type : '폭행',
      start_time : '13:21:34',
      end_time : '13:21:51',
      follow_up : '이상행동감지',
      video_id : '4'
    },{
      anomaly_type : '폭행',
      start_time : '13:22:05',
      end_time : '13:22:16',
      follow_up : '이상행동감지',
      video_id : '4'
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('anomaly', null);
  }
};
