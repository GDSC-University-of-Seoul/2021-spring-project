"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * 어린이집 관련 테이블
 * <FIELDS>           <DATA TYPE>        <INDEX>   <NULLABLE>
 * center_id          : String           PK        FALSE
 * center_name        : String                     FALSE
 * operation_type     : Enum                       FALSE
 * operation_status   : Enum                       FALSE
 * zipcode            : String                     FALSE
 * address            : String                     FALSE
 * center_phone       : String                     TRUE
 * fax                : String                     TRUE
 * web_page           : String                     TRUE
 * lattitude          : String                     FALSE
 * longtitude         : String                     FALSE
 *
 * <RELATIONSHIP>     <COLUMN>
 * district           : district_code    FK        FALSE
 *
 * <BACKREF>          <COLUMN>
 * area               : center_id        FK
 */
module.exports = /*#__PURE__*/function (_Sequelize$Model) {
  _inherits(ChildCareCenter, _Sequelize$Model);

  var _super = _createSuper(ChildCareCenter);

  function ChildCareCenter() {
    _classCallCheck(this, ChildCareCenter);

    return _super.apply(this, arguments);
  }

  _createClass(ChildCareCenter, null, [{
    key: "init",
    value: function init(sequelize, DataTypes) {
      return _get(_getPrototypeOf(ChildCareCenter), "init", this).call(this, {
        center_id: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        center_name: {
          type: DataTypes.STRING(150),
          allowNull: false
        },
        operation_type: {
          type: DataTypes.ENUM({
            values: ["국공립", "사회복지법인", "법인 및 단체", "민간", "가정", "협동", "직장"]
          }),
          allowNull: false
        },
        operation_status: {
          type: DataTypes.ENUM({
            values: ["정상", "휴지", "폐지", "재개", "공백"]
          }),
          allowNull: false
        },
        zip_code: {
          type: DataTypes.STRING(6),
          allowNull: false
        },
        address: {
          type: DataTypes.STRING(300),
          allowNull: false
        },
        center_phone: {
          type: DataTypes.STRING(14),
          allowNull: true
        },
        fax: {
          type: DataTypes.STRING(14),
          allowNull: true
        },
        web_page: {
          type: DataTypes.STRING(150),
          allowNull: true
        },
        latitude: {
          type: DataTypes.STRING(30),
          allowNull: false
        },
        longitude: {
          type: DataTypes.STRING(30),
          allowNull: false
        }
      }, {
        sequelize: sequelize,
        timestamps: false,
        paranoid: false,
        modelName: "ChildCareCenter",
        tableName: "child_care_center",
        freezeTableName: false,
        charset: "utf8",
        collate: "utf8_general_cli"
      });
    }
  }, {
    key: "associate",
    value: function associate(db) {
      db.ChildCareCenter.hasMany(db.FacilityArea, {
        foreignKey: "center_id",
        sourceKey: "center_id"
      });
      db.ChildCareCenter.belongsTo(db.District, {
        foreignKey: "district_code",
        targetKey: "district_code"
      });
    }
  }]);

  return ChildCareCenter;
}(_sequelize["default"].Model);