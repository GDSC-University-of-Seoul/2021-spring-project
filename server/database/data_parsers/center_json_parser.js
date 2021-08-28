const jsonFiles = [
  'child_care_center.json',
  'sejong_child_care_center.json',
  'jeju_child_care_center.json',
];
let centers = [];

for (let fileNo = 0; fileNo < 2; fileNo++) {
  let json = require('../../../.dummy/${jsonFiles[fileNo]}');

  let keys = Object.keys(json);
  let len = keys.length;

  let district_code;
  if (jsonFiles[fileNo] == 'jeju_child_care_center.json') {
    district_code = String(Number(json[keys[fileNo]][1] + '00000') + 100000000);
  } else {
    district_code = json[keys[fileNo]][1] + '00000';
  }

  for (let i = 0; i < len; i++) {
    centers.push({
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
      district_code: district_code,
    });
  }
}

exports.centers = centers;
