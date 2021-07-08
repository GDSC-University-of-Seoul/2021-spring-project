// app.js
const db = require('./models/transform/index.js');

const sequelize = db.sequelize;

(async () => {
  await sequelize.sync({ alter: true });
})();
