import Sequelize from "sequelize";

module.exports = class CdrCareCenter extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        center_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        opr_type: {
          type: DataTypes.ENUM({
            values: [
              "국공립",
              "사회복지법인",
              "법인 및 단체",
              "민간",
              "가정",
              "협동",
              "직장",
            ],
          }),
          allowNull: false,
        },
        zip_code: {
          type: DataTypes.STRING(6),
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING(14),
          allowNull: false,
        },
        fax: {
          type: DataTypes.STRING(14),
          allowNull: false,
        },
        web_page: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        lat: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        lng: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        paranoid: false,
        modelName: "CdrCareCenter",
        tableName: "cdrcare_center",
        charset: "utf8",
        collate: "utf8_general_cli",
      }
    );
  }
  static associate(db) {
    db.CdrCareCenter.hasMany(db.Area, {
      foreignKey: "center_id",
      sourceKey: "center_id",
    });
    db.CdrCareCenter.belongsTo(db.District, {
      foreignKey: "code",
      targetKey: "code",
    });
  }
};
