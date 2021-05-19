import xmlParser from "../../utils/xmlParser";
import { sequelize } from "../models";
import District from "../models/district";
import fs from "fs";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const regionCenter = {};
    const xmlData = fs.readFileSync("./samples/은평구_data.txt");
    let result = await xmlParser(xmlData);

    for (let obj of result.response.item) {
      if (!(obj.sigunname[0] in regionCenter)) {
        regionCenter[obj.sigunname[0]] = [];
      }
      regionCenter[obj.sigunname[0]].push({
        crname: obj.crname[0],
        la: obj.la[0],
        lo: obj.lo[0],
      });
    }

    let cdrcareCenterId = 1;
    let cdrcareCenters = [];

    try {
      await sequelize.sync();
      for (let sigunname in regionCenter) {
        const district = await District.findOne({
          where: { name: sigunname },
        });
        for (let obj of regionCenter[sigunname]) {
          cdrcareCenters.push({
            center_id: cdrcareCenterId,
            name: obj.crname,
            lat: String(obj.la),
            lng: String(obj.lo),
            code: district.code,
            opr_type: "국공립",
            zip_code: "string",
            address: "string",
            phone: "string",
            fax: "string",
            web_page: "string",
          });
          cdrcareCenterId++;
        }
      }
    } catch (err) {
      console.log(err);
    }
    await queryInterface.bulkInsert("cdrcare_center", cdrcareCenters, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("cdrcare_center", null, {});
  },
};
