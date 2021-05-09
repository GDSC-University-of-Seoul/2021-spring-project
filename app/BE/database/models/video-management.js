import Sequelize from "sequelize";

module.exports = class VideoManagement extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        manage_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        manage_type: {
          type: DataTypes.ENUM({
            values: ["one", "two", "three"],
          }),
          allowNull: false,
        },
        manage_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        requester: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        purpose: {
          type: DataTypes.ENUM({
            values: ["one", "two", "Three"],
          }),
          allowNull: false,
        },
        monitor_time: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        monitor_room: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        paranoid: false,
        modelName: "VideoManagement",
        tableName: "video_management",
        charset: "utf8",
        collate: "utf8_general_cli",
      }
    );
  }
  static associate(db) {}
};
