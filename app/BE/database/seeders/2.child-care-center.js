import xmlParser from "../../utils/xmlParser";
import { sequelize } from "../models";
import District from "../models/district";
import fs from "fs";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const districtCenter = {};
    const xmlData = fs.readFileSync("./samples/은평구_data.txt");
    let result = await xmlParser(xmlData);

    for (let obj of result.response.item) {
      if (!(obj.sigunname[0] in districtCenter)) {
        districtCenter[obj.sigunname[0]] = [];
      }
      districtCenter[obj.sigunname[0]].push({
        crname: obj.crname[0],
        la: obj.la[0],
        lo: obj.lo[0],
      });
    }

    let centerId = 1;
    let centers = [];

    try {
      await sequelize.sync();
      for (let sigunname in districtCenter) {
        const district = await District.findOne({
          where: { district_name: sigunname },
        });
        for (let obj of districtCenter[sigunname]) {
          centers.push({
            center_id: centerId,
            center_name: obj.crname,
            latitude: String(obj.la),
            longitude: String(obj.lo),
            district_code: district.district_code,
            operation_type: "국공립",
            operation_status: "정상",
            zip_code: "string",
            address: "string",
            center_phone: "string",
            fax: "string",
            web_page: "string",
          });
          centerId++;
        }
      }
    } catch (err) {
      console.log(err);
    }
    await queryInterface.bulkInsert("child_care_center", centers, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("child_care_center", null, {});
  },
};
