import { v4 as uuidv4 } from "uuid";
import {
  ChildCareCenter,
  CCTV,
  Video,
  Sequelize,
} from "../../database/models/transform";

const create = async (cctvId, recordDate, storageName) => {
  const video = await Video.create({
    video_id: uuidv4(),
    cctv_id: cctvId,
    record_date: recordDate,
    storage_name: storageName,
  });
  return video;
};

const findOneById = async (videoId) => {
  const video = await Video.findOne({
    where: {
      video_id: videoId,
    },
    include: {
      model: CCTV,
      attributes: ["cctv_mac"],
      include: {
        model: ChildCareCenter,
        attributes: ["center_id", "center_name", "address"],
      },
    },
    attributes: [
      "video_id",
      "record_date",
      [Sequelize.col("CCTV.ChildCareCenter.center_id"), "center_id"],
      [Sequelize.col("CCTV.ChildCareCenter.center_name"), "center_name"],
      [Sequelize.col("CCTV.ChildCareCenter.address"), "address"],
    ],
    raw: true,
  });
  return video;
};

const findOneByField = async (cctvId, recordDate) => {
  const video = await Video.findOne({
    where: {
      cctv_id: cctvId,
      record_date: recordDate,
    },
    include: {
      model: CCTV,
      attributes: [],
      include: {
        model: ChildCareCenter,
        attributes: ["center_id", "center_name", "address"],
      },
    },
    attributes: [
      "video_id",
      "record_date",
      [Sequelize.col("CCTV.ChildCareCenter.center_id"), "center_id"],
      [Sequelize.col("CCTV.ChildCareCenter.center_name"), "center_name"],
      [Sequelize.col("CCTV.ChildCareCenter.address"), "address"],
    ],
    raw: true,
  });
  return video;
};

export default { create, findOneByField, findOneById };
