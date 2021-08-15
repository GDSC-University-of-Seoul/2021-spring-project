import districtRepository from "../repositories/district";

const findLowerDistrictsByParentCode = async (parent_code) => {
  const districts = await districtRepository.findLowerDistrictsByParentCode(
    parent_code
  );
  return districts;
};

const findUpperDistrictsByNullParentCode = async () => {
  const districts = await districtRepository.findUpperDistrictsByNullParentCode();
  return districts;
};

const findLowerDistrictByDistrictCode = async (district_code) => {
  const district = await districtRepository.findLowerDistrictByDistrictCode(
    district_code
  );
  return district;
};

const findUpperDistrictByDistrictCode = async (district_code) => {
  const district = await districtRepository.findUpperDistrictByDistrictCode(
    district_code
  );
  return district;
};

const findLowerDistrictByDistrictName = async (district_name) => {
  const district = await districtRepository.findLowerDistrictByDistrictName(
    district_name
  );
  return district;
};

const findUpperDistrictByDistrictName = async (district_name) => {
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
