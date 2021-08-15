import CCTVRepository from "../repositories/cctv";
import VideoRepository from "../repositories/video";
import {
  Anomaly,
  AnomalyLog,
  Sequelize,
} from "../../database/models/transform";

const createAnomalyLog = async (
  cctvMac,
  recordDate,
  storageName,
  startTime,
  endTime,
  anomalyType
) => {
  // find video or create video
  try {
    const cctv = await CCTVRepository.findOneByMacAddress(cctvMac);
    let video = await VideoRepository.findOneByField(cctv.cctv_id, recordDate);
    if (video === null) {
      const created = await VideoRepository.create(
        cctv.cctv_id,
        recordDate,
        storageName
      );
      video = await VideoRepository.findOneById(created.video_id);
    }

    // create anomaly
    const anomaly = await Anomaly.create({
      video_id: video.video_id,
      start_time: startTime,
      end_time: endTime,
      anomaly_type: anomalyType,
    });

    // create anomaly log
    const anomalyLog = await AnomalyLog.create({
      center_id: video.center_id,
      center_name: video.centerName,
      address: video.address,
      record_date: video.recordDate,
      anomaly_type: anomalyType,
      start_time: startTime,
      end_time: endTime,
    });
    return anomalyLog;
  } catch (err) {
    console.error(err);
  }
};

const findAnomalyLogs = async (centerName) => {
  let logFilters = {};
  if (centerName) {
    logFilters.center_name = centerName;
  }

  const endDate = new Date();
  let startDate = new Date();
  endDate.setHours(endDate.getHours() + 9);
  startDate.setDate(endDate.getDate() - 60);
  logFilters.record_date = {
    [Sequelize.Op.between]: [startDate, endDate],
  };

  const anomalyLogs = await AnomalyLog.findAll({
    where: logFilters,
  });
  return anomalyLogs;
};

export default { createAnomalyLog, findAnomalyLogs };
