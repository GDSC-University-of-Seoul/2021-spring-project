'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class anomaly extends Model {
    static associate(models) {
      anomaly.belongsTo(models.video, {
        foreignKey: 'video_id',
        targetKey: 'video_id',
      });
    }
  };
  anomaly.init({
    ano_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    follow_up: DataTypes.ENUM({values: ["이상행동감지", "영상확인-일상행동", "영상확인-폭행", "영상확인-실신"]}),
    video_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'anomaly',
    tableName: 'anomaly',
    freezeTableName: false,
    timestamps: false,
  });
  return anomaly;
};