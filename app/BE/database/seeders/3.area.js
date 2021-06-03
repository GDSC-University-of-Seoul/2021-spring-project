import { sequelize } from "../models";
import CdrCareCenter from "../models/cdrcare-center";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const NUM_AREA = 3;
    let areas = [];
    let areaId = 1;

    try {
      await sequelize.sync();
      const cdrcare_centers = await CdrCareCenter.findAll();

      for (let center of cdrcare_centers) {
        for (let i = 0; i < NUM_AREA; i++) {
          areas.push({
            area_id: areaId,
            area_name: "string",
            use_of_area: "string",
            center_id: center.center_id,
          });
          areaId++;
        }
      }
    } catch (err) {
      console.log(err);
    }
    await queryInterface.bulkInsert("area", areas, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("area", null, {});
  },
};
