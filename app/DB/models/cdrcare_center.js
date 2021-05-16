'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cdrcare_center extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  cdrcare_center.init(
    {
      center_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      opr_type: DataTypes.ENUM({values : ["국공립", "사회복지법인", "법인 및 단체"]}),
      zipcode:DataTypes.STRING
    }, 
    {
      sequelize,
      modelName: 'cdrcare_center',
      freezeTableName: true,
      timestamps: false,
    }
  );
  return cdrcare_center;
};