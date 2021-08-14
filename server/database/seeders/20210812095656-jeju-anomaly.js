'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('anomaly', [
      {
        anomaly_type: '싸움',
        start_time: '2021-08-12 12:00:00',
        end_time: '2021-08-12 12:04:30',
        follow_up: '이상행동감지',
        video_id: 'e74585e1-625a-4f39-8bfc-54055442a4e9',
      },
      {
        anomaly_type: '싸움',
        start_time: '2021-08-12 12:00:00',
        end_time: '2021-08-12 12:04:30',
        follow_up: '이상행동감지',
        video_id: '4963b203-7119-4282-93bf-55b69cdc7ff8',
      },
      {
        anomaly_type: '싸움',
        start_time: '2021-08-12 12:00:00',
        end_time: '2021-08-12 12:04:30',
        follow_up: '이상행동감지',
        video_id: '539e094b-79b4-4be6-b673-95aafe1999e6',
      },
      {
        anomaly_type: '싸움',
        start_time: '2021-08-12 12:00:00',
        end_time: '2021-08-12 12:04:30',
        follow_up: '이상행동감지',
        video_id: 'a6a19cd6-9b06-4e9b-a721-1f5face5f431',
      },
      {
        anomaly_type: '싸움',
        start_time: '2021-08-12 12:00:00',
        end_time: '2021-08-12 12:04:30',
        follow_up: '이상행동감지',
        video_id: '2fa71364-343e-4c17-9a74-d370b11f4392',
      },
      {
        anomaly_type: '싸움',
        start_time: '2021-08-12 12:00:00',
        end_time: '2021-08-12 12:04:30',
        follow_up: '이상행동감지',
        video_id: '948a6cfc-607a-4cfc-beec-f61259769797',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('anomaly', null);
  },
};
