import { AnomalyLog, Sequelize } from "../../database/models/transform";

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

export default { findAnomalyLogs };
