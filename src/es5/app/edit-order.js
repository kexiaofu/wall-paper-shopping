"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _api = require("../common/api");

var _tools = require("../common/tools");

var _template = _interopRequireDefault(require("../common/template"));

_template.default.defaults.imports.toFixed2 = function (val) {
  return val.toFixed(2);
};

var address = [],
    isShowAddress = false,
    orderId = '';

window.onload = function () {
  orderId = (0, _tools.getParameter)('orderId');
  console.log(orderId);
  (0, _api.getAddress)().then(function (res) {
    console.log(res);
    res = res.map(function (item) {
      item.selected = false;
      return item;
    });
    res[0].selected = true;
    address = res.slice(0);
    var html = (0, _template.default)('address-content', {
      data: res,
      isShowAddress: isShowAddress
    });
    document.querySelector('.address-content').innerHTML = html;
  });

  if (orderId !== null) {
    (0, _api.getOrder)({
      id: orderId
    }).then(function (res) {
      console.log(res);

      if (res.orderInfos[0].status === 1) {
        window.location.href = './to-pay.html?orderId=' + orderId;
      } else if (res.orderInfos[0].status > 1) {
        window.location.href = './my-order.html?orderId=' + orderId;
      }

      var html = (0, _template.default)('shopping-list-page', {
        data: res.orderInfos
      });
      document.querySelector('.shopping-list-page').innerHTML = html;
      var count = (0, _template.default)('order-pay-info', {
        data: res.orderInfos[0]
      });
      document.querySelector('.order-pay-info').innerHTML = count;
    });
  } else {
    alert('订单不存在');
  }
};

window.selectAddr = function (ele) {
  var index = ele.getAttribute('data-op-index') - 0;
  address = address.map(function (item) {
    item.selected = false;
    return item;
  });
  address[index].selected = true;
  var html = (0, _template.default)('address-content', {
    data: address,
    isShowAddress: isShowAddress
  });
  document.querySelector('.address-content').innerHTML = html;
};

window.showAddress = function (ele) {
  var bool = ele.getAttribute('data-op-show');
  ele.setAttribute('data-op-show', bool === 'false' ? true : false);
  isShowAddress = !isShowAddress;
  ele.className = bool === 'true' ? 'show-address' : 'show-address active';
  var html = (0, _template.default)('address-content', {
    data: address,
    isShowAddress: isShowAddress
  });
  document.querySelector('.address-content').innerHTML = html;
};

window.addNewAddress = function (ele) {};

window.submitOrder = function () {
  var addrId = '',
      remark = document.querySelector('.remark-input').value;

  if (address.length > 0) {
    address.map(function (item) {
      if (item.selected) {
        console.log(item);
        addrId = item.id;
      }
    });
    (0, _api.submitOrder)({
      id: orderId,
      addressId: addrId,
      description: remark
    }).then(function (res) {
      console.log(res);
      window.location.href = './to-pay.html?orderId=' + orderId;
    });
  } else {
    alert('请新增您的地址');
  }
};