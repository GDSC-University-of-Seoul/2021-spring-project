import Sequelize from "sequelize";

/**
 * 로그인 관련 테이블
 * <FIELDS>           <DATA TYPE>        <INDEX>   <NULLABLE>
 * user_id            : String(50)          PK        FALSE
 * password           : String(50)                    FALSE
 * user_name          : String(10)                    FALSE
 * user_phone         : String(12)                    FALSE
 * email              : String(50)                    TRUE
 *
 */

module.exports = class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        user_id: {
          type: DataTypes.STRING(50),
          primaryKey: true,
        },
        password: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        user_name: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        user_phone: {
          type: DataTypes.STRING(12),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        paranoid: false,
        modelName: "User",
        tableName: "user",
        freezetableName: false,
        charset: "utf8",
        collate: "utf8_general_cli",
      }
    );
  }
};
