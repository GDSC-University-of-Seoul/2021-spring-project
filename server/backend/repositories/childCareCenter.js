import { sequelize } from "../../database/models/transform";

const statement = `
SELECT c.*, a.anomaly_type, COUNT(a.anomaly_type)
FROM child_care_center AS c
LEFT OUTER JOIN anomaly_log AS a
ON c.center_id = a.center_id AND a.anomaly_type IN ('실신', '싸움', '폭행')
`;

const pivot = (anomalies) => {
  let centers = {};
  for (let anomaly of anomalies) {
    let center_id = anomaly.center_id;
    if (!(center_id in centers)) {
      centers[center_id] = {
        center_id: anomaly.center_id,
        center_name: anomaly.center_name,
        operation_type: anomaly.anomaly_type,
        operation_status: anomaly.anomaly_status,
        zip_code: anomaly.zip_code,
        address: anomaly.address,
        center_phone: anomaly.center_phone,
        fax: anomaly.fax,
        web_page: anomaly.web_page,
        latitude: anomaly.latitude,
        longitude: anomaly.longitude,
        district_code: anomaly.district_code,
      };
    }

    if (anomaly.anomaly_type == "폭행") {
      centers[center_id].assault_count = anomaly.count;
    } else if (anomaly.anomaly_type == "싸움") {
      centers[center_id].fight_count = anomaly.count;
    } else if (anomaly.anomaly_type == "실신") {
      centers[center_id].swoon_count = anomaly.count;
    } else {
      centers[center_id].total_count = anomaly.count;
    }
  }

  let res = [];
  for (let value of Object.values(centers)) {
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

const findByDistrictCode = async (districtCode) => {
  const anomalies = await sequelize.query(
    statement +
      `WHERE c.district_code = '${districtCode}'
      GROUP BY c.center_id, ROLLUP(a.anomaly_type)`,
    { type: sequelize.QueryTypes.SELECT }
  );
  return pivot(anomalies);
};

const findByCenterId = async (centerId) => {
  const anomalies = await sequelize.query(
    statement +
      `WHERE c.center_id = '${centerId}'
      GROUP BY c.center_id, ROLLUP(a.anomaly_type)`,
    { type: sequelize.QueryTypes.SELECT }
  );
  return pivot(anomalies);
};

export default { findByDistrictCode, findByCenterId };
