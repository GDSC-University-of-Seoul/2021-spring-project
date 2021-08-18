import AnomalyService from "../services/anomalyLog";
import AnomalyRepository from "../repositories/anomalyLog";

const createAnomalyLog = async (req, res, next) => {
  try {
    const { video, ...anomaly } = req.body;
    const anomalyLog = await AnomalyService.createAnomalyLog(
      video.cctv_mac,
      video.record_date,
      video.storage_name,
      anomaly.start_time,
      anomaly.end_time,
      anomaly.anomaly_type
    );
    res.status(201).json(anomalyLog);
  } catch (err) {
    next(err);
  }
};

const findAnomalyLogs = async (req, res, next) => {
  try {
    const { center_name } = req.query;
    const anomalyLogs = await AnomalyRepository.findAnomalyLogs(center_name);
    res.status(200).json(anomalyLogs);
  } catch (err) {
    next(err);
  }
};

export default { createAnomalyLog, findAnomalyLogs };
