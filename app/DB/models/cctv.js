'use strict';
const {
  Model
} = require('sequelize');
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
  };
  cctv.init({
    cctv_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    area_id: DataTypes.INTEGER,
    install_date: DataTypes.DATE,
    quality: DataTypes.ENUM({values: ["SD", "HD", "FHD", "QHD", "UHD"]}),
    uninstall_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'cctv',
    tableName: 'cctv',
    freezeTableName: false,
    timestamps: false,
  });
  return cctv;
};