import districtRepository from "../repositories/district";

export const findDistricts = async (req, res, next) => {
  try {
    const { parent_code } = req.query;
    if (parent_code) {
      const districts = await districtRepository.findLowerDistricts(
        parent_code
      );
      res.json(districts);
    } else {
      const districts = await districtRepository.findUpperDistricts();
      res.json(districts);
    }
  } catch (err) {
    next(err);
  }
};

export const findDistrictByCode = async (req, res, next) => {
  try {
    let code = req.params.district_code;
    if (parseInt(code.slice(2, 4)) === 0) {
      const district = await districtRepository.findUpperDistrict(code);
      res.json(district);
    } else {
      const district = await districtRepository.findLowerDistrict(code);
      res.json(district);
    }
  } catch (err) {
    next(err);
  }
};

export default { findDistricts, findDistrictByCode };
