import { sequelize } from "../models";
import CCTV from "../models/cctv";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const NUM_VIDEO = 3;
    let videos = [];

    try {
      await sequelize.sync();
      const cctvs = await CCTV.findAll();

      for (let cctv of cctvs) {
        for (let i = 0; i < NUM_VIDEO; i++) {
          videos.push({
            record_date: sequelize.literal("CURRENT_TIMESTAMP"),
            delete_date: sequelize.literal("CURRENT_TIMESTAMP"),
            delete_issue: "string",
            storage_name: "string",
            cctv_id: cctv.cctv_id,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
    await queryInterface.bulkInsert("video", videos, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("video", null, {});
  },
};
