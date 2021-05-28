let json = require("./region_code_name.json");
// console.log(json.존재[1100000000]); // 서울특별시

var len = Object.keys(json.존재).length;
// console.log(len); // 20544 lines

var district_code = Object.keys(json.존재);
var district_name = [];

for (let i = 0; i < len; i++) {
  district_name.push(json.존재[district_code[i]]);
}

console.log(district_code);
console.log(district_name);
