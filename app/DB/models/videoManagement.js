import Sequelize from "sequelize";

/**
 * 영상 관리대장(열람, 파기, 이용) 관련 테이블
 * <FIELDS>           <DATA TYPE>        <INDEX>   <NULLABLE>
 * manage_id          : Integer          PK        FALSE
 * manage_type        : Enum                       FALSE
 * manage_date        : Date                       FALSE
 * purpose            : Enum                       FALSE
 * monitor_time       : Time                       FALSE
 *
 * <RELATIONSHIP>     <COLUMN>
 * video              : video_id         FK        FALSE
 * requester          : requester_id     FK        FALSE
 */

module.exports = class VideoManagement extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        manage_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        manage_type: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        manage_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        purpose: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        monitor_time: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        paranoid: false,
        modelName: "VideoManagement",
        tableName: "video_management",
        freezeTableName: false,
        charset: "utf8",
        collate: "utf8_general_cli",
      }
    );
  }
  static associate(db) {
    db.VideoManagement.belongsTo(db.Video, {
      foreignKey: "video_id",
      targetKey: "video_id",
    });
    db.VideoManagement.belongsTo(db.Requester, {
      foreignKey: "requester_id",
      targetKey: "requester_id",
    });
  }
};
