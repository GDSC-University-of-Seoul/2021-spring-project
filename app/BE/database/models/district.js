import Sequelize from "sequelize";

module.exports = class District extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        code: {
          type: DataTypes.STRING(10),
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(24),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        paranoid: false,
        modelName: "District",
        tableName: "district",
        charset: "utf8",
        collate: "utf8_general_cli",
      }
    );
  }
  static associate(db) {
    db.District.hasMany(db.District, {
      foreignKey: {
        name: "parent_code",
        allowNull: true,
      },
      sourceKey: "code",
    });
    db.District.belongsTo(db.District, {
      foreignKey: {
        name: "parent_code",
        allowNull: true,
      },
      targetKey: "code",
    });
    db.District.hasMany(db.CdrCareCenter, {
      foreignKey: "code",
      sourceKey: "code",
    });
  }
};
