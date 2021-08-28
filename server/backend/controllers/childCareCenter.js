import centerRepository from "../repositories/childCareCenter";

const findByDistrictCode = async (req, res, next) => {
  try {
    const { district_code } = req.query;
    const centers = await centerRepository.findByDistrictCode(district_code);
    res.json(centers);
  } catch (err) {
    next(err);
  }
};

const findByCenterId = async (req, res, next) => {
  try {
    const { center_id } = req.params;
    const centers = await centerRepository.findByCenterId(center_id);
    res.json(centers);
  } catch (err) {
    next(err);
  }
};

export default { findByDistrictCode, findByCenterId };
