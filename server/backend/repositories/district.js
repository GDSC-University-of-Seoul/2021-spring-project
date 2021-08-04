import { sequelize } from "../../database/models/transform";

export const findLowerDistrictsByParentCode = async (parent_code) => {
  const districts = await sequelize.query(
    `SELECT district_code,
    district_name,
    COALESCE(swoon_count, 0) as swoon_count,
    COALESCE(fight_count, 0) as fight_count,
    COALESCE(total_count, 0) as total_count,
    COALESCE(assault_count, 0) as assault_count
    FROM CROSSTAB (
    'SELECT d.district_code,
      d.district_name,
      COALESCE(a.anomaly_type, ''전체'') as anomaly_type,
      COUNT(DISTINCT a.anomaly_log_id) as count
    FROM district as d
    LEFT OUTER JOIN child_care_center as c
    ON d.district_code = c.district_code
    LEFT OUTER JOIN anomaly_log as a
    ON c.center_id = a.center_id
    WHERE d.parent_code = ''${parent_code}''
    GROUP BY d.district_code,
      d.district_name,
      ROLLUP(a.anomaly_type)
    HAVING NOT (GROUPING(a.anomaly_type) = 0 AND a.anomaly_type IS NULL)
    ORDER BY d.district_code,
      anomaly_type',
    'SELECT DISTINCT anomaly_type FROM anomaly_log
    UNION
    SELECT ''전체'' FROM anomaly_log
    ORDER BY anomaly_type')
    AS (district_code text,
      district_name text,
      swoon_count integer,
      fight_count integer,
      total_count integer,
      assault_count integer);`,
    { type: sequelize.QueryTypes.SELECT }
  );
  return districts;
};

export const findUpperDistrictsByNullParentCode = async () => {
  const districts = await sequelize.query(
    `SELECT district_code, 
    district_name,
    COALESCE(swoon_count, 0) as swoon_count,
    COALESCE(fight_count, 0) as fight_count,
    COALESCE(total_count, 0) as total_count,
    COALESCE(assault_count, 0) as assault_count
    FROM CROSSTAB (
    'SELECT upper_d.district_code, 
      upper_d.district_name, 
      COALESCE(a.anomaly_type, ''전체'') as anomaly_type, 
      COUNT(DISTINCT a.anomaly_log_id) as count
    FROM district as upper_d
    LEFT OUTER JOIN district as lower_d
    ON upper_d.district_code = lower_d.parent_code
    LEFT OUTER JOIN child_care_center as c
    ON lower_d.district_code = c.district_code
    LEFT OUTER JOIN anomaly_log as a
    ON c.center_id = a.center_id
    WHERE upper_d.parent_code IS NULL
    GROUP BY upper_d.district_code,
      upper_d.district_name,
      ROLLUP(a.anomaly_type)
    HAVING NOT (GROUPING(a.anomaly_type) = 0 AND a.anomaly_type IS NULL)
    ORDER BY upper_d.district_code, 
      anomaly_type',
    'SELECT DISTINCT anomaly_type FROM anomaly_log
    UNION
    SELECT ''전체'' FROM anomaly_log
    ORDER BY anomaly_type')
    AS (district_code text, 
      district_name text,
      swoon_count integer,
      fight_count integer,
      total_count integer,
      assault_count integer);`,
    { type: sequelize.QueryTypes.SELECT }
  );
  return districts;
};

export const findLowerDistrictByDistrictCode = async (district_code) => {
  const districts = await sequelize.query(
    `SELECT district_code, 
    district_name,
    COALESCE(swoon_count, 0) as swoon_count,
    COALESCE(fight_count, 0) as fight_count,
    COALESCE(total_count, 0) as total_count,
    COALESCE(assault_count, 0) as assault_count
    FROM CROSSTAB (
    'SELECT d.district_code, 
      d.district_name, 
      COALESCE(a.anomaly_type, ''전체'') as anomaly_type, 
      COUNT(DISTINCT a.anomaly_log_id) as count
    FROM district as d
    LEFT OUTER JOIN child_care_center as c
    ON d.district_code = c.district_code
    LEFT OUTER JOIN anomaly_log as a
    ON c.center_id = a.center_id
    WHERE d.district_code = ''${district_code}''
    GROUP BY d.district_code,
      d.district_name,
      ROLLUP(a.anomaly_type)
    HAVING NOT (GROUPING(a.anomaly_type) = 0 AND a.anomaly_type IS NULL)
    ORDER BY d.district_code, 
      anomaly_type',
    'SELECT DISTINCT anomaly_type FROM anomaly_log
    UNION
    SELECT ''전체'' FROM anomaly_log
    ORDER BY anomaly_type')
    AS (district_code text, 
      district_name text,
      swoon_count integer,
      fight_count integer,
      total_count integer,
      assault_count integer);`,
    { type: sequelize.QueryTypes.SELECT }
  );
  return districts;
};

