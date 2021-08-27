import { CCTV } from "../../database/models/transform";

export const validateQuality = async (keyword) => {
  if (!CCTV.rawAttributes.quality.values.includes(keyword)) {
    const err = new Error("Ivalid search keyword.");
    err.name = "SearchKeywordError";
    throw err;
  }
};

export const validateDate = async (keyword) => {
  const regexpr = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;

  if (!keyword.match(regexpr)) {
    const err = new Error("Invalid search keyword.");
    err.name = "SearchKeywordError";
    throw err;
  }
};
