'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cdrcare_center extends Model {
    static associate(models) {
      cdrcare_center.hasMany(models.area, {
        foreignKey: 'center_id',
        sourceKey: 'center_id'
      });
      cdrcare_center.belongsTo(models.district, {
        foreignKey: 'code',
        targetKey: 'code',
      });
    }
  };
  cdrcare_center.init({
    center_id: {
      type: DataTypes.STRING,
      primaryKey: true, 
    },
    name: DataTypes.STRING,
    opr_type: DataTypes.ENUM({values: ["국공립", "사회복지법인", "법인 및 단체", "민간", "가정", "협동", "직장"]}),
    zipcode: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    fax: DataTypes.STRING,
    web_page: DataTypes.STRING,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cdrcare_center',
    tableName: 'cdrcare_center',
    freezeTableName: false,
    timestamps: false,
  });
  return cdrcare_center;
};