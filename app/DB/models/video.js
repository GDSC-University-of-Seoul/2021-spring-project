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
      primaryKey: true,
      allowNull: false
    },
    record_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    delete_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    delete_issue: {
      type: DataTypes.STRING,
      allowNull: true
    },
    storage_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cctv_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'video',
    tableName: 'video',
    freezeTableName: false,
    timestamps: false,
  });
  return video;
};