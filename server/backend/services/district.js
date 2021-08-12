import districtRepository from "../repositories/district";

export const findLowerDistrictsByParentCode = async (parent_code) => {
  const districts = await districtRepository.findLowerDistrictsByParentCode(
    parent_code
  );
  return districts;
};

export const findUpperDistrictsByNullParentCode = async () => {
  const districts = await districtRepository.findUpperDistrictsByNullParentCode();
  return districts;
};

export const findLowerDistrictByDistrictCode = async (district_code) => {
  const district = await districtRepository.findLowerDistrictByDistrictCode(
    district_code
  );
  return district;
};

export const findUpperDistrictByDistrictCode = async (district_code) => {
  const district = await districtRepository.findUpperDistrictByDistrictCode(
    district_code
  );
  return district;
};

export const findLowerDistrictByDistrictName = async (district_name) => {
  const district = await districtRepository.findLowerDistrictByDistrictName(
    district_name
  );
  return district;
};

export const findUpperDistrictByDistrictName = async (district_name) => {
  const district = await districtRepository.findUpperDistrictByDistrictName(
    district_name
  );
  return district;
};

export default {
  findLowerDistrictsByParentCode,
  findUpperDistrictsByNullParentCode,
  findLowerDistrictByDistrictCode,
  findUpperDistrictByDistrictCode,
  findLowerDistrictByDistrictName,
  findUpperDistrictByDistrictName,
};
