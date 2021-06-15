import Sequelize from "sequelize";

module.exports = class FacilityArea extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        area_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        area_name: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        area_usage: {
          type: DataTypes.STRING(10),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        paranoids: false,
        modelName: "FacilityArea",
        tableName: "facility_area",
        charset: "utf8",
        collate: "utf8_general_cli",
      }
    );
  }
  static associate(db) {
    db.FacilityArea.belongsTo(db.ChildCareCenter, {
      foreignKey: "center_id",
      targetKey: "center_id",
    });
    db.FacilityArea.hasMany(db.CCTV, {
      foreignKey: "area_id",
      sourceKey: "area_id",
    });
  }
};
