'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('anomaly_log', [
      {
        center_id: '11110000143',
        center_name: '대학로어린이집',
        address: '서울특별시 종로구 이화장길 86-22',
        record_date: '2021-07-07',
        anomaly_type: '폭행',
      },
      {
        center_id: '11110000143',
        center_name: '대학로어린이집',
        address: '서울특별시 종로구 이화장길 86-22',
        record_date: '2021-09-11',
        anomaly_type: '폭행',
      },
      {
        center_id: '11110000143',
        center_name: '대학로어린이집',
        address: '서울특별시 종로구 이화장길 86-22',
        record_date: '2021-12-20',
        anomaly_type: '실신',
      },
      {
        center_id: '11110000019',
        center_name: '누상어린이집',
        address: '서울특별시 종로구 옥인길 23-4 (누상동)',
        record_date: '2020-04-05',
        anomaly_type: '실신',
      },
      {
        center_id: '11110000019',
        center_name: '누상어린이집',
        address: '서울특별시 종로구 옥인길 23-4 (누상동)',
        record_date: '2019-12-21',
        anomaly_type: '싸움',
      },
      {
        center_id: '11110000019',
        center_name: '누상어린이집',
        address: '서울특별시 종로구 옥인길 23-4 (누상동)',
        record_date: '2019-12-21',
        anomaly_type: '폭행',
      },
      {
        center_id: '11110000019',
        center_name: '누상어린이집',
        address: '서울특별시 종로구 옥인길 23-4 (누상동)',
        record_date: '2019-12-21',
        anomaly_type: '폭행',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('anomaly_log', { center_id: ['11110000019', '11110000143'] });
  },
};
