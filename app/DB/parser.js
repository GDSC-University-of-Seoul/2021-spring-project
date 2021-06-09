let json = require('./region_code_name.json');

var len = Object.keys(json.존재).length;
var keys = Object.keys(json.존재);

var districts = [];

for (let i = 0; i < len; i++) {
  var address = json.존재[keys[i]];
  var addressSplit = address.split(' ');

  if (addressSplit.length == 1) {
    districts.push({
      code: keys[i],
      name: address,
      parent_code: null,
    });
  } else if (addressSplit.length == 2) {
    if (addressSplit[0] == '세종특별자치시') {
      continue;
    }
    var parentCode = keys[i].slice(0, 2) + '00000000';
    districts.push({
      code: keys[i],
      name: addressSplit[1],
      parent_code: parentCode,
    });
  }
}

<<<<<<< HEAD
exports.districts = districts;
=======
export { district_code, district_name, parent_code };
>>>>>>> add export variables
