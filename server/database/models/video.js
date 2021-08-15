import Sequelize from 'sequelize';

/**
 * CCTV 영상 비디오 관련 테이블
 * <FIELDS>           <DATA TYPE>        <INDEX>   <NULLABLE>
 * video_id           : Integer          PK        FALSE
 * record_date        : Date                       FALSE
 * delete_date        : Date                       TRUE
 * delete_issue       : String                     TRUE
 * storage_name       : String                     FALSE
 *
 * <RELATIONSHIP>     <COLUMN>
 * cctv               : cctv_id          FK        TRUE
 *
 * <BACKREF>          <COLUMN>
 * anomaly            : video_id    FK
 * video_management   : video_id    FK
 */

module.exports = class Video extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        video_id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        record_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        delete_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        delete_issue: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        storage_name: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        paranoid: false,
        modelName: 'Video',
        tableName: 'video',
        freezeTableName: false,
        charset: 'utf8',
        collate: 'utf8_general_cli',
      },
    );
  }
  static associate(db) {
    db.Video.belongsTo(db.CCTV, {
      foreignKey: "cctv_id",
      targetKey: "cctv_id",
    });
    db.Video.hasMany(db.Anomaly, {
      foreignKey: 'video_id',
      sourceKey: 'video_id',
    });
  }
};
