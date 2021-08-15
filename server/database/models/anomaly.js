import Sequelize from 'sequelize';

/**
 * 이상행동 발생 데이터 관련 테이블
 * <FIELDS>           <DATA TYPE>        <INDEX>   <NULLABLE>
 * anomaly_id         : Integer          PK        FALSE
 * anomaly_type       : Enum (STRING)              FALSE
 * start_time         : Date                       FALSE
 * end_time           : Date                       FALSE
 * follow_up          : Enum                       TRUE
 *
 *
 * <RELATIONSHIP>     <COLUMN>
 * video              : video_id         FK        FALSE
 */

module.exports = class Anomaly extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        anomaly_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        anomaly_type: {
          type: DataTypes.ENUM({
            values: [
              '폭행',
              '싸움',
              '실신',
              '절도',
              '기물파손',
              '배회',
              '침입',
              '투기',
              '강도',
              '추행',
              '납치',
              '주취행동',
            ],
          }),
          allowNull: false,
        },
        start_time: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        end_time: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        follow_up: {
          type: DataTypes.ENUM({
            values: ['이상행동감지', '영상확인-일상행동', '영상확인-폭력', '영상확인-실신'],
          }),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        paranoid: false,
        modelName: 'Anomaly',
        tableName: 'anomaly',
        freezetableName: false,
        charset: 'utf8',
        collate: 'utf8_general_cli',
      },
    );
  }
  static associate(db) {
    db.Anomaly.belongsTo(db.Video, {
      foreignKey: 'video_id',
      targetKey: 'video_id',
    });
  }
};
