module.exports = {
  up: async (queryInterface, Sequelize) => {
    const region_code_name = require("../../samples/region_code_name.json")[
      "존재"
    ];

    let districts = [];
    Object.entries(region_code_name).forEach(([key, value]) => {
      let regions = value.split(" ");
      const level = regions.length - 1;
      if (parseInt(key.slice(2, key.length)) === 0) {
        districts.push({
          code: key,
          name: value,
          parent_code: null,
        });
      } else if (parseInt(key.slice(4, key.length)) === 0) {
        const upper = districts.filter(
          (obj) => obj.name === regions[level - 1]
        );

        let parent_code = null;
        if (upper.length !== 0) {
          parent_code = upper[0].code;
        }
        districts.push({
          code: key,
          name: regions[level],
          parent_code: parent_code,
        });
      }
    });
    await queryInterface.bulkInsert("district", districts, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("district", null, {});
  },
};
