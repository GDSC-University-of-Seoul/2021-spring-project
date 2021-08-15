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

export default { create, findByCenterId };
