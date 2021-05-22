'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class video extends Model {
    static associate(models) {
      video.hasMany(models.video_management, {
        foreignKey: 'video_id',
        sourceKey: 'video_id',
      });
      video.hasMany(models.anomaly, {
        foreignKey: 'video_id',
        sourceKey: 'video_id',
      });
      video.belongsTo(models.cctv, {
        foreignKey: 'cctv_id',
        targetKey: 'cctv_id',
      });
    }
  };
  video.init({
    video_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    record_date: DataTypes.DATE,
    delete_date: DataTypes.DATE,
    delete_issue: DataTypes.STRING,
    storage_name: DataTypes.STRING,
    cctv_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'video',
    tableName: 'video',
    freezeTableName: false,
    timestamps: false,
  });
  return video;
};