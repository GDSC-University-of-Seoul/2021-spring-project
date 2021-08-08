'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('anomaly', [
      {
        anomaly_type: '폭행',
        start_time: '2021-07-07 12:04:03',
        end_time: '2021-07-07 12:04:30',
        follow_up: '이상행동감지',
        video_id: 'e12ef583-2389-4e15-8b8a-96307472d691',
      },
      {
        anomaly_type: '폭행',
        start_time: '2021-09-11 14:12:34',
        end_time: '2021-09-11 14:13:21',
        follow_up: '이상행동감지',
        video_id: '972bcd11-9c22-44e6-ab4b-1769619b8f96',
      },
      {
        anomaly_type: '실신',
        start_time: '2021-12-20 10:59:58',
        end_time: '2021-12-20 11:02:41',
        follow_up: '이상행동감지',
        video_id: '837cc7d5-c9cf-431b-8a50-1a45ae388570',
      },
      {
        anomaly_type: '실신',
        start_time: '2020-04-05 11:34:04',
        end_time: '2020-04-05 11:34:23',
        follow_up: '이상행동감지',
        video_id: 'ee75d938-60a1-40f7-9b48-5156f78f7d33',
      },
      {
        anomaly_type: '싸움',
        start_time: '2019-12-21 13:21:34',
        end_time: '2019-12-21 13:23:31',
        follow_up: '이상행동감지',
        video_id: '0cd53e40-65c0-4ce6-9212-193fb7c3113a',
      },
      {
        anomaly_type: '폭행',
        start_time: '2019-12-21 13:21:34',
        end_time: '2019-12-21 13:21:51',
        follow_up: '이상행동감지',
        video_id: '0cd53e40-65c0-4ce6-9212-193fb7c3113a',
      },
      {
        anomaly_type: '폭행',
        start_time: '2019-12-21 13:22:05',
        end_time: '2019-12-21 13:22:16',
        follow_up: '이상행동감지',
        video_id: '0cd53e40-65c0-4ce6-9212-193fb7c3113a',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('anomaly', null);
  },
};
