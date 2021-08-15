import {
  Sequelize,
  ChildCareCenter,
  CCTV,
} from "../../database/models/transform";

const create = async (centerId, cctvName, cctvMac, installDate, quality) => {
  try {
    const cctv = await CCTV.create({
      center_id: centerId,
      cctv_name: cctvName,
      cctv_mac: cctvMac,
      install_date: installDate,
      quality: quality,
    });
    return cctv;
  } catch (err) {
    console.error(err);
  }
};

const findOneByMacAddress = async (mac_address) => {
  try {
    const cctv = await CCTV.findOne({
      where: {
        cctv_mac: mac_address,
      },
    });
    return cctv;
  } catch (err) {
    console.error(err);
  }
};

const findByCenterId = async (centerId) => {
  const cctv = await CCTV.findAll({
    include: {
      model: ChildCareCenter,
      attributes: [],
      where: {
        center_id: centerId,
      },
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
  });
  return cctv;
};

export default {
  create,
  findOneByMacAddress,
  findByCenterId,
};
