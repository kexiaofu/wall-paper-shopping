"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _template = _interopRequireDefault(require("../common/template"));

var _api = require("../common/api");

_template.default.defaults.imports.toFixed2 = function (val) {
  return val.toFixed(2);
};

window.addEventListener('shoppingCartInfo', function (e) {
  var html = '';

  if (e.detail) {
    html = (0, _template.default)('shopping-list-page', {
      data: e.detail
    });
  } else {
    html = (0, _template.default)('shopping-list-page', {
      data: []
    });
  }

  document.querySelector('.shopping-list-page').innerHTML = html;
});