'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('member', [{
      member_id : 'han31',
      password : '31han',
      member_name : '한상일',
      member_phone : '01012345678',
      email : 'han31@naver.com'
    },{
      member_id : 'edit8080',
      password : '0808edit',
      member_name : '이태희',
      member_phone : '01013572468',
      email : 'edit0808@naver.com'
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('member', null);
  }
};
