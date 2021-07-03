'use strict';

var _path = require('path');

var _sequelize = _interopRequireDefault(require('sequelize'));

var _fs = require('fs');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var basename = (0, _path.basename)(__filename);
var env = process.env.NODE_ENV || 'development';

var config = require(__dirname + '/../../config/config.js')[env];

var db = {};
var sequelize;

if (config.use_env_variable) {
  sequelize = new _sequelize['default'](process.env[config.use_env_variable], config);
} else {
  sequelize = new _sequelize['default'](config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    dislectOptions: {
      ssl: config.ssl,
    },
    logging: false,
  });
}

(0, _fs.readdirSync)(__dirname)
  .filter(function (file) {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(function (file) {
    var model = require((0, _path.join)(__dirname, file)).init(
      sequelize,
      _sequelize['default'].DataTypes,
    );

    db[model.name] = model;
  });
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = _sequelize['default'];
module.exports = db;
