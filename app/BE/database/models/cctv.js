import Sequelize from "sequelize";

module.exports = class CCTV extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        cctv_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        quality: {
          type: DataTypes.STRING(15),
          allowNull: false,
        },
        install_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        uninstall_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        paranoid: false,
        modelName: "CCTV",
        tableName: "cctv",
        charset: "utf8",
        collate: "utf8_general_cli",
      }
    );
  }
  static associate(db) {
    db.CCTV.belongsTo(db.CdrCareCenter, {
      foreignKey: "center_id",
      targetKey: "center_id",
    });
    db.CCTV.hasMany(db.Video, {
      foreignKey: "cctv_id",
      sourceKey: "cctv_id",
    });
  }
};
