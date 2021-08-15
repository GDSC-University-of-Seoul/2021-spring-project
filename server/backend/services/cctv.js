import CCTVRepository from "../repositories/cctv";

const create = async (centerId, cctvName, cctvMac, installDate, quality) => {
  const cctv = await CCTVRepository.create(
    centerId,
    cctvName,
    cctvMac,
    installDate,
    quality
  );
  return cctv;
};

const findByCenterId = async (centerId) => {
  const cctv = await CCTVRepository.findByCenterId(centerId);
  return cctv;
};

const updateByCctvMac = async (
  cctvMac,
  cctvName,
  installDate,
  uninstallDate,
  quality
) => {
  const cctv = await CCTVRepository.updateByCctvMac(
    cctvMac,
    cctvName,
    installDate,
    uninstallDate,
    quality
  );
  return cctv;
};

const deleteByCctvMac = async (cctvMac) => {
  CCTVRepository.deleteByCctvMac(cctvMac);
};

export default { create, findByCenterId, updateByCctvMac, deleteByCctvMac };
