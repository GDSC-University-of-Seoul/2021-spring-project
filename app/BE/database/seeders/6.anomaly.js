import { sequelize } from "../models";
import Video from "../models/video";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const NUM_ANOMALY = 3;
    let anomalies = [];
    let anoId = 1;

    try {
      await sequelize.sync();
      const videos = await Video.findAll();

      for (let video of videos) {
        for (let i = 0; i < NUM_ANOMALY; i++) {
          anomalies.push({
            ano_id: anoId,
            start_time: sequelize.literal("CURRENT_TIMESTAMP"),
            end_time: sequelize.literal("CURRENT_TIMESTAMP"),
            follow_up: "이상행동감지",
            video_id: video.video_id,
          });
          anoId++;
        }
      }
    } catch (err) {
      console.log(err);
    }
    await queryInterface.bulkInsert("anomaly", anomalies, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("anomaly", null, {});
  },
};
