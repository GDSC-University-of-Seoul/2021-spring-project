import { Sequelize } from "../../database/models/transform";

export const getOffset = async (listSize, page, range) => {
  const currentPage = (parseInt(range) - 1) * 10 + parseInt(page);
  const offset = (currentPage - 1) * listSize;

  return offset;
};

export const getCctvOption = async (type, keyword) => {
  let cctvFilter = {};
  let centerFilter = {};

  const cctvColumns = ["cctv_mac", "quality", "install_date"];
  const centerColumns = ["center_name", "address"];

  if (type && keyword) {
    if (cctvColumns.includes(type)) {
      if (type === "install_date") {
        cctvFilter[type] = {
          [Sequelize.Op.gte]: new Date(keyword),
        };
      } else {
        cctvFilter[type] = {
          [Sequelize.Op.like]: "%" + keyword + "%",
        };
      }
    } else if (centerColumns.includes(type)) {
      centerFilter[type] = {
        [Sequelize.Op.like]: "%" + keyword + "%",
      };
    } else {
      const err = new Error("Ivalid search type.");
      err.name = "SearchError";
      throw err;
    }
  }
  return { cctvFilter, centerFilter };
};

export const getLogOption = async (type, keyword) => {
  let logFilter = {};

  const logColumns = ["center_name", "anomaly_type", "address", "record_date"];

  if (type && keyword) {
    if (logColumns.includes(type)) {
      if (type === "record_date") {
        logFilter[type] = {
          [Sequelize.Op.gte]: new Date(keyword),
        };
      } else {
        logFilter[type] = {
          [Sequelize.Op.like]: "%" + keyword + "%",
        };
      }
    } else {
      const err = new Error("Ivalid search type.");
      err.name = "SearchError";
      throw err;
    }
  }
  return logFilter;
};
