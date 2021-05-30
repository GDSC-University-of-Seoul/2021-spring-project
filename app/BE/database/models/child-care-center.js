import Sequelize from "sequelize";

module.exports = class ChildCareCenter extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        center_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        center_name: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        operation_type: {
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
        operation_status: {
          type: DataTypes.ENUM({
            values: ["정상", "휴지", "폐지", "재개", "공백"],
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
        center_phone: {
          type: DataTypes.STRING(14),
          allowNull: true,
        },
        fax: {
          type: DataTypes.STRING(14),
          allowNull: true,
        },
        web_page: {
          type: DataTypes.STRING(150),
          allowNull: true,
        },
        latitude: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        longtitude: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        paranoid: false,
        modelName: "ChildCareCenter",
        tableName: "child_care_center",
        charset: "utf8",
        collate: "utf8_general_cli",
      }
    );
  }
  static associate(db) {
    db.ChildCareCenter.hasMany(db.FacilityArea, {
      foreignKey: "center_id",
      sourceKey: "center_id",
    });
    db.ChildCareCenter.belongsTo(db.District, {
      foreignKey: "district_code",
      targetKey: "district_code",
    });
  }
};
