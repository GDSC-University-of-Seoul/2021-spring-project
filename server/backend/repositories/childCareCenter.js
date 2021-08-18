import { sequelize } from "../../database/models/transform";
import { centerPivot as pivot } from "../utils/pivot";
import getDate from "../utils/getDate";

const statement = (startDate, endDate) => {
  return `
    SELECT c.*, d.district_name, a.anomaly_type, COUNT(a.anomaly_type)
    FROM child_care_center AS c
    INNER JOIN district AS d
    ON c.district_code = d.district_code
    LEFT OUTER JOIN anomaly_log AS a
    ON c.center_id = a.center_id
    AND a.anomaly_type IN ('실신', '싸움', '폭행')
    AND a.record_date BETWEEN '${startDate}' AND '${endDate}'
    `;
};

const findByDistrictCode = async (districtCode) => {
  const date = getDate();
  const anomalies = await sequelize.query(
    statement(date.start, date.end) +
      `WHERE c.district_code = '${districtCode}'
      GROUP BY c.center_id, d.district_name, ROLLUP(a.anomaly_type)`,
    { type: sequelize.QueryTypes.SELECT }
  );
  return pivot(anomalies);
};

const findByCenterId = async (centerId) => {
  const date = getDate();
  const anomalies = await sequelize.query(
    statement(date.start, date.end) +
      `WHERE c.center_id = '${centerId}'
      GROUP BY c.center_id, d.district_name, ROLLUP(a.anomaly_type)`,
    { type: sequelize.QueryTypes.SELECT }
  );
  return pivot(anomalies);
};

export default { findByDistrictCode, findByCenterId };
