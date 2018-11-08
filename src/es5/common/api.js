"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addOrder = exports.getOrder = exports.deleteShoppingCart = exports.addShoppingCart = exports.getShoppingCarInfo = exports.addressOperate = exports.setDefaultAddress = exports.getAddress = exports.toLogin = exports.getHomeGroup = exports.getProductionList = exports.getCarousel = exports.getTags = exports.getProductDetail = exports.getProductClassify = exports.getAllProductList = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var period = 60000;

var apiRequire =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(name, url, method, data) {
    var storage,
        storageTime,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            storage = _args.length > 4 && _args[4] !== undefined ? _args[4] : true;
            console.log(storage, '---');
            storageTime = new Date().getTime();

            if (!(storage && window.sessionStorage.getItem(name) !== null && storageTime - window.sessionStorage.getItem(name + '-time') < period)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", JSON.parse(window.sessionStorage.getItem(name)));

          case 7:
            console.log("require ".concat(name, " again"));

            if (!(method === undefined || method === null)) {
              _context.next = 14;
              break;
            }

            _context.next = 11;
            return _axios.default.get(url, {
              params: data
            }).then(function (res) {
              if (res.data.code === 2000) {
                storage && window.sessionStorage.setItem(name, JSON.stringify(res.data.result));
                storage && window.sessionStorage.setItem(name + '-time', storageTime);
                return res.data.result;
              } else {
                alert(res.data.msg);
              }
            }).catch(function (err) {
              alert(err);
            });

          case 11:
            return _context.abrupt("return", _context.sent);

          case 14:
            _context.next = 16;
            return _axios.default.post(url, data).then(function (res) {
              if (res.data.code === 2000) {
                storage && window.sessionStorage.setItem(name, JSON.stringify(res.data.result));
                storage && window.sessionStorage.setItem(name + '-time', storageTime);
                return res.data.result;
              } else {
                alert(res.data.msg);
              }
            }).catch(function (err) {
              alert(err);
            });

          case 16:
            return _context.abrupt("return", _context.sent);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function apiRequire(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}(); //product


var getAllProductList =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(data) {
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return apiRequire('getAllProductList', '/api/Product/getproductList', null, data, false);

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getAllProductList(_x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAllProductList = getAllProductList;

var getProductClassify =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3() {
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return apiRequire('getProductClassify', '/api/Product/GetGroup', null);

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getProductClassify() {
    return _ref3.apply(this, arguments);
  };
}();

exports.getProductClassify = getProductClassify;

var getProductDetail =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(data) {
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return apiRequire('getProductDetail', '/api/Product/GetProductDetail', null, data, false);

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getProductDetail(_x6) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getProductDetail = getProductDetail;

var getTags =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5() {
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return apiRequire('getTags', '/api/Product/getTags', null, null, true);

          case 2:
            return _context5.abrupt("return", _context5.sent);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function getTags() {
    return _ref5.apply(this, arguments);
  };
}(); //home


exports.getTags = getTags;

var getCarousel =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee6() {
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return apiRequire('getCarousel', '/api/Home/GetCarousel');

          case 2:
            return _context6.abrupt("return", _context6.sent);

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function getCarousel() {
    return _ref6.apply(this, arguments);
  };
}();

exports.getCarousel = getCarousel;

var getProductionList =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee7() {
    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return apiRequire('getProductionList', '/api/Home/GetHomeProduct');

          case 2:
            return _context7.abrupt("return", _context7.sent);

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function getProductionList() {
    return _ref7.apply(this, arguments);
  };
}();

exports.getProductionList = getProductionList;

var getHomeGroup =
/*#__PURE__*/
function () {
  var _ref8 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee8() {
    return _regenerator.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return apiRequire('getHomeGroup', '/api/Home/GetHomeGroup', null, null, true);

          case 2:
            return _context8.abrupt("return", _context8.sent);

          case 3:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function getHomeGroup() {
    return _ref8.apply(this, arguments);
  };
}(); //account


exports.getHomeGroup = getHomeGroup;

var toLogin =
/*#__PURE__*/
function () {
  var _ref9 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee9(account) {
    return _regenerator.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return apiRequire('account', '/api/account/login', null, account);

          case 2:
            return _context9.abrupt("return", _context9.sent);

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function toLogin(_x7) {
    return _ref9.apply(this, arguments);
  };
}();

exports.toLogin = toLogin;

var getAddress =
/*#__PURE__*/
function () {
  var _ref10 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee10() {
    return _regenerator.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return apiRequire('getAddress', '/api/account/GetAddressList', null, null, false);

          case 2:
            return _context10.abrupt("return", _context10.sent);

          case 3:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function getAddress() {
    return _ref10.apply(this, arguments);
  };
}();

exports.getAddress = getAddress;

var setDefaultAddress =
/*#__PURE__*/
function () {
  var _ref11 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee11(data) {
    return _regenerator.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return apiRequire('setDefaultAddress', '/api/account/SetDefaultAddress', 'post', data, false);

          case 2:
            return _context11.abrupt("return", _context11.sent);

          case 3:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }));

  return function setDefaultAddress(_x8) {
    return _ref11.apply(this, arguments);
  };
}();

exports.setDefaultAddress = setDefaultAddress;

var addressOperate =
/*#__PURE__*/
function () {
  var _ref12 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee12(data) {
    return _regenerator.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return apiRequire('addressOperate', '/api/account/AddressOperate', 'post', data, false);

          case 2:
            return _context12.abrupt("return", _context12.sent);

          case 3:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }));

  return function addressOperate(_x9) {
    return _ref12.apply(this, arguments);
  };
}(); //order


exports.addressOperate = addressOperate;

var getShoppingCarInfo =
/*#__PURE__*/
function () {
  var _ref13 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee13(data) {
    return _regenerator.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return apiRequire('getShoppingCarInfo', '/api/order/GetShoppingCart', null, data, false);

          case 2:
            return _context13.abrupt("return", _context13.sent);

          case 3:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, this);
  }));

  return function getShoppingCarInfo(_x10) {
    return _ref13.apply(this, arguments);
  };
}();

exports.getShoppingCarInfo = getShoppingCarInfo;

var addShoppingCart =
/*#__PURE__*/
function () {
  var _ref14 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee14(data) {
    return _regenerator.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return apiRequire('addShoppingCart', '/api/order/AddShoppingCart', 'post', data, false);

          case 2:
            return _context14.abrupt("return", _context14.sent);

          case 3:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, this);
  }));

  return function addShoppingCart(_x11) {
    return _ref14.apply(this, arguments);
  };
}();

