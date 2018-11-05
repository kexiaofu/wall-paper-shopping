"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _api = require("../common/api");

var _template = _interopRequireDefault(require("../common/template"));

window.orderTypeActive = function () {
  var hash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var orderType = document.querySelectorAll('.order-type'),
      hashState = hash || window.location.hash;

  for (var i = orderType.length - 1; i >= 0; i--) {
    orderType[i].className = 'order-type';
  }

  switch (hashState) {
    case '#wait2pay':
      orderType[1].className = 'order-type active';
      break;

    case '#wait2send':
      orderType[2].className = 'order-type active';
      break;

    case '#wait2take':
      orderType[3].className = 'order-type active';
      break;

    case '#all':
    default:
      orderType[0].className = 'order-type active';
  } //暂时没有状态的


  (0, _api.getOrder)().then(function (res) {
    console.log(res);
    var html = (0, _template.default)('order-content', {
      data: res
    });
    document.querySelector('.order-content').innerHTML = html;
  });
};

window.onload = function () {
  console.log(window.location.hash);
  orderTypeActive();

  if ('onhashchange' in window) {
    window.onhashchange = function () {
      orderTypeActive();
    };
  }
};