import Sequelize from "sequelize";

module.exports = class Province extends Sequelize.Model {
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
        modelName: "Province",
        tableName: "province",
        charset: "utf8",
        collate: "utf8_general_cli",
      }
    );
  }
  static associate(db) {
    db.Province.hasMany(db.Province, {
      foreignKey: {
        name: "parent_code",
        allowNull: true,
      },
      sourceKey: "code",
    });
    db.Province.belongsTo(db.Province, {
      foreignKey: {
        name: "parent_code",
        allowNull: true,
      },
      targetKey: "code",
    });
    db.Province.hasMany(db.CdrCareCenter, {
      foreignKey: "code",
      sourceKey: "code",
    });
  }
};
