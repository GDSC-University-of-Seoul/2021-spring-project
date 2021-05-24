"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cctv extends Model {
    static associate(models) {
      cctv.belongsTo(models.area, {
        foreignKey: "area_id",
        targetKey: "area_id",
      });
      cctv.hasMany(models.video, {
        foreignKey: "cctv_id",
        sourceKey: "cctv_id",
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
        type: DataTypes.ENUM({ values: ["SD", "HD", "FHD", "QHD", "UHD"] }),
        allowNull: false,
      },
      uninstall_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "cctv",
      tableName: "cctv",
      freezeTableName: false,
      timestamps: false,
    }
  );
  return cctv;
};
