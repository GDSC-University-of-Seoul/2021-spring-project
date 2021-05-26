"use strict";
/*
  영상 관리대장(열람, 파기, 이용) 관련 테이블

  fields                DATA TYPE         INDEX   NULLABLE
      manage_id          : Integer         PK      FALSE
      manage_type        : Enum                    FALSE
      manage_date        : Date                    FALSE
      purpose            : Enum                    FALSE
      monitor_time       : Time                    FALSE
  relationship          Column
      video              : video_id        FK      FALSE
      area               : area_id         FK      FALSE
      requester          : requester_id    FK      FALSE   
*/
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class video_management extends Model {
    static associate(models) {
      video_management.belongsTo(models.area, {
        foreignKey: "area_id",
        targetKey: "area_id",
      });
      video_management.belongsTo(models.video, {
        foreignKey: "video_id",
        targetKey: "video_id",
      });
      video_management.belongsTo(models.requester, {
        foreignKey: "requester_id",
        targetKey: "requester_id",
      });
    }
  }
  video_management.init(
    {
      manage_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      manage_type: {
        type: DataTypes.ENUM({ values: ["열람", "이용", "파기"] }),
        allowNull: false,
      },
      manage_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      requester_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      video_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      purpose: {
        type: DataTypes.ENUM({
          values: [
            "보호자의 열람신청",
            "관계공무원의 열람신청",
            "아동보호기관의 열람신청",
            "기타",
          ],
        }),
        allowNull: false,
      },
      monitor_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      area_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "video_management",
      tableName: "video_management",
      freezeTableName: false,
      timestamps: false,
    }
  );
  return video_management;
};
