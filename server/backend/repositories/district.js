import { sequelize } from "../../database/models/transform";
import { districtPivot as pivot } from "../utils/pivot";
import getDate from "../utils/getDate";

const upperDistrictStatement = (startDate, endDate) => {
  return `
    SELECT upper_d.*, a.anomaly_type, COUNT(a.anomaly_type)
    FROM district AS upper_d
    LEFT OUTER JOIN district AS lower_d
    ON upper_d.district_code = lower_d.parent_code
    LEFT OUTER JOIN child_care_center AS c
    ON lower_d.district_code = c.district_code
    LEFT OUTER JOIN anomaly_log AS a
    ON c.center_id = a.center_id
    AND a.anomaly_type IN ('실신', '싸움', '폭행')
    AND a.record_date BETWEEN '${startDate}' AND '${endDate}'
  `;
};

const lowerDistrictStatement = (startDate, endDate) => {
  return `
    SELECT d.*, a.anomaly_type, COUNT(a.anomaly_type)
    FROM district as d
    LEFT OUTER JOIN child_care_center as c
    ON d.district_code = c.district_code
    LEFT OUTER JOIN anomaly_log AS a
    ON c.center_id = a.center_id
    AND a.anomaly_type IN ('실신', '싸움', '폭행')
    AND a.record_date BETWEEN '${startDate}' AND '${endDate}'
    `;
};

const findUpperDistricts = async () => {
  const date = getDate();
  const anomalies = await sequelize.query(
    upperDistrictStatement(date.start, date.end) +
      `WHERE upper_d.parent_code IS NULL
      GROUP BY upper_d.district_code, ROLLUP(a.anomaly_type)`,
    { type: sequelize.QueryTypes.SELECT }
  );
  return pivot(anomalies);
};

const findUpperDistrict = async (districtCode) => {
  const date = getDate();
  const anomalies = await sequelize.query(
    upperDistrictStatement(date.start, date.end) +
      `WHERE upper_d.district_code = '${districtCode}'
      GROUP BY upper_d.district_code, ROLLUP(a.anomaly_type)`,
    { type: sequelize.QueryTypes.SELECT }
  );
  return pivot(anomalies);
};

const findLowerDistricts = async (parentCode) => {
  const date = getDate();
  const anomalies = await sequelize.query(
    lowerDistrictStatement(date.start, date.end) +
      `WHERE d.parent_code = '${parentCode}'
      GROUP BY d.district_code, ROLLUP(a.anomaly_type)`,
    { type: sequelize.QueryTypes.SELECT }
  );
  return pivot(anomalies);
};

const findLowerDistrict = async (districtCode) => {
  const date = getDate();
  const anomalies = await sequelize.query(
    lowerDistrictStatement(date.start, date.end) +
      `WHERE d.district_code = '${districtCode}'
      GROUP BY d.district_code, ROLLUP(a.anomaly_type)`,
    { type: sequelize.QueryTypes.SELECT }
  );
  return pivot(anomalies);
};

export default {
  findLowerDistricts,
  findUpperDistricts,
  findLowerDistrict,
  findUpperDistrict,
};
