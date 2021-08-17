import { sequelize } from "../../database/models/transform";

const upperDistrictStatement = `
  SELECT upper_d.*, a.anomaly_type, COUNT(a.anomaly_type)
  FROM district AS upper_d
  LEFT OUTER JOIN district AS lower_d
  ON upper_d.district_code = lower_d.parent_code
  LEFT OUTER JOIN child_care_center AS c
  ON lower_d.district_code = c.district_code
  LEFT OUTER JOIN anomaly_log AS a
  ON c.center_id = a.center_id AND a.anomaly_type IN ('실신', '싸움', '폭행')
`;

const lowerDistrictStatement = `
  SELECT d.*, a.anomaly_type, COUNT(a.anomaly_type)
  FROM district as d
  LEFT OUTER JOIN child_care_center as c
  ON d.district_code = c.district_code
  LEFT OUTER JOIN anomaly_log AS a
  ON c.center_id = a.center_id AND a.anomaly_type IN ('실신', '싸움', '폭행')
    `;

const pivot = (anomalies) => {
  let districts = {};
  for (let anomaly of anomalies) {
    let code = anomaly.district_code;
    if (!(code in districts)) {
      districts[code] = {
        district_code: anomaly.district_code,
        district_name: anomaly.district_name,
        parent_code: anomaly.parent_code,
      };
    }

    if (anomaly.anomaly_type == "폭행") {
      districts[code].assault_count = anomaly.count;
    } else if (anomaly.anomaly_type == "싸움") {
      districts[code].fight_count = anomaly.count;
    } else if (anomaly.anomaly_type == "실신") {
      districts[code].swoon_count = anomaly.count;
    } else {
      districts[code].total_count = anomaly.count;
    }
  }

  let res = [];
  for (let value of Object.values(districts)) {
    if (!("assault_count" in value)) {
      value["assault_count"] = "0";
    }
    if (!("fight_count" in value)) {
      value["fight_count"] = "0";
    }
    if (!("swoon_count" in value)) {
      value["swoon_count"] = "0";
    }
    res.push(value);
  }
  return res;
};

const findUpperDistricts = async () => {
  const anomalies = await sequelize.query(
    upperDistrictStatement +
      `WHERE upper_d.parent_code IS NULL
      GROUP BY upper_d.district_code, ROLLUP(a.anomaly_type)`,
    { type: sequelize.QueryTypes.SELECT }
  );
  return pivot(anomalies);
};

const findUpperDistrict = async (districtCode) => {
  const anomalies = await sequelize.query(
    upperDistrictStatement +
      `WHERE upper_d.district_code = '${districtCode}'
      GROUP BY upper_d.district_code, ROLLUP(a.anomaly_type)`,
    { type: sequelize.QueryTypes.SELECT }
  );
  return pivot(anomalies);
};

const findLowerDistricts = async (parentCode) => {
  const anomalies = await sequelize.query(
    lowerDistrictStatement +
      `WHERE d.parent_code = '${parentCode}'
      GROUP BY d.district_code, ROLLUP(a.anomaly_type)`,
    { type: sequelize.QueryTypes.SELECT }
  );
  return pivot(anomalies);
};

const findLowerDistrict = async (districtCode) => {
  const anomalies = await sequelize.query(
    lowerDistrictStatement +
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
