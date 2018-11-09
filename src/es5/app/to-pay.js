"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _api = require("../common/api");

var _template = _interopRequireDefault(require("../common/template"));

var _tools = require("../common/tools");

var orderInfo = {},
    payWay = 'wechat',
    orderId = null;

_template.default.defaults.imports.formDate = function (val) {
  return (0, _tools.format)(new Date(val), 'yyyy年MM月dd日 hh:mm:ss');
};

window.onload = function () {
  orderId = (0, _tools.getParameter)('orderId');

  if (orderId === null) {
    alert('订单不存在');
  } else {
    (0, _api.getOrder)({
      id: orderId
    }).then(function (res) {
      console.log(res);

      if (res && res.hasOwnProperty('orderInfos') && res.orderInfos.length === 0) {
        document.querySelector('.to-pay-container').style.display = 'none';
        alert('订单不存在');
        return false;
      }

      orderInfo = res;

      if (res.orderInfos[0].status === 0) {
        window.location.href = './edit-order.html?orderId=' + orderId;
      } else if (res.orderInfos[0].status > 1) {
        window.location.href = './my-order.html?orderId=' + orderId;
      }

      var baseInfo = (0, _template.default)('base-info', {
        data: res.orderInfos[0],
        showDetail: true
      });
      document.querySelector('.base-info').innerHTML = baseInfo;
      document.querySelector('.money').innerHTML = '￥' + res.orderInfos[0].money;
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

window.selectThisPayWay = function (ele) {
  if (ele !== ele.getAttribute('data-op-way')) {
    payWay = ele.getAttribute('data-op-way');
    document.querySelector('.pay-way-active').className = 'pay-way';
    ele.className = 'pay-way pay-way-active';
  }
};

window.toPay = function () {
  (0, _api.payOrder)({
    orderId: orderId,
    channelId: payWay === 'wechat' ? 2 : 1
  }).then(function (res) {
    if (payWay === 'wechat') {
      document.querySelector('.pay-code').setAttribute('src', res);
      document.querySelector('.show-pay-box').style.display = 'block';
    } else {
      document.querySelector('body').style.display = 'none';
      document.querySelector('body').innerHTML = res;
      document.querySelector('#alipaysubmit').submit();
    }

    console.log(res);
  });
};

window.closePayBox = function () {
  document.querySelector('.show-pay-box').style.display = 'none';
};

document.querySelector('.pay-done').addEventListener('click', function () {
  (0, _api.checkOrder)({
    orderId: orderId
  }).then(function (res) {
    console.log(res);
  });
});