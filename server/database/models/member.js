import Sequelize from 'sequelize';

/*
 * 로그인 관련 테이블
 * <FIELDS>           <DATA TYPE>        <INDEX>   <NULLABLE>
 * member_id          : String(50)          PK        FALSE
 * password           : String(50)                    FALSE
 * member_name        : String(10)                    FALSE
 * member_phone       : String(12)                    FALSE
 * email              : String(50)                    TRUE
 *
 */

module.exports = class Member extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        member_id: {
          type: DataTypes.STRING(50),
          primaryKey: true,
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        member_name: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        member_phone: {
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
        modelName: 'Member',
        tableName: 'member',
        freezetableName: false,
        charset: 'utf8',
        collate: 'utf8_general_cli',
      },
    );
  }
};
