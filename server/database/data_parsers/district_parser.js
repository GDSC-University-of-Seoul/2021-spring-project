let json = require('../../../.dummy/region_code_name.json');

let keys = Object.keys(json.존재);
let districts = [];

for (let i = 0; i < keys.length; i++) {
  let code = keys[i];

  let address = json.존재[code];
  let addressSplit = address.split(' ');

  if (addressSplit.length == 1) {
    districts.push({
      district_code: code,
      district_name: address,
      parent_code: null,
    });
  } 
  else if (addressSplit.length == 2) {
    if (addressSplit[0] == '세종특별자치시') {
      continue;
    }
    let parentCode = code.slice(0, 2) + '00000000';
    districts.push({
      district_code: code,
      district_name: addressSplit[1],
      parent_code: parentCode,
    });
  }
}

exports.districts = districts;
