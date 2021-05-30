import Sequelize from "sequelize";

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
