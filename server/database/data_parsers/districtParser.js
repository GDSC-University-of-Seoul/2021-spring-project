let json = require('../../../.dummy/region_code_name.json');

var len = Object.keys(json.존재).length;
var keys = Object.keys(json.존재);

var districts = [];

for (let i = 0; i < len; i++) {
  var address = json.존재[keys[i]];
  var addressSplit = address.split(' ');

  if (addressSplit.length == 1) {
    districts.push({
      district_code: keys[i],
      district_name: address,
      parent_code: null,
    });
  } else if (addressSplit.length == 2) {
    if (addressSplit[0] == '세종특별자치시') {
      continue;
    }
    var parentCode = keys[i].slice(0, 2) + '00000000';
    districts.push({
      district_code: keys[i],
      district_name: addressSplit[1],
      parent_code: parentCode,
    });
  }
}

exports.districts = districts;
exports.districts = districts;
