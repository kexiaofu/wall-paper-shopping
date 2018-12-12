"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addressConfig = exports.payOrder = exports.checkOrder = exports.submitOrder = exports.getOrderStatus = exports.addOrder = exports.getOrder = exports.deleteShoppingCart = exports.addShoppingCart = exports.getShoppingCarInfo = exports.resetPassword = exports.register = exports.bindingInfo = exports.sendMessage = exports.updateIcon = exports.updatePassword = exports.updateUserInfo = exports.getUserInfo = exports.addressOperate = exports.setDefaultAddress = exports.getAddress = exports.logout = exports.toLogin = exports.getHomeGroup = exports.getProductionList = exports.getCarousel = exports.getTags = exports.getProductDetail = exports.getProductClassify = exports.getAllProductList = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var period = 60000;
var requestTimeout = new Date().getTime();

var apiRequire =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(name, url, method, data) {
    var duration,
        storageTime,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            duration = _args.length > 4 && _args[4] !== undefined ? _args[4] : 0;
            storageTime = new Date().getTime();

            if (!(duration > 0 && window.sessionStorage.getItem(name) !== null && storageTime - window.sessionStorage.getItem(name + '-time') < duration)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", JSON.parse(window.sessionStorage.getItem(name)));

          case 6:
            console.log("require ".concat(name, " again"));

            if (!(method === undefined || method === null)) {
              _context.next = 13;
              break;
            }

            _context.next = 10;
            return _axios.default.get(url, {
              params: data
            }).then(function (res) {
              if (res.data.code === 2000) {
                //name === 'toLogin' && ( requestTimeout = new Date(res.data.result.timeOut).getTime());
                //console.log(name,requestTimeout);
                duration > 0 && window.sessionStorage.setItem(name, JSON.stringify(res.data.result));
                duration > 0 && window.sessionStorage.setItem(name + '-time', storageTime);
                return res.data.result;
              } else {
                console.log(res, 'res');
                alert(res.data.msg);
                return;
              }
            }).catch(function (error) {
              if (error.response) {
                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);

                if (error.response.status === 401) {
                  if (window.sessionStorage.getItem('account')) {
                    window.sessionStorage.clear();
                  }

                  window.dispatchEvent(new CustomEvent('showLoginBox'));
                } else {
                  alert(error);
                  return;
                }
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                alert(error.message);
                return;
              } //console.log(error.config);

            });

          case 10:
            return _context.abrupt("return", _context.sent);

          case 13:
            _context.next = 15;
            return _axios.default.post(url, data).then(function (res) {
              if (res.data.code === 2000) {
                duration > 0 && window.sessionStorage.setItem(name, JSON.stringify(res.data.result));
                duration > 0 && window.sessionStorage.setItem(name + '-time', storageTime);
                return res.data.result;
              } else {
                alert(res.data.msg);
                return;
              }
            }).catch(function (error) {
              if (error.response) {
                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);

                if (error.response.status === 401) {
                  if (window.sessionStorage.getItem('account')) {
                    window.sessionStorage.clear();
                  }

                  window.dispatchEvent(new CustomEvent('showLoginBox'));
                } else {
                  alert(error);
                  return;
                }
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                alert(error.message);
                return;
              }
            });

          case 15:
            return _context.abrupt("return", _context.sent);

          case 16:
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
            return apiRequire('getAllProductList', '/api/Product/getproductList', null, data);

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
            return apiRequire('getProductDetail', '/api/Product/GetProductDetail', null, data);

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
            return apiRequire('getTags', '/api/Product/getTags', null, null, period);

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
            return apiRequire('getCarousel', '/api/Home/GetCarousel', null, null, period);

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
            return apiRequire('getProductionList', '/api/Home/GetHomeProduct', null, null, period);

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
            return apiRequire('getHomeGroup', '/api/Home/GetHomeGroup', null, null, period);

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
            return apiRequire('account', '/api/account/login', 'post', account, period);

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

var logout =
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
            return apiRequire('logout', '/api/account/Logout', 'post', null);

          case 2:
            return _context10.abrupt("return", _context10.sent);

          case 3:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function logout() {
    return _ref10.apply(this, arguments);
  };
}();

exports.logout = logout;

var getAddress =
/*#__PURE__*/
function () {
  var _ref11 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee11() {
    return _regenerator.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return apiRequire('getAddress', '/api/account/GetAddressList', null, null);

          case 2:
            return _context11.abrupt("return", _context11.sent);

          case 3:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }));

  return function getAddress() {
    return _ref11.apply(this, arguments);
  };
}();

exports.getAddress = getAddress;

var setDefaultAddress =
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
            return apiRequire('setDefaultAddress', '/api/account/SetDefaultAddress', 'post', data);

          case 2:
            return _context12.abrupt("return", _context12.sent);

          case 3:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }));

  return function setDefaultAddress(_x8) {
    return _ref12.apply(this, arguments);
  };
}();

exports.setDefaultAddress = setDefaultAddress;

