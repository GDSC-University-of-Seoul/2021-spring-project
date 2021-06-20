import Sequelize from "sequelize";

/**
 * 행정구역 관련 테이블
 * <FIELDS>           <DATA TYPE>        <INDEX>   <NULLABLE>
 * district_code      : String           PK        FALSE
 * district_name      : String                     FALSE
 *
 * <RELATIONSHIP>     <COLUMN>
 * district           : parent_code      FK        TRUE
 *
 * <BACKREF>
 * cdrcare_center     : district_code    FK
 * district           : district_code    FK
 */

module.exports = class District extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        district_code: {
          type: DataTypes.STRING(10),
          primaryKey: true,
        },
        district_name: {
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
        freezeTableName: false,
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
      sourceKey: "district_code",
    });
    db.District.belongsTo(db.District, {
      foreignKey: {
        name: "parent_code",
        allowNull: true,
      },
      targetKey: "district_code",
    });
    db.District.hasMany(db.ChildCareCenter, {
      foreignKey: "district_code",
      sourceKey: "district_code",
    });
  }
};
