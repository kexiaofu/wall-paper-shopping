"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _api = require("../common/api");

var _tools = require("../common/tools");

var _template = _interopRequireDefault(require("../common/template"));

_template.default.defaults.imports.toFixed2 = function (val) {
  return val.toFixed(2);
};

window.onload = function () {
  var id = (0, _tools.getParameter)('id');
  console.log(id);

  if (id !== null) {
    (0, _api.getOrder)({
      id: id
    }).then(function (res) {
      console.log(res);
      var html = (0, _template.default)('shopping-list-page', {
        data: res
      });
      document.querySelector('.shopping-list-page').innerHTML = html;
    });
  } else {
    alert('订单不存在');
  }
};