var addressOperate =
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
            return apiRequire('addressOperate', '/api/account/AddressOperate', 'post', data);

          case 2:
            return _context13.abrupt("return", _context13.sent);

          case 3:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, this);
  }));

  return function addressOperate(_x9) {
    return _ref13.apply(this, arguments);
  };
}();

exports.addressOperate = addressOperate;

var getUserInfo =
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
            return apiRequire('addressOperate', '/api/account/GetUserInfo', null, data);

          case 2:
            return _context14.abrupt("return", _context14.sent);

          case 3:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, this);
  }));

  return function getUserInfo(_x10) {
    return _ref14.apply(this, arguments);
  };
}();

exports.getUserInfo = getUserInfo;

var updateUserInfo =
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
            return apiRequire('updateUserInfo', '/api/account/UpdateUserInfo', 'post', data);

          case 2:
            return _context15.abrupt("return", _context15.sent);

          case 3:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, this);
  }));

  return function updateUserInfo(_x11) {
    return _ref15.apply(this, arguments);
  };
}();

exports.updateUserInfo = updateUserInfo;

var updatePassword =
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
            return apiRequire('updatePassword', '/api/account/UpdatePassword', 'post', data);

          case 2:
            return _context16.abrupt("return", _context16.sent);

          case 3:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, this);
  }));

  return function updatePassword(_x12) {
    return _ref16.apply(this, arguments);
  };
}();

exports.updatePassword = updatePassword;

var updateIcon =
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
            return apiRequire('updateIcon', '/api/account/UpdateIcon', 'post', data);

          case 2:
            return _context17.abrupt("return", _context17.sent);

          case 3:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, this);
  }));

  return function updateIcon(_x13) {
    return _ref17.apply(this, arguments);
  };
}();

exports.updateIcon = updateIcon;

var sendMessage =
/*#__PURE__*/
function () {
  var _ref18 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee18(data) {
    return _regenerator.default.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return apiRequire('sendMessage', '/api/account/SendMessage', 'post', data);

          case 2:
            return _context18.abrupt("return", _context18.sent);

          case 3:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, this);
  }));

  return function sendMessage(_x14) {
    return _ref18.apply(this, arguments);
  };
}();

exports.sendMessage = sendMessage;

var bindingInfo =
/*#__PURE__*/
function () {
  var _ref19 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee19(data) {
    return _regenerator.default.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.next = 2;
            return apiRequire('bindingInfo', '/api/account/BindingInfo', 'post', data);

          case 2:
            return _context19.abrupt("return", _context19.sent);

          case 3:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19, this);
  }));

  return function bindingInfo(_x15) {
    return _ref19.apply(this, arguments);
  };
}();

exports.bindingInfo = bindingInfo;

var register =
/*#__PURE__*/
function () {
  var _ref20 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee20(data) {
    return _regenerator.default.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.next = 2;
            return apiRequire('register', '/api/account/Register', 'post', data);

          case 2:
            return _context20.abrupt("return", _context20.sent);

          case 3:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20, this);
  }));

  return function register(_x16) {
    return _ref20.apply(this, arguments);
  };
}();

exports.register = register;

var resetPassword =
/*#__PURE__*/
function () {
  var _ref21 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee21(data) {
    return _regenerator.default.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.next = 2;
            return apiRequire('resetPassword', '/api/account/ResetPassword', 'post', data);

          case 2:
            return _context21.abrupt("return", _context21.sent);

          case 3:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21, this);
  }));

  return function resetPassword(_x17) {
    return _ref21.apply(this, arguments);
  };
}(); //order


exports.resetPassword = resetPassword;

var getShoppingCarInfo =
/*#__PURE__*/
function () {
  var _ref22 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee22(data) {
    return _regenerator.default.wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            _context22.next = 2;
            return apiRequire('getShoppingCarInfo', '/api/order/GetShoppingCart', null, data);

          case 2:
            return _context22.abrupt("return", _context22.sent);

          case 3:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22, this);
  }));

  return function getShoppingCarInfo(_x18) {
    return _ref22.apply(this, arguments);
  };
}();

exports.getShoppingCarInfo = getShoppingCarInfo;

var addShoppingCart =
/*#__PURE__*/
function () {
  var _ref23 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee23(data) {
    return _regenerator.default.wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            _context23.next = 2;
            return apiRequire('addShoppingCart', '/api/order/AddShoppingCart', 'post', data);

          case 2:
            return _context23.abrupt("return", _context23.sent);

          case 3:
          case "end":
            return _context23.stop();
        }
      }
    }, _callee23, this);
  }));

  return function addShoppingCart(_x19) {
    return _ref23.apply(this, arguments);
  };
}();

exports.addShoppingCart = addShoppingCart;

var deleteShoppingCart =
/*#__PURE__*/
function () {
  var _ref24 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee24(data) {
    return _regenerator.default.wrap(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            _context24.next = 2;
            return apiRequire('deleteShoppingCart', '/api/order/DeleteShoppingCart', 'post', data);

          case 2:
            return _context24.abrupt("return", _context24.sent);

          case 3:
          case "end":
            return _context24.stop();
        }
      }
    }, _callee24, this);
  }));

  return function deleteShoppingCart(_x20) {
    return _ref24.apply(this, arguments);
  };
}();

