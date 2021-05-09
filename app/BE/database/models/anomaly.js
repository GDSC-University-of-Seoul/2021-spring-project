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
          type: DataTypes.ENUM({
            values: ["one", "two", "three"],
          }),
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
            values: ["one", "two", "three"],
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
  static associate(db) {}
};
