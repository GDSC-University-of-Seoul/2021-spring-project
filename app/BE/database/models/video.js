import Sequelize from "sequelize";

module.exports = class Video extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        video_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        record_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        delete_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        delete_issue: {
          type: DataTypes.ENUM({
            values: ["one", "two", "three"],
          }),
          allowNull: false,
        },
        storage_name: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        paranoid: false,
        modelName: "Video",
        tableName: "video",
        charset: "utf8",
        collate: "utf8_general_cli",
      }
    );
  }
  static associate(db) {}
};
