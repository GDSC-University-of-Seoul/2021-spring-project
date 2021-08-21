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

const findAllLogs = async (req, res, next) => {
  try {
    const { list_size, page, range } = req.query;
    const anomalyLogs = await AnomalyRepository.findAllLogs(
      list_size,
      page,
      range
    );
    res.status(200).json(anomalyLogs);
  } catch (err) {
    next(err);
  }
};

const findRecentLogs = async (req, res, next) => {
  try {
    const { list_size, page, range } = req.query;
    const anomalyLogs = await AnomalyRepository.findRecentLogs(
      list_size,
      page,
      range
    );
    res.status(200).json(anomalyLogs);
  } catch (err) {
    next(err);
  }
};

export default { createAnomalyLog, findAllLogs, findRecentLogs };
