import { sequelize } from "../models";
import ChildCareCenter from "../models/child-care-center";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const NUM_AREA = 3;
    let areas = [];
    let areaId = 1;

    try {
      await sequelize.sync();
      const centers = await ChildCareCenter.findAll();

      for (let center of centers) {
        for (let i = 0; i < NUM_AREA; i++) {
          areas.push({
            area_id: areaId,
            area_name: "string",
            area_usage: "string",
            center_id: center.center_id,
          });
          areaId++;
        }
      }
    } catch (err) {
      console.log(err);
    }
    await queryInterface.bulkInsert("facility_area", areas, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("facility_area", null, {});
  },
};
