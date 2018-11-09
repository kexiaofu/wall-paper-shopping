"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _api = require("../common/api");

var _template = _interopRequireDefault(require("../common/template"));

var _tools = require("../common/tools");

var orderInfo = {};

_template.default.defaults.imports.formDate = function (val) {
  return (0, _tools.format)(new Date(val), 'yyyy年MM月dd日 hh:mm:ss');
};

window.onload = function () {
  var orderId = (0, _tools.getParameter)('orderId');

  if (orderId === null) {
    alert('订单不存在');
  } else {
    (0, _api.getOrderStatus)({
      orderId: orderId
    }).then(function (res) {
      console.log(res);
    });
    (0, _api.getOrder)({
      id: orderId
    }).then(function (res) {
      console.log(res);
      orderInfo = res;
      var order = (0, _template.default)('order-express-info', {
        data: res.orderInfos[0]
      });
      document.querySelector('.order-express-info').innerHTML = order;
      var pay = (0, _template.default)('order-pay-info', {
        data: res.orderInfos[0]
      });
      document.querySelector('.order-pay-info').innerHTML = pay;
      var baseInfo = (0, _template.default)('base-info', {
        data: res.orderInfos[0],
        showDetail: true
      });
      document.querySelector('.base-info').innerHTML = baseInfo;
    });
  }
};

window.showDetail = function (ele) {
  var baseInfo = [];

  if (ele.getAttribute('data-op-bool') === 'true') {
    baseInfo = (0, _template.default)('base-info', {
      data: orderInfo.orderInfos[0],
      showDetail: true
    });
  } else {
    baseInfo = (0, _template.default)('base-info', {
      data: [],
      showDetail: false
    });
  }

  document.querySelector('.base-info').innerHTML = baseInfo;
};