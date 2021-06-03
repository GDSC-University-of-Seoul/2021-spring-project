'use strict';
/*
  어린이집 관련 테이블

  fields                DATA TYPE         INDEX   NULLABLE
      center_id          : String          PK       FALSE
      name               : String                   FALSE
      opr_type           : Enum                     FALSE
      zipcode            : String                   FALSE
      address            : String                   FALSE
      phone              : String                   TRUE
      fax                : String                   TRUE
      web_page           : String                   TRUE
      lat                : String                   FALSE
      lng                : String                   FALSE
  relationship          Column
      district           : code            FK       FALSE
  backref               Column
      area               : this.center_id  FK
*/
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cdrcare_center extends Model {
    static associate(models) {
      cdrcare_center.hasMany(models.area, {
        foreignKey: 'center_id',
        sourceKey: 'center_id',
      });
      cdrcare_center.belongsTo(models.district, {
        foreignKey: 'code',
        targetKey: 'code',
      });
    }
  }

  cdrcare_center.init(
    {
      center_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      opr_type: {
        type: DataTypes.ENUM({
          values: ['국공립', '사회복지법인', '법인 및 단체', '민간', '가정', '협동', '직장'],
        }),
        allowNull: false,
      },
      zipcode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fax: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      web_page: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lng: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'cdrcare_center',
      tableName: 'cdrcare_center',
      freezeTableName: false,
      timestamps: false,
    },
  );
  return cdrcare_center;
};
