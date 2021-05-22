'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class district extends Model {
    static associate(models) {
      district.hasMany(models.cdrcare_center, {
        foreignKey: 'code',
        sourceKey: 'code'
      });
      district.hasMany(models.district, {
        foreignKey: 'parent_code',
        sourceKey: 'code'
      });
      district.belongsTo(models.district, {
        foreignKey: 'parent_code',
        targetKey: 'code'
      });
    }
  };
  district.init({
    code: {
      type: DataTypes.STRING,
      primaryKey: true,  
    },
    name: DataTypes.STRING,
    parent_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'district',
    tableName: 'district',
    freezeTableName: false,
    timestamps: false,
  });

  console.log(district === sequelize.models.district)
  return district;
};