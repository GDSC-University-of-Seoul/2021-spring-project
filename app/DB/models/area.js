'use strict';
/*
  어린이집 내 공간에 대한 테이블

  fields                DATA TYPE         INDEX   NULLABLE
      area_id            : Integer          PK      FALSE
      area_name          : String                   FALSE
      use_of_area        : String                   TRUE
  relationship          Column
      cdrcare_center     : center_id        FK      FALSE
  backref               Column
      cctv               : this.area_id     FK
*/
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class area extends Model {
    static associate(models) {
      area.belongsTo(models.cdrcare_center, {
        foreignKey: 'center_id',
        targetKey: 'center_id',
      });
      area.hasMany(models.video_management, {
        foreignKey: 'area_id',
        sourceKey: 'area_id',
      });
      area.hasMany(models.cctv, {
        foreignKey: 'area_id',
        sourceKey: 'area_id',
      });
    }
  }

  area.init(
    {
      area_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      area_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      use_of_area: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      center_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'area',
      tableName: 'area',
      freezeTableName: false,
      timestamps: false,
    },
  );
  return area;
};
