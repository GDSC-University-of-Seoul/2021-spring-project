let json = require("../../../.dummy/jeju_child_care_center.json");

var len = Object.keys(json).length;
var keys = Object.keys(json);

// console.log(json['11110000112'][0]); // 11110000112
var jeju_centers = [];

for (let i = 0; i < len; i++) {
  jeju_centers.push({
    center_id: json[keys[i]][0],
    center_name: json[keys[i]][2],
    operation_type: json[keys[i]][3],
    operation_status: json[keys[i]][4],
    zip_code: json[keys[i]][5],
    address: json[keys[i]][6],
    center_phone: json[keys[i]][7],
    fax: json[keys[i]][8],
    web_page: json[keys[i]][9],
    latitude: json[keys[i]][10],
    longitude: json[keys[i]][11],
    district_code: String(Number(json[keys[i]][1] + "00000") + 100000000),
  });
  // console.log(String(Number(json[keys[i]][1] + "00000") + 100000000));
}
// console.log(jeju_centers);
exports.jeju_centers = jeju_centers;