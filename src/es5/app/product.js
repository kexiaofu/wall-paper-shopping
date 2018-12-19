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

var editorInfo = [],
    productDetail = [],
    box = {},
    showImgIndex = null;
var productScaleWidth = 1;
var showImgs = [{
  src: '../images/1.jpg',
  pos: -10
}, {
  src: '../images/2.jpeg',
  pos: -150
}, {
  src: '../images/3.jpeg',
  pos: -200
}, {
  src: '../images/4.jpg',
  pos: -300
}];

window.onload = function () {
  var id = (0, _tools.getParameter)('productId');
  var shoppingCartId = (0, _tools.getParameter)('shoppingCartId');
  console.log((0, _tools.getParameter)('productId'), (0, _tools.getParameter)('shoppingCartId'));

  if (id === null && shoppingCartId === null) {
    return alert('没有该产品');
  }

  var containerEle = document.querySelector('.product-container'),
      detailEle = document.querySelector('.product-detail'); //取得產品信息

  (0, _api.getProductDetail)({
    id: id,
    shoppingCartId: shoppingCartId
  }).then(function (res) {
    console.log(res);
    var props = res.productOptions;
    res = Object.assign({}, res, {
      price: res.basePrice || 0
    });
    (0, _api.getEditorOption)({
      productId: res.productType == 2 ? 0 : res.id
    }).then(function (eo) {
      box = JSON.parse(JSON.stringify(eo));
      delete box.options;
      var options = eo.options.map(function (item) {
        item.values = item.values.map(function (v, index) {
          v.selected = false;

          if (props.length > 0) {
            for (var i = props.length - 1; i >= 0; i--) {
              if (props[i].optionId === item.id && v.id === +props[i].selectValue) {
                v.selected = true;
                res.price -= -Number(v.price);

                if (item.type === 4 || item.type === 5) {
                  item.selectValue = v.name;
                }

                if (item.type === 2) {
                  box.materialBoxBg = v.largeImage;
                  box.materialWidth = v.width;
                }

                if (item.type === 3) {
                  box.pageBoxBg = v.color;
                  box.pageWidth = v.width;
                }
              }
            }
          } else {
            if (index === 0) {
              v.selected = true;
              res.price -= -Number(v.price);

              if (item.type === 4 || item.type === 5) {
                item.selectValue = v.name;
              }

              if (item.type === 2) {
                box.materialBoxBg = v.largeImage;
                box.materialWidth = v.width;
              }

              if (item.type === 3) {
                box.pageBoxBg = v.color;
                box.pageWidth = v.width;
              }
            }
          }

          return v;
        });
        return item;
      });
      console.log(options); // 因为要计算总价

      var html = (0, _template.default)('product-info', {
        data: res,
        imgs: showImgs
      }),
          detail = (0, _template.default)('product-detail', {
        data: res
      });
      containerEle.style.visibility = 'visible';
      res.detailImages.length > 0 && (detailEle.style.visibility = 'visible');
      document.querySelector('.product-container').innerHTML = html;
      document.querySelector('.product-detail').innerHTML = detail;
      setTimeout(function () {
        var html = (0, _template.default)('editor-info', {
          data: options
        });
        console.log(res, document.querySelector('.product-info>.props'));
        document.querySelector('.product-info>.props').innerHTML = html;
        editorInfo = eo.options;
        changeBox(box);
      }, 100);
    });
    productDetail = res;
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
}; // 更换画框


var changeBox = function changeBox(box) {
  console.log(box);
  document.querySelector('.page-box').style.cssText = "width: ".concat(box.materialBoxWidth - box.materialWidth * 2, "px;\n            height: ").concat(box.materialBoxHeight - box.materialWidth * 2, "px;\n            background: ").concat(box.pageBoxBg, ";\n            margin: ").concat(box.materialWidth, "px");
  document.querySelector('.trim-box').style.cssText = "width: ".concat(box.materialBoxWidth - box.materialWidth * 2 - box.pageWidth * 2, "px;\n            height: ").concat(box.materialBoxHeight - box.materialWidth * 2 - box.pageWidth * 2, "px;\n            margin: ").concat(box.pageWidth, "px");
  var img = document.querySelector('.trim-box img');
  img.style.width = "".concat(box.materialBoxWidth - box.materialWidth * 2 - box.pageWidth * 2, "px");
  img.style.height = "".concat(box.materialBoxHeight - box.materialWidth * 2 - box.pageWidth * 2, "px");
  var materialbox = document.querySelector('.material-box'); // scaleX = materialbox.getAttribute('data-op-scale-x'),
  // scaleY = materialbox.getAttribute('data-op-scale-y'),
  // topPos = materialbox.getAttribute('data-op-top');

  materialbox.style.cssText = "width: ".concat(box.materialBoxWidth, "px;\n            height: ").concat(box.materialBoxHeight, "px;\n            background:url(").concat(box.materialBoxBg, ") no-repeat;\n            background-size:cover;\n            transform: scale(").concat(productScaleWidth, ") translate(0, ").concat(showImgIndex !== null ? showImgs[showImgIndex].pos : 0, "px);\n            display: block;");
};

window.toAddShoppingCart = function () {
  if (productDetail.productImages.length === 0) {
    alert('请上传图片');
    return;
  }

  var select = document.querySelectorAll('.props-item>select'),
      selectStr = '',
      quantity = document.querySelector('.product-quantity');
  editorInfo.map(function (item) {
    item.values.map(function (v) {
      if (v.selected) {
        selectStr += item.id + ':' + v.id + ';';
      }
    });
  });
  console.log(selectStr);
  (0, _api.addShoppingCart)({
    editorType: productDetail.editorType,
    editorOption: productDetail.editorOption,
    productType: productDetail.productType,
    productId: productDetail.id,
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
  var id = ev.target.getAttribute('data-op-id'),
      len = ev.target.getAttribute('data-op-len'),
      ele = document.querySelector('#drop-down-' + id);
  ele.style.height = bool === true ? len * 32 + 'px' : 0;
};

window.selectThisProp = function (ev) {
  console.log(ev.target);
  var target = ev.target,
      type = +target.getAttribute('data-type'),
      id = +target.getAttribute('data-prop-id');

  var _loop = function _loop(i) {
    if (editorInfo[i].type === type) {
      editorInfo[i].values = editorInfo[i].values.map(function (item) {
        item.selected = false;

        if (item.id === id) {
          item.selected = true;
          (type === 4 || type === 5) && (editorInfo[i].selectValue = item.name);

          if (type === 2) {
            box.materialBoxBg = item.largeImage;
            box.materialWidth = item.width;
          }

          if (type === 3) {
            box.pageBoxBg = item.color;
            box.pageWidth = item.width;
          }
        }

        return item;
      });
      return "break";
    }
  };

  for (var i = editorInfo.length - 1; i >= 0; i--) {
    var _ret = _loop(i);

    if (_ret === "break") break;
  }

  var html = (0, _template.default)('editor-info', {
    data: editorInfo
  });
  console.log(editorInfo, document.querySelector('.product-info>.props'));
  document.querySelector('.product-info>.props').innerHTML = html;
  changeBox(box);
  var price = productDetail.hasOwnProperty('basePrice') ? productDetail.basePrice : 0;
  editorInfo.map(function (item) {
    item.values.map(function (v) {
      if (v.selected) {
        price -= -Number(v.price);
      }
    });
  });
  productDetail = Object.assign({}, productDetail, {
    price: price
  });
  console.log(price);
  document.querySelector('.price-count').innerHTML = '￥' + price;
};

window.selectShape = function (ev) {
  var target = ev.target,
      index = +target.getAttribute('data-op-index'),
      pid = +target.getAttribute('data-parent-id'),
      id = +target.getAttribute('data-prop-id'),
      propId = +target.getAttribute('data-op-prop-id'),
      price = productDetail.basePrice;
  (0, _api.getEditorOption)({
    shapeId: id
  }).then(function (res) {
    var options = res.options;
    var b = JSON.parse(JSON.stringify(res));
    delete b.options;
    box = Object.assign({}, box, b);
    editorInfo = res.options.slice(0);
    console.log(editorInfo, 'editorInfo');
    editorInfo = editorInfo.map(function (item) {
      item.values = item.values.map(function (v, _index) {
        v.selected = false;
        console.log(item.id, pid);

        if (item.id === pid && v.id === id) {
          v.selected = true;
        } else {
          if (item.type !== 0 && _index === 0) {
            v.selected = true;
            price -= -Number(v.price);

            if (item.type === 4 || item.type === 5) {
              item.selectValue = item.name;
            }

            if (item.type === 2) {
              console.log(v.largeImage);
              box.materialBoxBg = v.largeImage;
              box.materialWidth = v.width;
            }

            if (item.type === 3) {
              box.pageBoxBg = v.color;
              box.pageWidth = v.width;
            }
          }
        }

        return v;
      });
      return item;
    });
  });
  console.log(editorInfo);
  setTimeout(function () {
    var html = (0, _template.default)('editor-info', {
      data: editorInfo
    });
    console.log(editorInfo, document.querySelector('.product-info>.props'));
    document.querySelector('.product-info>.props').innerHTML = html;
    console.log(box);
    changeBox(box);
    productDetail = Object.assign({}, productDetail, {
      price: price
    });
    console.log(price);
    document.querySelector('.price-count').innerHTML = '￥' + price;
  }, 100);
};

window.toUploadImage = function () {
  console.log(document.querySelector('#upload-file'));
  document.querySelector('#upload-file').click();
};

window.uploadImage = function () {
  (0, _api.uploadEditorImage)(new FormData(document.querySelector('#upload-form')), {
    productId: productDetail.id || 0
  }).then(function (res) {
    if (productDetail.productImages.length > 0) {
      document.querySelector('#product-img').setAttribute('src', res.productImages[0].imageUrl);
    } else {
      document.querySelector('.product-picture').setAttribute('src', res.productImages[0].imageUrl);
    }

    productDetail = Object.assign({}, productDetail, res);
    console.log(res.productImages[0].imageUrl, productDetail);
  });
};

var stopScale = null,
    scalePer = 1,
    rotateDeg = 0;

var scaleImg = function scaleImg(ele, plus) {
  scalePer += plus * 0.01;
  scalePer = scalePer >= 1 ? scalePer : 1;
  ele.innerHTML = parseInt(scalePer * 100, 10) + '%';
  var img = document.querySelector('#product-img');

  if (img !== null) {
    img.style.transform = "scale(".concat(scalePer, ") rotate(").concat(rotateDeg, "deg)");
  }

  var obj = Object.assign({}, productDetail.editorOption, {
    rotate: rotateDeg,
    scale: parseInt(scalePer * 100, 10)
  });
  productDetail = Object.assign({}, productDetail, {
    editorOption: obj
  });
  console.log(productDetail);
};

window.scaleProductImage = function (plus) {
  var scale = document.querySelector('#scale-number');
  scaleImg(scale, plus);
  stopScale = setInterval(function () {
    scaleImg(scale, plus);
  }, 200);
};

document.addEventListener('mouseup', function () {
  if (stopScale) {
    clearInterval(stopScale);
  }
}); // 图片旋转

window.rotateProductImage = function (ev) {
  rotateDeg -= 90;
  var img = document.querySelector('#product-img');

  if (img !== null) {
    img.style.transform = "scale(".concat(scalePer, ") rotate(").concat(rotateDeg, "deg)");
  }

  var obj = Object.assign({}, productDetail.editorOption, {
    rotate: Number(rotateDeg),
    scale: parseInt(scalePer * 100, 10)
  });
  productDetail = Object.assign({}, productDetail, {
    editorOption: obj
  });
  console.log(productDetail);
}; // 更换产品的展示方式


window.changeShowType = function (ev, type) {
  var target = ev.target;

  if (target.className !== 'active-type') {
    document.querySelector('.active-type').className = '';
    target.className = 'active-type';
  }

  var materialBox = document.querySelector('.material-box');

  if (type === 1) {
    productScaleWidth = .25;
    materialBox.style.transform = "scale(".concat(productScaleWidth, ")");
    materialBox.querySelector('.operation-box').style.display = 'none';
    document.querySelector('.scene-container').style.transform = 'translate(0, 0)';
    showImgIndex = 0;
    changeScene(showImgIndex);
  } else {
    showImgIndex = null;
    productScaleWidth = 1;
    materialBox.style.transform = "scale(".concat(productScaleWidth, ")");
    materialBox.querySelector('.operation-box').style.display = 'flex';
    document.querySelector('.scene-container').style.transform = 'translate(-100px, 0px)';
    document.querySelector('.material-box-content').style.background = "";
  }
}; // 更换场景


window.changeScene = function (index) {
  showImgIndex = index;
  document.querySelector('.material-box-content').style.background = "url(".concat(showImgs[index].src, ")");
  document.querySelector('.material-box').style.transform = "scale(".concat(productScaleWidth, ") translate(").concat(box.materialBoxWidth * productScaleWidth / 2, "px, ").concat(showImgs[index].pos, "px)");
}; // 更改商品数量


window.changeQuantity = function (plus) {
  var input = document.querySelector('.product-quantity'),
      value = input.value;
  value -= -plus;
  input.value = value;
  input.setAttribute('value', value);
};