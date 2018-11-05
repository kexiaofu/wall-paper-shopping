"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _template = _interopRequireDefault(require("../common/template"));

var _api = require("../common/api");

_template.default.defaults.imports.toFixed2 = function (val) {
  return val.toFixed(2);
};

var productInfo = [],
    orderCount = 0,
    productCount = 0;
window.addEventListener('shoppingCartInfo', function (e) {
  var html = '';

  if (e.detail) {
    productInfo = e.detail;
    productInfo = productInfo.map(function (item) {
      item.selected = false;
      return item;
    });
    html = (0, _template.default)('shopping-list-page', {
      data: productInfo
    });
  } else {
    html = (0, _template.default)('shopping-list-page', {
      data: []
    });
  }

  document.querySelector('.shopping-list-page').innerHTML = html;
});

window.opProductQuantity = function (ele) {
  var _index = ele.getAttribute('data-op-index'),
      _op = ele.getAttribute('data-op');

  var product = productInfo[_index],
      selected = document.querySelector("#select".concat(product.id)).checked;
  console.log(selected);

  if (_op === 'add') {
    productInfo.splice(_index, 1, Object.assign({}, product, {
      number: product.number + 1
    }));
  } else {
    productInfo.splice(_index, 1, Object.assign({}, product, {
      number: product.number > 1 ? product.number - 1 : 1
    }));
  }

  if (selected) {
    var count = 0;
    productInfo.map(function (item) {
      item.selected && (count += item.money * item.number);
    });
    orderCount = count.toFixed(2) - 0;
    document.querySelector('.order-count').innerHTML = orderCount;
  }

  var html = (0, _template.default)('shopping-list-page', {
    data: productInfo
  });
  document.querySelector('.shopping-list-page').innerHTML = html;
};

window.addProductToOrder = function (ele) {
  console.log(ele.checked);

  var _index = ele.getAttribute('data-op-index'),
      product = productInfo[_index];

  if (ele.checked) {
    productCount += 1;
    orderCount += product.money * product.number;
    productInfo.splice(_index, 1, Object.assign({}, product, {
      selected: true
    }));
  } else {
    productCount -= 1;
    orderCount -= product.money * product.number;
    productInfo.splice(_index, 1, Object.assign({}, product, {
      selected: false
    }));
  }

  orderCount = orderCount.toFixed(2) - 0;

  if (orderCount > 0) {
    document.querySelector('.to-order').style.background = '#f00';
  } else {
    document.querySelector('.to-order').style.background = '#aaa';
  }

  document.querySelector('.order-count').innerHTML = orderCount;
  document.querySelector('.order-quantity').innerHTML = productCount;
};

window.deleteThisProduct = function (ele) {
  var index = ele.getAttribute('data-op-index');
  (0, _api.deleteShoppingCart)({
    id: productInfo[index].id
  }).then(function (res) {
    console.log(res);
  });
};