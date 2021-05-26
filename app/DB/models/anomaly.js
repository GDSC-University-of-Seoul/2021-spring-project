"use strict";
/*
  이상행동 발생 데이터 관련 테이블

  fields                DATA TYPE         INDEX   NULLABLE
      ano_id             : Integer          PK      FALSE
      start_time         : Date                     FALSE
      end_time           : Date                     FALSE
      follow_up          : Enum                     FALSE
  relationship          Column
      video              : video_id         FK      FALSE
*/
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class anomaly extends Model {
    static associate(models) {
      anomaly.belongsTo(models.video, {
        foreignKey: "video_id",
        targetKey: "video_id",
      });
    }
  }

  anomaly.init(
    {
      ano_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      follow_up: {
        type: DataTypes.ENUM({
          values: [
            "이상행동감지",
            "영상확인-일상행동",
            "영상확인-폭행",
            "영상확인-실신",
          ],
        }),
        allowNull: false,
      },
      video_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "anomaly",
      tableName: "anomaly",
      freezeTableName: false,
      timestamps: false,
    }
  );
  return anomaly;
};