exports.deleteShoppingCart = deleteShoppingCart;

var getOrder =
/*#__PURE__*/
function () {
  var _ref25 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee25(data) {
    return _regenerator.default.wrap(function _callee25$(_context25) {
      while (1) {
        switch (_context25.prev = _context25.next) {
          case 0:
            _context25.next = 2;
            return apiRequire('getOrder', '/api/order/GetOrder', null, data);

          case 2:
            return _context25.abrupt("return", _context25.sent);

          case 3:
          case "end":
            return _context25.stop();
        }
      }
    }, _callee25, this);
  }));

  return function getOrder(_x21) {
    return _ref25.apply(this, arguments);
  };
}();

exports.getOrder = getOrder;

var addOrder =
/*#__PURE__*/
function () {
  var _ref26 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee26(data) {
    return _regenerator.default.wrap(function _callee26$(_context26) {
      while (1) {
        switch (_context26.prev = _context26.next) {
          case 0:
            _context26.next = 2;
            return apiRequire('addOrder', '/api/order/AddOrder', 'post', data);

          case 2:
            return _context26.abrupt("return", _context26.sent);

          case 3:
          case "end":
            return _context26.stop();
        }
      }
    }, _callee26, this);
  }));

  return function addOrder(_x22) {
    return _ref26.apply(this, arguments);
  };
}();

exports.addOrder = addOrder;

var getOrderStatus =
/*#__PURE__*/
function () {
  var _ref27 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee27(data) {
    return _regenerator.default.wrap(function _callee27$(_context27) {
      while (1) {
        switch (_context27.prev = _context27.next) {
          case 0:
            _context27.next = 2;
            return apiRequire('getOrderStatus', '/api/order/GetOrderStatus', null, data);

          case 2:
            return _context27.abrupt("return", _context27.sent);

          case 3:
          case "end":
            return _context27.stop();
        }
      }
    }, _callee27, this);
  }));

  return function getOrderStatus(_x23) {
    return _ref27.apply(this, arguments);
  };
}();

exports.getOrderStatus = getOrderStatus;

var submitOrder =
/*#__PURE__*/
function () {
  var _ref28 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee28(data) {
    return _regenerator.default.wrap(function _callee28$(_context28) {
      while (1) {
        switch (_context28.prev = _context28.next) {
          case 0:
            _context28.next = 2;
            return apiRequire('submitOrder', '/api/order/SubmitOrder', 'post', data);

          case 2:
            return _context28.abrupt("return", _context28.sent);

          case 3:
          case "end":
            return _context28.stop();
        }
      }
    }, _callee28, this);
  }));

  return function submitOrder(_x24) {
    return _ref28.apply(this, arguments);
  };
}();

exports.submitOrder = submitOrder;

var checkOrder =
/*#__PURE__*/
function () {
  var _ref29 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee29(data) {
    return _regenerator.default.wrap(function _callee29$(_context29) {
      while (1) {
        switch (_context29.prev = _context29.next) {
          case 0:
            _context29.next = 2;
            return apiRequire('checkOrder', '/api/order/CheckOrderPaid', null, data);

          case 2:
            return _context29.abrupt("return", _context29.sent);

          case 3:
          case "end":
            return _context29.stop();
        }
      }
    }, _callee29, this);
  }));

  return function checkOrder(_x25) {
    return _ref29.apply(this, arguments);
  };
}(); //pay


exports.checkOrder = checkOrder;

var payOrder =
/*#__PURE__*/
function () {
  var _ref30 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee30(data) {
    return _regenerator.default.wrap(function _callee30$(_context30) {
      while (1) {
        switch (_context30.prev = _context30.next) {
          case 0:
            _context30.next = 2;
            return apiRequire('payOrder', '/api/pay/PayOrder', null, data);

          case 2:
            return _context30.abrupt("return", _context30.sent);

          case 3:
          case "end":
            return _context30.stop();
        }
      }
    }, _callee30, this);
  }));

  return function payOrder(_x26) {
    return _ref30.apply(this, arguments);
  };
}(); //config


exports.payOrder = payOrder;

var addressConfig =
/*#__PURE__*/
function () {
  var _ref31 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee31() {
    return _regenerator.default.wrap(function _callee31$(_context31) {
      while (1) {
        switch (_context31.prev = _context31.next) {
          case 0:
            _context31.next = 2;
            return apiRequire('addressConfig', '/api/config/GetAddressConfig', null, null, 600000);

          case 2:
            return _context31.abrupt("return", _context31.sent);

          case 3:
          case "end":
            return _context31.stop();
        }
      }
    }, _callee31, this);
  }));

  return function addressConfig() {
    return _ref31.apply(this, arguments);
  };
}(); ///api/order/AddShoppingCart
//getProductClassify,api/Product/GetProductDetail?id=


exports.addressConfig = addressConfig;