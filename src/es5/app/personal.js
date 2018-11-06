"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _api = require("../common/api");

var _template = _interopRequireDefault(require("../common/template"));

var address = [];

window.onload = function () {
  (0, _api.getAddress)().then(function (res) {
    address = res.slice(0);
    var html = (0, _template.default)('addr-info', {
      data: res
    });
    document.querySelector('.addr-info').innerHTML = html;
  });
};

window.toSetDefaultAddress = function (ele) {
  (0, _api.setDefaultAddress)({
    id: ele.getAttribute('data-op-id')
  }).then(function (res) {
    var index = ele.getAttribute('data-op-index'),
        addr = JSON.parse(JSON.stringify(address[index]));
    address.splice(index, 1);
    address.unshift(addr);
    var html = (0, _template.default)('addr-info', {
      data: address
    });
    document.querySelector('.addr-info').innerHTML = html;
  });
};

window.toDeleteAddress = function (ele) {
  (0, _api.addressOperate)({
    id: ele.getAttribute('data-op-id'),
    cmd: 2
  }).then(function (res) {
    var index = ele.getAttribute('data-op-index');
    address.splice(index, 1);
    var html = (0, _template.default)('addr-info', {
      data: address
    });
    document.querySelector('.addr-info').innerHTML = html;
  });
};