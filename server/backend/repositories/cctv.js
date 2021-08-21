import {
  Sequelize,
  ChildCareCenter,
  CCTV,
} from "../../database/models/transform";
import getPagination from "../utils/getPagination";

const create = async (centerId, cctvName, cctvMac, installDate, quality) => {
  const cctv = await CCTV.create({
    center_id: centerId,
    cctv_name: cctvName,
    cctv_mac: cctvMac,
    install_date: installDate,
    quality: quality,
  });
  return cctv;
};

const findOneByMacAddress = async (cctvMac) => {
  const cctv = await CCTV.findOne({
    where: {
      cctv_mac: cctvMac,
    },
  });
  return cctv;
};

const findAll = async (listSize, page, range) => {
  const { offset, limit } = await getPagination(listSize, page, range);

  let cctv = await CCTV.findAndCountAll({
    include: {
      model: ChildCareCenter,
      attributes: [],
    },
    attributes: [
      "cctv_id",
      "cctv_name",
      "cctv_mac",
      "install_date",
      "uninstall_date",
      "quality",
      [Sequelize.col("ChildCareCenter.center_id"), "center_id"],
      [Sequelize.col("ChildCareCenter.center_name"), "center_name"],
      [Sequelize.col("ChildCareCenter.address"), "address"],
    ],
    offset: offset,
    limit: limit,
    raw: true,
  });

  cctv.count = {
    listCount: cctv.count,
    pageCount: Math.ceil(cctv.count / listSize),
  };

  return cctv;
};

const updateByCctvMac = async (
  cctvMac,
  cctvName,
  installDate,
  uninstallDate,
  quality
) => {
  const cctv = await CCTV.update(
    {
      cctv_name: cctvName,
      install_date: installDate,
      uninstall_date: uninstallDate,
      quality: quality,
    },
    {
      where: {
        cctv_mac: cctvMac,
      },
    }
  );
};

const deleteByCctvMac = async (cctvMac) => {
  await CCTV.destroy({
    where: {
      cctv_mac: cctvMac,
    },
  });
};

export default {
  create,
  findOneByMacAddress,
  findAll,
  updateByCctvMac,
  deleteByCctvMac,
};
