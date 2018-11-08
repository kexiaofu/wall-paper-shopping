"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _api = require("../common/api");

var _tools = require("../common/tools");

var _template = _interopRequireDefault(require("../common/template"));

_template.default.defaults.imports.toFixed2 = function (val) {
  return val.toFixed(2);
};

var address = [],
    isShowAddress = false;

window.onload = function () {
  var id = (0, _tools.getParameter)('orderId');
  console.log(id);
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

  if (id !== null) {
    (0, _api.getOrder)({
      id: id
    }).then(function (res) {
      console.log(res);
      var html = (0, _template.default)('shopping-list-page', {
        data: res
      });
      document.querySelector('.shopping-list-page').innerHTML = html;
      var totalPaid = document.querySelectorAll('.total-paid');
      var paidCount = 0;
      res.map(function (item) {
        paidCount += item.money;
      });

      for (var i = totalPaid.length - 1; i >= 0; i--) {
        totalPaid[i].innerHTML = '￥' + paidCount;
      }
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