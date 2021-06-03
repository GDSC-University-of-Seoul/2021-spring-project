'use strict';
/*
  설치된 cctv에 관한 정보

  fields                DATA TYPE         INDEX   NULLABLE
      cctv_id            : Integer         PK      FALSE
      install_date       : Date                    FALSE
      quality            : Enum                    FALSE
      uninstall_date     : Date                    TRUE
  relationship          Column
      area               : area_id         FK      FALSE
  backref               Column
      video              : this.cctv_id    FK
*/
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cctv extends Model {
    static associate(models) {
      cctv.belongsTo(models.area, {
        foreignKey: 'area_id',
        targetKey: 'area_id',
      });
      cctv.hasMany(models.video, {
        foreignKey: 'cctv_id',
        sourceKey: 'cctv_id',
      });
    }
  }

  cctv.init(
    {
      cctv_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      area_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      install_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      quality: {
        type: DataTypes.ENUM({ values: ['SD', 'HD', 'FHD', 'QHD', 'UHD'] }),
        allowNull: false,
      },
      uninstall_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'cctv',
      tableName: 'cctv',
      freezeTableName: false,
      timestamps: false,
    },
  );
  return cctv;
};
