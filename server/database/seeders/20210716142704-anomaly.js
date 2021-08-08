'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('anomaly', [
      {
        anomaly_type: '폭행',
        start_time: '2021-07-07 12:04:03',
        end_time: '2021-07-07 12:04:30',
        follow_up: '이상행동감지',
        video_id: 'afd78c67-6be4-4e6d-b650-2d4f79028d9c',
      },
      {
        anomaly_type: '폭행',
        start_time: '2020-09-11 14:12:34',
        end_time: '2020-09-11 14:13:21',
        follow_up: '이상행동감지',
        video_id: '4de40bdc-64e8-4970-847d-eedb9a793bd1',
      },
      {
        anomaly_type: '실신',
        start_time: '2019-12-20 10:59:58',
        end_time: '2019-12-20 11:02:41',
        follow_up: '이상행동감지',
        video_id: 'b91dd4f6-2255-464c-9611-0ed8cc64f2bd',
      },
      {
        anomaly_type: '실신',
        start_time: '2020-04-05 11:34:04',
        end_time: '2020-04-05 11:34:23',
        follow_up: '이상행동감지',
        video_id: 'ddee1140-ce74-4082-951a-c24b0dce6462',
      },
      {
        anomaly_type: '싸움',
        start_time: '2019-12-21 13:21:34',
        end_time: '2019-12-21 13:23:31',
        follow_up: '이상행동감지',
        video_id: '7cf43025-c13e-4a2a-a31f-d4d5fa14f713',
      },
      {
        anomaly_type: '폭행',
        start_time: '2019-12-21 13:21:34',
        end_time: '2019-12-21 13:21:51',
        follow_up: '이상행동감지',
        video_id: '7cf43025-c13e-4a2a-a31f-d4d5fa14f713',
      },
      {
        anomaly_type: '폭행',
        start_time: '2019-12-21 13:22:05',
        end_time: '2019-12-21 13:22:16',
        follow_up: '이상행동감지',
        video_id: '7cf43025-c13e-4a2a-a31f-d4d5fa14f713',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('anomaly', null);
  },
};
