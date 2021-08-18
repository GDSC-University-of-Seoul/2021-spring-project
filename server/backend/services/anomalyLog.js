import CCTVRepository from "../repositories/cctv";
import VideoRepository from "../repositories/video";
import { Anomaly, AnomalyLog } from "../../database/models/transform";

const createAnomalyLog = async (
  cctvMac,
  recordDate,
  storageName,
  startTime,
  endTime,
  anomalyType
) => {
  // find video or create video
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
    center_name: video.center_name,
    address: video.address,
    record_date: video.record_date,
    anomaly_type: anomalyType,
    start_time: startTime,
    end_time: endTime,
  });
  return anomalyLog;
};

export default { createAnomalyLog };
