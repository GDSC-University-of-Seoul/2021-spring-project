import xmlParser from "../../utils/xmlParser";
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

    let region_index = 1;
    let cdrcare_center_index = 1;

    let region = [];
    let cdrcare_center = [];

    for (let sigunname in regionCenter) {
      region.push({
        region_id: region_index,
        region_name: sigunname,
      });

      for (let obj of regionCenter[sigunname]) {
        cdrcare_center.push({
          center_id: cdrcare_center_index,
          name: obj.crname,
          lat: String(obj.la),
          lng: String(obj.lo),
          region_id: region_index,
          opr_type: "국공립",
          zip_code: "string",
          address: "string",
          phone: "string",
          fax: "string",
          web_page: "string",
        });

        console.log("cdrcare_center_index", cdrcare_center_index);
        cdrcare_center_index++;
      }
      region_index++;
    }

    await queryInterface.bulkInsert("region", region, {});
    await queryInterface.bulkInsert("cdrcare_center", cdrcare_center, {});

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("region", null, {});
    await queryInterface.bulkDelete("cdrcare_center", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
