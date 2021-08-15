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

const findOneByMacAddress = async (cctvMac) => {
  try {
    const cctv = await CCTV.findOne({
      where: {
        cctv_mac: cctvMac,
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
  try {
    await CCTV.destroy({
      where: {
        cctv_mac: cctvMac,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export default {
  create,
  findOneByMacAddress,
  findByCenterId,
  updateByCctvMac,
  deleteByCctvMac,
};