exports.addShoppingCart = addShoppingCart;

var deleteShoppingCart =
/*#__PURE__*/
function () {
  var _ref15 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee15(data) {
    return _regenerator.default.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return apiRequire('deleteShoppingCart', '/api/order/DeleteShoppingCart', 'post', data, false);

          case 2:
            return _context15.abrupt("return", _context15.sent);

          case 3:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, this);
  }));

  return function deleteShoppingCart(_x12) {
    return _ref15.apply(this, arguments);
  };
}();

exports.deleteShoppingCart = deleteShoppingCart;

var getOrder =
/*#__PURE__*/
function () {
  var _ref16 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee16(data) {
    return _regenerator.default.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return apiRequire('getOrder', '/api/order/GetOrder', null, data, false);

          case 2:
            return _context16.abrupt("return", _context16.sent);

          case 3:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, this);
  }));

  return function getOrder(_x13) {
    return _ref16.apply(this, arguments);
  };
}();

exports.getOrder = getOrder;

var addOrder =
/*#__PURE__*/
function () {
  var _ref17 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee17(data) {
    return _regenerator.default.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return apiRequire('addOrder', '/api/order/AddOrder', 'post', data, false);

          case 2:
            return _context17.abrupt("return", _context17.sent);

          case 3:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, this);
  }));

  return function addOrder(_x14) {
    return _ref17.apply(this, arguments);
  };
}(); ///api/order/AddShoppingCart
//getProductClassify,api/Product/GetProductDetail?id=


exports.addOrder = addOrder;