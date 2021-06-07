let json = require('./region_code_name.json');
// console.log(json.존재[1100000000]); // 서울특별시

var len = Object.keys(json.존재).length;
var keys = Object.keys(json.존재);

var district_code = [];
var district_name = [];
var parent_code = [];

for (let i = 0; i < len; i++) {
  address = json.존재[keys[i]]; // type : string
  addressSplit = address.split(' ');

  if (addressSplit.length == 1) {
    district_name.push(address);
    district_code.push(keys[i]);
    parent_code.push(null);
    // console.log(address);
    // console.log(keys[i]);
  } else if (addressSplit.length == 2) {
    if (addressSplit[0] == '세종특별자치시') {
      continue;
    }
    parentCode = keys[i].slice(0, 2) + '00000000';
    district_name.push(addressSplit[1]);
    district_code.push(keys[i]);
    parent_code.push(parentCode);
    // console.log(addressSplit[1]);
    // console.log(keys[i]);
    // console.log(parentCode);
  }
}
