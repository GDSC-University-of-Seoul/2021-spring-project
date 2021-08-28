'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('anomaly', [
      {
        anomaly_type: '폭행',
        start_time: '2021-07-07 12:04:03',
        end_time: '2021-07-07 12:04:30',
        follow_up: '이상행동감지',
        video_id: 'a7bc64a3-66e5-4d16-8ba4-21eeb2c473fd',
      },
      {
        anomaly_type: '폭행',
        start_time: '2021-07-08 14:12:34',
        end_time: '2021-07-08 14:13:21',
        follow_up: '이상행동감지',
        video_id: '258bc667-07ab-4ec8-b267-8f6d4d0bafb7',
      },
      {
        anomaly_type: '실신',
        start_time: '2021-07-07 10:59:58',
        end_time: '2021-07-07 11:02:41',
        follow_up: '이상행동감지',
        video_id: '7aa78db4-7ab6-47c6-8d0f-a78ed5a344aa',
      },
      {
        anomaly_type: '실신',
        start_time: '2021-07-07 11:34:04',
        end_time: '2021-07-07 11:34:23',
        follow_up: '이상행동감지',
        video_id: '9b06567c-329c-472e-857a-852b0c037bd5',
      },
      {
        anomaly_type: '싸움',
        start_time: '2021-07-07 13:21:34',
        end_time: '2021-07-07 13:23:31',
        follow_up: '이상행동감지',
        video_id: '9b06567c-329c-472e-857a-852b0c037bd5',
      },
      {
        anomaly_type: '폭행',
        start_time: '2021-07-07 13:21:34',
        end_time: '2021-07-07 13:21:51',
        follow_up: '이상행동감지',
        video_id: 'f0e00e0d-90d1-48a9-9e97-8045f8934cd7',
      },
      {
        anomaly_type: '폭행',
        start_time: '2021-07-07 13:22:05',
        end_time: '2021-07-07 13:22:16',
        follow_up: '이상행동감지',
        video_id: 'f0e00e0d-90d1-48a9-9e97-8045f8934cd7',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('anomaly', {
      start_time: [
        '2021-07-07 13:22:05+00',
        '2021-07-07 13:21:34+00',
        '2021-07-07 11:34:04+00',
        '2021-07-07 10:59:58+00',
        '2021-07-08 14:12:34+00',
        '2021-07-07 12:04:03+00',
      ],
    });
  },
};
