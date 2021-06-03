import { sequelize } from "../models";
import Area from "../models/area";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const NUM_CCTV = 3;
    let cctvs = [];
    let cctvId = 1;

    try {
      await sequelize.sync();
      const areas = await Area.findAll();

      for (let area of areas) {
        for (let i = 0; i < NUM_CCTV; i++) {
          cctvs.push({
            cctv_id: cctvId,
            install_date: sequelize.literal("CURRENT_TIMESTAMP"),
            uninstall_date: sequelize.literal("CURRENT_TIMESTAMP"),
            quality: "FHD",
            area_id: area.area_id,
          });
          cctvId++;
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
