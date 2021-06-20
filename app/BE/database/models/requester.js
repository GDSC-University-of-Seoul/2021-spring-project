import Sequelize from "sequelize";

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
