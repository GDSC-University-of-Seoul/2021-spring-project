// app.js
const db = require('./models/index.js');

const sequelize = db.sequelize;

// force: true는 실 사용중인 서비스에서 쓰면 안됨(있는거 날리고 새로 만들기)
(async () => {
 await sequelize.sync({force: true });
})();