export const findUpperDistrictByDistrictCode = async (district_code) => {
  const districts = await sequelize.query(
    `SELECT district_code, 
    district_name,
    COALESCE(swoon_count, 0) as swoon_count,
    COALESCE(fight_count, 0) as fight_count,
    COALESCE(total_count, 0) as total_count,
    COALESCE(assault_count, 0) as assault_count
    FROM CROSSTAB (
    'SELECT upper_d.district_code, 
      upper_d.district_name, 
      COALESCE(a.anomaly_type, ''전체'') as anomaly_type, 
      COUNT(DISTINCT a.anomaly_log_id) as count
    FROM district as upper_d
    LEFT OUTER JOIN district as lower_d
    ON upper_d.district_code = lower_d.parent_code
    LEFT OUTER JOIN child_care_center as c
    ON lower_d.district_code = c.district_code
    LEFT OUTER JOIN anomaly_log as a
    ON c.center_id = a.center_id
    WHERE upper_d.district_code = ''${district_code}''
    GROUP BY upper_d.district_code,
      upper_d.district_name,
      ROLLUP(a.anomaly_type)
    HAVING NOT (GROUPING(a.anomaly_type) = 0 AND a.anomaly_type IS NULL)
    ORDER BY upper_d.district_code, 
      anomaly_type',
    'SELECT DISTINCT anomaly_type FROM anomaly_log
    UNION
    SELECT ''전체'' FROM anomaly_log
    ORDER BY anomaly_type')
    AS (district_code text, 
      district_name text,
      swoon_count integer,
      fight_count integer,
      total_count integer,
      assault_count integer);`,
    { type: sequelize.QueryTypes.SELECT }
  );
  return districts;
};

export const findLowerDistrictByDistrictName = async (district_name) => {
  const districts = await sequelize.query(
    `SELECT district_code, 
    district_name,
    COALESCE(swoon_count, 0) as swoon_count,
    COALESCE(fight_count, 0) as fight_count,
    COALESCE(total_count, 0) as total_count,
    COALESCE(assault_count, 0) as assault_count
    FROM CROSSTAB (
    'SELECT d.district_code, 
      d.district_name, 
      COALESCE(a.anomaly_type, ''전체'') as anomaly_type, 
      COUNT(DISTINCT a.anomaly_log_id) as count
    FROM district as d
    LEFT OUTER JOIN child_care_center as c
    ON d.district_code = c.district_code
    LEFT OUTER JOIN anomaly_log as a
    ON c.center_id = a.center_id
    WHERE d.district_name = ''${district_name}''
    GROUP BY d.district_code,
      d.district_name,
      ROLLUP(a.anomaly_type)
    HAVING NOT (GROUPING(a.anomaly_type) = 0 AND a.anomaly_type IS NULL)
    ORDER BY d.district_code, 
      anomaly_type',
    'SELECT DISTINCT anomaly_type FROM anomaly_log
    UNION
    SELECT ''전체'' FROM anomaly_log
    ORDER BY anomaly_type')
    AS (district_code text, 
      district_name text,
      swoon_count integer,
      fight_count integer,
      total_count integer,
      assault_count integer);`,
    { type: sequelize.QueryTypes.SELECT }
  );
  return districts;
};

export const findUpperDistrictByDistrictName = async (district_name) => {
  const district = await sequelize.query(
    `SELECT district_code, 
    district_name,
    COALESCE(swoon_count, 0) as swoon_count,
    COALESCE(fight_count, 0) as fight_count,
    COALESCE(total_count, 0) as total_count,
    COALESCE(assault_count, 0) as assault_count
    FROM CROSSTAB (
    'SELECT upper_d.district_code, 
      upper_d.district_name, 
      COALESCE(a.anomaly_type, ''전체'') as anomaly_type, 
      COUNT(DISTINCT a.anomaly_log_id) as count
    FROM district as upper_d
    LEFT OUTER JOIN district as lower_d
    ON upper_d.district_code = lower_d.parent_code
    LEFT OUTER JOIN child_care_center as c
    ON lower_d.district_code = c.district_code
    LEFT OUTER JOIN anomaly_log as a
    ON c.center_id = a.center_id
    WHERE upper_d.district_name = ''${district_name}''
    GROUP BY upper_d.district_code,
      upper_d.district_name,
      ROLLUP(a.anomaly_type)
    HAVING NOT (GROUPING(a.anomaly_type) = 0 AND a.anomaly_type IS NULL)
    ORDER BY upper_d.district_code, 
      anomaly_type',
    'SELECT DISTINCT anomaly_type FROM anomaly_log
    UNION
    SELECT ''전체'' FROM anomaly_log
    ORDER BY anomaly_type')
    AS (district_code text, 
      district_name text,
      swoon_count integer,
      fight_count integer,
      total_count integer,
      assault_count integer);`,
    { type: sequelize.QueryTypes.SELECT }
  );
  return district;
};

export default {
  findLowerDistrictsByParentCode,
  findUpperDistrictsByNullParentCode,
  findLowerDistrictByDistrictCode,
  findUpperDistrictByDistrictCode,
  findLowerDistrictByDistrictName,
  findUpperDistrictByDistrictName,
};
