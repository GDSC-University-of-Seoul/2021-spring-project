'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class video_management extends Model {
    static associate(models) {
      video_management.belongsTo(models.area, {
        foreignKey: 'area_id',
        targetKey: 'area_id',
      });
      video_management.belongsTo(models.video, {
        foreignKey: 'video_id',
        targetKey: 'video_id',
      });
      video_management.belongsTo(models.requester, {
        foreignKey: 'requester_id',
        targetKey: 'requester_id',
      });
      // define association here
    }
  };
  video_management.init({
    manage_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    manage_type: DataTypes.ENUM({values: ["열람", "이용", "파기"]}),
    manage_date: DataTypes.DATE,
    requester_id: DataTypes.INTEGER,
    video_id: DataTypes.INTEGER,
    purpose: DataTypes.ENUM({values: ["보호자의 열람신청", "관계공무원의 열람신청", "아동보호기관의 열람신청", "기타"]}),
    monitor_time: DataTypes.TIME,
    area_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'video_management',
    tableName: 'video_management',
    freezeTableName: false,
    timestamps: false,
  });
  return video_management;
};