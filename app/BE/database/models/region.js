import Sequelize from "sequelize";

module.exports = class Region extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        region_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        region_name: {
          type: DataTypes.STRING(4),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        paranoid: false,
        modelName: "Region",
        tableName: "region",
        charset: "utf8",
        collate: "utf8_general_cli",
      }
    );
  }
  static associate(db) {
    db.Region.hasMany(db.CdrCareCenter, {
      foreignKey: "region_id",
      sourceKey: "region_id",
    });
  }
};
