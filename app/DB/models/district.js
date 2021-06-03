'use strict';
/*
  행정구역 관련 테이블

  fields                DATA TYPE         INDEX   NULLABLE
      code               : String          PK      FALSE
      name               : String                  FALSE
  relationship          Column
      district           : parent_code     FK      TRUE
  backref               Column
      cdrcare_center     : this.code       FK
      district           : this.code       FK      
*/
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class district extends Model {
    static associate(models) {
      district.hasMany(models.cdrcare_center, {
        foreignKey: 'code',
        sourceKey: 'code',
      });
      district.hasMany(models.district, {
        foreignKey: 'parent_code',
        sourceKey: 'code',
      });
      district.belongsTo(models.district, {
        foreignKey: 'parent_code',
        targetKey: 'code',
      });
    }
  }
  district.init(
    {
      code: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parent_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'district',
      tableName: 'district',
      freezeTableName: false,
      timestamps: false,
    },
  );

  console.log(district === sequelize.models.district);
  return district;
};
