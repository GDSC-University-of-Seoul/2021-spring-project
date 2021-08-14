'use strict';

var logs = [
  {
    center_id: '49110000558',
    center_name: 'KCTV제주방송어린이집',
    address: '제주특별자치도 제주시 삼동길 55 ',
    record_date: '2021-08-12',
    anomaly_type: '싸움',
  },
  {
    center_id: '49110000606',
    center_name: 'Kt cs 루키어린이집',
    address: '제주특별자치도 제주시 전농로 114 ',
    record_date: '2021-08-12',
    anomaly_type: '싸움',
  },
  {
    center_id: '49110000224',
    center_name: '힘찬 어린이집',
    address: '제주특별자치도 제주시 원당로 30 (삼양일동1521-55)',
    record_date: '2021-08-12',
    anomaly_type: '싸움',
  },
  {
    center_id: '49130000165',
    center_name: 'S&P기독어린이집',
    address: '제주특별자치도 서귀포시 신중로 3 (강정동)',
    record_date: '2021-08-12',
    anomaly_type: '싸움',
  },
  {
    center_id: '49130000076',
    center_name: '가마어린이집',
    address: '제주특별자치도 서귀포시 표선면 세화로26번길 31 ',
    record_date: '2021-08-12',
    anomaly_type: '싸움',
  },
  {
    center_id: '49130000129',
    center_name: '희망찬어린이집',
    address: '제주특별자치도 서귀포시 중산간동로 8002 관리동',
    record_date: '2021-08-12',
    anomaly_type: '싸움',
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('anomaly_log', logs);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('anomaly_log', null);
  },
};
