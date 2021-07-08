import Sequelize from "sequelize";

/**
 * 열람, 파기 요청자 관련 테이블
 * <FIELDS>           <DATA TYPE>        <INDEX>   <NULLABLE>
 * requester_id       : Integer          PK        FALSE
 * requester_name     : String                     FALSE
 * requester_phone    : String                     FALSE
 * requester_type     : Enum                       FALSE
 *
 * <BACKREF>          <COLUMN>
 * video_management   : requester_id     FK
 */

module.exports = class Requester extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        requester_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        requester_name: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        requester_phone: {
          type: DataTypes.STRING(14),
          allowNull: false,
        },
        requester_type: {
          type: DataTypes.ENUM({
            values: ["아동 보호자", "보육교사", "원장", "수사기관"],
          }),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        paranoid: false,
        modelName: "Requester",
        tableName: "requester",
        freezeTableName: false,
        charset: "utf8",
        collate: "utf8_general_cli",
      }
    );
  }
  static associate(db) {
    db.Requester.hasMany(db.VideoManagement, {
      foreignKey: "requester_id",
      sourceKey: "requester_id",
    });
  }
};
