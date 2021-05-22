'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class area extends Model {
    static associate(models) {
      area.belongsTo(models.cdrcare_center, {
        foreignKey: 'center_id',
        targetKey: 'center_id',
      });
      area.hasMany(models.video_management, {
        foreignKey: 'area_id',
        sourceKey: 'area_id'
      });
      area.hasMany(models.cctv, {
        foreignKey: 'area_id',
        sourceKey: 'area_id'
      });
    }
  };
  area.init({
    area_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    area_name: DataTypes.STRING,
    use_of_area: DataTypes.STRING,
    center_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'area',
    tableName: 'area',
    freezeTableName: false,
    timestamps: false,
  });
  return area;
};