import Sequelize from "sequelize";

module.exports = class Anomaly extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        ano_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        ano_type: {
          type: DataTypes.STRING(10),
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
              "영상확인-폭력",
              "영상확인-실신",
            ],
          }),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        paranoid: false,
        modelName: "Anomaly",
        tableName: "anomaly",
        charset: "utf8",
        collate: "utf8_general_cli",
      }
    );
  }
  static associate(db) {
    db.Anomaly.belongsTo(db.Video, {
      foreignKey: "video_id",
      targetKey: "video_id",
    });
  }
};
