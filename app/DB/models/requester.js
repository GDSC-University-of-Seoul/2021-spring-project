'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class requester extends Model {
    static associate(models) {
      requester.hasMany(models.video_management, {
        foreignKey: 'requester_id',
        sourceKey: 'requester_id'
      });
    }
  };
  requester.init({
    requester_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    requester_type: DataTypes.ENUM({values: ["아동보호자", "보육교사", "원장", "수사기관"]})
  }, {
    sequelize,
    modelName: 'requester',
    tableName: 'requester',
    freezeTableName: false,
    timestamps: false,
  });
  return requester;
};