import { AnomalyLog, Sequelize } from "../../database/models/transform";
import { getOffset, getLogOption } from "../utils/getPageOption";

const findAllLogs = async (listSize, page, range, type, keyword, recent) => {
  const offset = await getOffset(listSize, page, range);
  const logFilter = await getLogOption(type, keyword);

  const endDate = new Date();
  let startDate = new Date();

  if (recent) {
    endDate.setHours(endDate.getHours() + 9);
    startDate.setDate(endDate.getDate() - 1);
  } else {
    endDate.setHours(endDate.getHours() + 9);
    startDate.setDate(endDate.getDate() - 60);
  }

  if (logFilter.record_date) {
    if (recent) {
      const keywordDate = new Date(keyword);
      if (keywordDate < startDate) {
        logFilter.record_date = {
          [Sequelize.Op.between]: [startDate, endDate],
        };
      }
    }
  } else {
    logFilter.record_date = {
      [Sequelize.Op.between]: [startDate, endDate],
    };
  }

  let anomalyLogs = await AnomalyLog.findAndCountAll({
    where: logFilter,
    offset: offset,
    limit: listSize,
    raw: true,
  });

  anomalyLogs.count = {
    listCount: anomalyLogs.count,
    pageCount: Math.ceil(anomalyLogs.count / listSize),
  };
  return anomalyLogs;
};

export default { findAllLogs };
