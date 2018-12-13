"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _api = require("../common/api");

var _tools = require("../common/tools");

var _template = _interopRequireDefault(require("../common/template"));

var _toast = _interopRequireDefault(require("../common/toast"));

var scrollX = function scrollX(direct, w, parent) {
  console.log(direct, w, parent);
  parent.style.left = parent.offsetLeft + direct * (w + 5) + 'px';
};

var editorInfo = [];

window.onload = function () {
  var id = (0, _tools.getParameter)('productId');

  if (id === null) {
    return alert('没有该产品');
  }

  var containerEle = document.querySelector('.product-container'),
      detailEle = document.querySelector('.product-detail'); //取得產品信息

  if (id !== 0) {
    (0, _api.getProductDetail)({
      id: id
    }).then(function (res) {
      console.log(res);
      var html = (0, _template.default)('product-info', {
        data: res
      }),
          detail = (0, _template.default)('product-detail', {
        data: res
      });
      containerEle.style.visibility = 'visible';
      detailEle.style.visibility = 'visible';
      document.querySelector('.product-container').innerHTML = html;
      document.querySelector('.product-detail').innerHTML = detail;
      (0, _api.getEditorOption)({
        productId: id
      }).then(function (res) {
        var html = (0, _template.default)('editor-info', {
          data: res
        });
        console.log(res, document.querySelector('.product-info>.props'));
        document.querySelector('.product-info>.props').innerHTML = html;
        editorInfo = res;
      });
      /*if(res.productImages.length > 6) {
        document.querySelector('.left-btn').addEventListener('click',()=>{
          let ele = document.querySelectorAll('.pic-item'),
            l = ele.length,
            w = ele[0].offsetWidth,
            parent = document.querySelector('.pic-ul'),
            container = document.querySelector('.pic-container');
          if((l * w - container.offsetWidth) > -parent.offsetLeft ) {
            scrollX(-1,w,parent)
          }
        });
          document.querySelector('.right-btn').addEventListener('click',()=>{
          let ele = document.querySelectorAll('.pic-item'),
            w = ele[0].offsetWidth,
            parent = document.querySelector('.pic-ul');
          if(parent.offsetLeft < 0 ) {
            scrollX(1,w,parent)
          }
        });
      } else {
        document.querySelector('.pic-container').style.width = '500px';
      }
        let productionPrice = document.querySelector('.product-price');
        if(res.productOptions.length > 0) {
        let productOptions = res.productOptions,
          price = 0;
          for(let i=productOptions.length-1;i>=0;i--) {
          console.log(-productOptions[i].optionValue[0].price);
          price -= (-productOptions[i].optionValue[0].price)
        }
          productionPrice.innerHTML = price;
        }
        let targetPic = document.querySelector('.show-pic');
        document.querySelector('.pic-container').addEventListener('mousemove',(e)=>{
        if(e.target.tagName.toLowerCase() === 'img' && targetPic.getAttribute('src') !== e.target.getAttribute('src')) {
          targetPic.setAttribute('src',e.target.getAttribute('src'));
        }
        },false);
        document.querySelector('.add').addEventListener('click',()=>{
        let quantity = document.querySelector('.product-quantity');
        quantity.value -= -1;
        quantity.setAttribute('value',quantity.value)
      });
        document.querySelector('.reduce').addEventListener('click',()=>{
        let quantity = document.querySelector('.product-quantity');
        if(quantity.value > 1) {
          quantity.value -= 1;
          quantity.setAttribute('value',quantity.value)
          }
      });
        let select = document.querySelectorAll('.props-item>select');
        console.log(select);
        for(let i=select.length-1;i>=0;i--) {
        console.log(select[i].value);
        ((_i)=>{
          select[_i].addEventListener('change',(e)=>{
            console.log(select[_i].value);
            let price = 0;
            for(let j=select.length-1;j>=0;j--) {
              price -= -select[j].value;
            }
            productionPrice.innerHTML = price;
          })
        })(i)
      }
      */
    });
  } else {
    (0, _api.getEditorOption)({
      shapeId: id
    }).then(function (res) {
      console.log(res);
    });
  }
};

window.toAddShoppingCart = function () {
  var select = document.querySelectorAll('.props-item>select'),
      selectStr = '',
      quantity = document.querySelector('.product-quantity');

  for (var i = 0, l = select.length; i < l; i++) {
    console.log(select[i][select[i].selectedIndex].getAttribute('data-op-id'));
    selectStr += select[i][select[i].selectedIndex].getAttribute('data-op-id') + ',';
  }

  console.log(selectStr.substring(0, selectStr.length - 1), quantity.value);
  (0, _api.addShoppingCart)({
    productId: (0, _tools.getParameter)('productId'),
    number: quantity.value,
    optionValueIds: selectStr.substring(0, selectStr.length - 1)
  }).then(function (res) {
    console.log(res);
    var toast = new _toast.default();
    toast.show({
      content: '成功加入购物车了'
    });
    window.dispatchEvent(new CustomEvent('updateShoppingCart'));
  });
};

window.checkNumber = function (ele) {
  console.log(ele);
  ele.setAttribute('value', ele.value);

  if (ele.value - 0 < 1) {
    ele.value = 1;
    ele.setAttribute('value', 1);
  }
};

window.showSelectBox = function (ev, bool) {
  if (ev.target.getAttribute('data-type') === 'paper') {
    for (var i = editorInfo.length - 1; i >= 0; i--) {
      if (editorInfo[i].type === 4) {
        document.querySelector('.paper-box').style.height = bool === true ? editorInfo[i].values.length * 32 + 5 + 'px' : 0;
      }
    }
  } else {
    for (var _i = editorInfo.length - 1; _i >= 0; _i--) {
      if (editorInfo[_i].type === 5) {
        console.log(editorInfo[_i].values.length, editorInfo[_i].values);
        document.querySelector('.poli-box').style.height = bool === true ? (editorInfo[_i].values.length - 1) * 32 + 5 + 'px' : 0;
      }
    }
  }
};

window.selectThisValue = function (type, index) {
  if (type === 'paper') {
    document.querySelector('.paper-input').value = '呵呵呵';
  } else {}
};