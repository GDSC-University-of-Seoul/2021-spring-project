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
    const { list_size, page, range, type, keyword } = req.query;
    if (!(list_size && page && range)) {
      res.status(400).send("Pagination query paramters required.");
      return;
    }
    const anomalyLogs = await AnomalyRepository.findAllLogs(
      list_size,
      page,
      range,
      type,
      keyword,
      false
    );
    res.status(200).json(anomalyLogs);
  } catch (err) {
    if (err.name === "SearchTypeError") {
      res.status(400).send("Invalid Search Type.");
    } else if (err.name === "SearchKeywordError") {
      res.status(400).send("Invalid Search Keyword.");
    } else {
      next(err);
    }
  }
};

const findRecentLogs = async (req, res, next) => {
  try {
    const { list_size, page, range, type, keyword } = req.query;
    if (!(list_size && page && range)) {
      res.status(400).send("Pagination query paramters required.");
      return;
    }
    const anomalyLogs = await AnomalyRepository.findAllLogs(
      list_size,
      page,
      range,
      type,
      keyword,
      true
    );
    res.status(200).json(anomalyLogs);
  } catch (err) {
    if (err.name === "SearchTypeError") {
      res.status(400).send("Invalid Search Type.");
    } else if (err.name === "SearchKeywordError") {
      res.status(400).send("Invalid Search Keyword.");
    } else {
      next(err);
    }
  }
};

export default { createAnomalyLog, findAllLogs, findRecentLogs };
