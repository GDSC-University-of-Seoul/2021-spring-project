import Sequelize from "sequelize";

/**
 * DB내 데이터 탐색시간 감축용 이상행동 감지내역 테이블
 * <FIELDS>           <DATA TYPE>        <INDEX>   <NULLABLE>
 * anomaly_log_id     : Integer           PK       FALSE
 * center_name        : String                     FALSE
 * address            : String                     FALSE
 * record_date        : Date                       FALSE
 * anomaly_type       : String                     FALSE
 *
 * <RELATIONSHIP>     <COLUMN>
 * center             : center_id        FK
 */

module.exports = class AnomalyLog extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        anomaly_log_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        center_name: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        record_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        anomaly_type: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        center_id: {
          type: DataTypes.STRING(150),
          allowNull: false,
        }
      },
      {
        sequelize,
        timestamps: false,
        paranoid: false,
        modelName: "AnomalyLog",
        tableName: "anomaly_log",
        freezeTableName: false,
        charset: "utf8",
        collate: "utf8_general_cli",
      }
    );
  }
  static associate(db) {
    db.AnomalyLog.belongsTo(db.ChildCareCenter, {
      foreignKey: "center_id",
      targetKey: "center_id",
    });
  }
};
