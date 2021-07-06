// app.js
const db = require('./models/transform/index.js');

const sequelize = db.sequelize;

// force: true -> alter: true
(async () => {
  await sequelize.sync({ alter: true });
})();
