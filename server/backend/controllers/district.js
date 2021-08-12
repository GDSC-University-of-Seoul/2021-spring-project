import districtService from "../services/district";
import upperDistricts from "../utils/upperDistrict";

export const findByParentCode = async (req, res, next) => {
  try {
    const { parent_code } = req.query;
    if (parent_code) {
      const districts = await districtService.findLowerDistrictsByParentCode(
        parent_code
      );
      return res.json(districts);
    } else {
      const districts = await districtService.findUpperDistrictsByNullParentCode();
      return res.json(districts);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const findByDistrictCode = async (req, res, next) => {
  try {
    if (parseInt(req.params.district_code.slice(2, 4)) === 0) {
      const district = await districtService.findUpperDistrictByDistrictCode(
        req.params.district_code
      );
      return res.json(district);
    } else {
      const district = await districtService.findLowerDistrictByDistrictCode(
        req.params.district_code
      );
      return res.json(district);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const findByDistrictName = async (req, res, next) => {
  try {
    if (upperDistricts.includes(req.params.district_name)) {
      const district = await districtService.findUpperDistrictByDistrictName(
        req.params.district_name
      );
      return res.json(district);
    } else {
      const district = await districtService.findLowerDistrictByDistrictName(
        req.params.district_name
      );
      res.json(district);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export default { findByParentCode, findByDistrictCode, findByDistrictName };
