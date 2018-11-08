"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _template = _interopRequireDefault(require("../common/template"));

var _toast = _interopRequireDefault(require("../common/toast"));

var _api = require("../common/api");

_template.default.defaults.imports.toFixed2 = function (val) {
  return val.toFixed(2);
};

var productInfo = [],
    productIds = [],
    toast = new _toast.default(); //获取购物车信息

(0, _api.getShoppingCarInfo)().then(function (res) {
  productInfo = res.slice(0);
  productInfo = productInfo.map(function (item) {
    item.selected = false;
    productIds.push(item.id);
    return item;
  });
  var html = (0, _template.default)('shopping-list-page', {
    data: productInfo
  });
  document.querySelector('.shopping-list-page').innerHTML = html;
  productInfo.length > 0 && (document.querySelector('.to-pay').style.visibility = 'visible', toPayBar());
  productInfo.length > 0 && (document.querySelector('.batch-operation').style.visibility = 'visible');
}); //改变商品的数量

window.opProductQuantity = function (ele) {
  var id = ele.getAttribute('data-op-id') - 0,
      _index = productIds.indexOf(id),
      _op = ele.getAttribute('data-op'),
      inputEle = ele.parentNode.querySelector('input');

  var product = productInfo[_index],
      selected = document.querySelector("#select".concat(product.id)).checked;
  console.log(ele.parentNode, inputEle);

  if (_op === 'add') {
    var num = product.number + 1;
    productInfo.splice(_index, 1, Object.assign({}, product, {
      number: num
    }));
    inputEle.value = num;
    inputEle.setAttribute('value', num);
  } else {
    var _num = product.number > 1 ? product.number - 1 : 1;

    productInfo.splice(_index, 1, Object.assign({}, product, {
      number: _num
    }));
    inputEle.value = _num;
    inputEle.setAttribute('value', _num);
  }

  if (selected) {
    calculateCost();
  } //let html = template('shopping-list-page', {data: productInfo});
  //document.querySelector('.shopping-list-page').innerHTML = html;

}; //添加或者移除商品进订单里面


window.addProductToOrder = function (ele) {
  console.log(ele.checked);

  var id = ele.getAttribute('data-op-id') - 0,
      _index = productIds.indexOf(id),
      product = productInfo[_index];

  console.log(id, _index, product);

  if (ele.checked) {
    productInfo.splice(_index, 1, Object.assign({}, product, {
      selected: true
    }));
    document.querySelector('#product-id-' + product.id).className = 'product-item product-selected'; //document.querySelector('#batch-operation-btn').checked = true;
  } else {
    productInfo.splice(_index, 1, Object.assign({}, product, {
      selected: false
    }));
    document.querySelector('#product-id-' + product.id).className = 'product-item';
    document.querySelector('#batch-operation-btn').checked = false;
  }

  calculateCost();
}; //删除商品


window.deleteThisProduct = function (ele) {
  console.log(productInfo, '0000', ele.getAttribute('data-op-id') - 0);
  var id = ele.getAttribute('data-op-id') - 0;
  (0, _api.deleteShoppingCart)({
    id: id
  }).then(function (res) {
    console.log(res);
    toast.show({
      content: '删除成功'
    });
    console.log(document.querySelector('#product-id-' + id));
    document.querySelector('.shopping-list-page').removeChild(document.querySelector('#product-id-' + id));
    productInfo.splice(productIds.indexOf(id), 1);
    calculateCost();
    window.dispatchEvent(new CustomEvent('updateShoppingCart'));
  });
}; //提交订单


window.toSumbitOrder = function () {
  var products = [];
  productInfo.map(function (item) {
    if (item.selected) {
      products.push({
        id: item.id,
        number: item.number
      });
    }
  });

  if (products.length > 0) {
    (0, _api.addOrder)(products).then(function (res) {
      console.log(res);
      window.location.href = './edit-order.html?orderId=' + res;
    });
  }

  console.log(products);
}; //计算购买总价格


var calculateCost = function calculateCost() {
  var orderCount = 0,
      productCount = 0;

  if (productInfo.length > 0) {
    productInfo.map(function (item) {
      if (item.selected) {
        orderCount += item.money * item.number;
        productCount++;
      }
    });
    console.log(productInfo);
    orderCount = orderCount.toFixed(2) - 0;

    if (orderCount > 0) {
      document.querySelector('.to-order').style.background = '#f00';
    } else {
      document.querySelector('.to-order').style.background = '#aaa';
    }

    document.querySelector('.order-count').innerHTML = orderCount;
    document.querySelector('.order-quantity').innerHTML = productCount;
  } else {
    document.querySelector('.to-pay').style.visibility = 'hidden';
    document.querySelector('.batch-operation').style.visibility = 'hidden';
    var html = (0, _template.default)('shopping-list-page', {
      data: []
    });
    document.querySelector('.shopping-list-page').innerHTML = html;
  }
}; //计算某个商品的总价


var calculateCount = function calculateCount(index) {
  var product = productInfo[index];
  document.querySelector('#count' + product.id).innerHTML = '￥' + (product.money * product.number).toFixed(2);
}; //渲染函数


var rendering = function rendering() {
  var count = 0,
      quantity = 0;
  var html = (0, _template.default)('shopping-list-page', {
    data: productInfo
  });
  document.querySelector('.shopping-list-page').innerHTML = html;
  setTimeout(function () {
    productInfo.map(function (item, index) {
      if (item.selected) {
        count += item.money * item.number;
        quantity++;
        document.querySelector('#product-id-' + item.id).className = 'product-item product-selected';
      } else {
        document.querySelector('#product-id-' + item.id).className = 'product-item';
      }
    });

    if (count > 0) {
      document.querySelector('.to-order').style.background = '#f00';
    } else {
      document.querySelector('.to-order').style.background = '#aaa';
    }

    document.querySelector('.order-count').innerHTML = count.toFixed(2);
    document.querySelector('.order-quantity').innerHTML = quantity;
  }, 0);
}; //滚动函数


var toPayBar = function toPayBar() {
  var page = document.querySelector('.shopping-list-page'),
      body = document.documentElement,
      pageTop = page.offsetTop,
      pageHeight = page.offsetHeight,
      bodyHeight = body.clientHeight,
      bodyScroll = body.scrollTop,
      ele = document.querySelector('.to-pay');

  if (pageHeight - bodyScroll - (bodyHeight - pageTop) <= 20) {
    ele.className = 'to-pay to-pay-bottom';
  } else {
    ele.className = 'to-pay';
  }
}; //监听页面滚动


window.addEventListener('scroll', toPayBar); //全选

window.selectAll = function (ele) {
  console.log(ele.checked);
  var bool = ele.checked;

  if (bool) {
    productInfo = productInfo.map(function (item) {
      item.selected = true;
      return item;
    });
  } else {
    productInfo = productInfo.map(function (item) {
      item.selected = false;
      return item;
    });
  }

  rendering();
}; //监听商品数量改变


window.checkNumber = function (ele) {
  console.log(ele);
  var index = productIds.indexOf(ele.getAttribute('data-op-id') - 0),
      product = productInfo[index];
  ele.setAttribute('value', ele.value);
  productInfo.splice(index, 1, Object.assign({}, product, {
    number: ele.value - 0
  }));

  if (ele.value - 0 < 1) {
    ele.value = 1;
    ele.setAttribute('value', 1);
    productInfo.splice(index, 1, Object.assign({}, product, {
      number: 1
    }));
  }

  console.log(product, productInfo[index]);
  calculateCount(index);

  if (product.selected) {
    calculateCost();
  }
};