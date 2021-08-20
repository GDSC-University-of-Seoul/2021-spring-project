let centerInfo = require('../../../.dummy/child_care_center.json');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
var keys = Object.keys(centerInfo);

// 난수 생성 함수
function makeRandomNumber(divisor) {
  let seed = Math.random();
  let result = parseInt((seed * divisor) % divisor);
  return result;
}

// cctv_mac 생성 함수
const HEXADEMICAL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
function randomMac() {
  let macTemp = [];
  for (let i = 0; i < 12; i++) {
    macTemp.push(HEXADEMICAL[makeRandomNumber(15)]);
  }
  let mac = macTemp.join('');
  return mac;
}

// center_id, cctv_name 생성 함수
function randomCenter() {
  let target = makeRandomNumber(keys.length);
  let center_id = centerInfo[keys[target]][0];
  let center_name = String(centerInfo[keys[target]][2] + '_1'); // 띄어쓰기 있을 수 있음
  return [center_id, center_name];
}

var cctvs = [];

for (let i = 0; i < 1000; i++) {
  let [cctv_id, cctv_name] = randomCenter();
  cctvs.push({
    cctv_id: uuidv4(),
    cctv_name: cctv_name,
    cctv_mac: String(randomMac()),
    quality: 'HD',
    install_date: '2021-08-20',
    center_id: cctv_id,
  });
}

const cctvJson = JSON.stringify(cctvs);
// fs.writeFileSync('1000cctvs.json', cctvJson);
// console.log(cctvs);
exports.cctvs = cctvs;
