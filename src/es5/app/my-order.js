"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _api = require("../common/api");

var _template = _interopRequireDefault(require("../common/template"));

var _pagination = _interopRequireDefault(require("../common/pagination"));

var pages = null,
    orderStatus = '';

window.orderTypeActive = function (index, hash) {
  var orderType = document.querySelectorAll('.order-type'),
      hashState = hash || window.location.hash;
  console.log(index, hash, (0, _typeof2.default)(index));

  for (var i = orderType.length - 1; i >= 0; i--) {
    orderType[i].className = 'order-type';
  }

  switch (hashState) {
    case '#order-done':
      orderType[1].className = 'order-type active';
      toGetOrder(index, 3);
      break;

    case '#order-no-pay':
      orderType[2].className = 'order-type active';
      toGetOrder(index, 1);
      break;

    case '#order-close':
      orderType[3].className = 'order-type active';
      toGetOrder(index, 4);
      break;

    case '#order-income':
      orderType[4].className = 'order-type active';
      toGetOrder(index, 5);
      break;

    case '#all':
    default:
      orderType[0].className = 'order-type active';
      toGetOrder(index, null);
  }
};

var toPage = function toPage(index) {
  orderTypeActive(index, orderStatus);
};

var toGetOrder = function toGetOrder(index, status) {
  if (status) {
    (0, _api.getOrder)({
      pageIndex: index,
      status: status
    }).then(function (res) {
      console.log(res);

      if (pages === null) {
        pages = new _pagination.default({
          parent: document.querySelector('.my-order'),
          totalPages: res.totalPageCount,
          currentPage: res.currentPageIndex,
          toPage: toPage
        });
      } else {
        pages.init({
          parent: document.querySelector('.my-order'),
          totalPages: res.totalPageCount,
          currentPage: res.currentPageIndex,
          toPage: toPage
        });
      }

      var html = (0, _template.default)('order-content', {
        data: res.orderInfos
      });
      document.querySelector('.order-content').innerHTML = html;
    });
  } else {
    (0, _api.getOrder)({
      pageIndex: index
    }).then(function (res) {
      console.log(res);

      if (pages === null) {
        pages = new _pagination.default({
          parent: document.querySelector('.my-order'),
          totalPages: res.totalPageCount,
          currentPage: res.currentPageIndex,
          toPage: toPage
        });
      } else {
        pages.init({
          parent: document.querySelector('.my-order'),
          totalPages: res.totalPageCount,
          currentPage: res.currentPageIndex,
          toPage: toPage
        });
      }

      var html = (0, _template.default)('order-content', {
        data: res.orderInfos
      });
      document.querySelector('.order-content').innerHTML = html;
    });
  }
};

window.onload = function () {
  console.log(window.location.hash);
  orderTypeActive(1, null);

  if ('onhashchange' in window) {
    window.onhashchange = function () {
      orderStatus = window.location.hash;
      orderTypeActive(1, orderStatus);
    };
  }
};