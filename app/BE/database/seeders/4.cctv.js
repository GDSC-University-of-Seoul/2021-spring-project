import { sequelize } from "../models";
import FacilityArea from "../models/facility-area";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const NUM_CCTV = 3;
    let cctvs = [];

    try {
      await sequelize.sync();
      const areas = await FacilityArea.findAll();

      for (let area of areas) {
        for (let i = 0; i < NUM_CCTV; i++) {
          cctvs.push({
            install_date: sequelize.literal("CURRENT_TIMESTAMP"),
            uninstall_date: sequelize.literal("CURRENT_TIMESTAMP"),
            quality: "FHD",
            area_id: area.area_id,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
    await queryInterface.bulkInsert("cctv", cctvs, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("cctv", null, {});
  },
};
