import {addShoppingCart, getEditorOption, getProductDetail, uploadEditorImage} from '../common/api';

import {getParameter} from '../common/tools';

import template from '../common/template';
import Toast from '../common/toast';

let scrollX = (direct, w, parent) => {
  console.log(direct, w, parent);
  parent.style.left = parent.offsetLeft + direct * (w + 5) + 'px';
};

let editorInfo = [], productDetail = [], box = {} ;

window.onload = () => {

  let id = getParameter('productId');

  if (id === null) {
    return alert('没有该产品');
  }

  let containerEle = document.querySelector('.product-container'),
    detailEle = document.querySelector('.product-detail');

  //取得產品信息

  getProductDetail({id: id})
    .then(res => {
      console.log(res);

      const props = res.productOptions;

      res = Object.assign({}, res, {price: res.basePrice || 0});

      getEditorOption({productId: id})
        .then(eo => {
          box = JSON.parse(JSON.stringify(eo));
          delete box.options;
          let options = eo.options.map(item => {
            item.values = item.values.map((v, index) => {
              v.selected = false;
              if (props.length > 0) {
                for (let i = props.length - 1; i >= 0; i--) {
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
          console.log(options);
          // 因为要计算总价
          let html = template('product-info', {data: res}),
            detail = template('product-detail', {data: res});

          containerEle.style.visibility = 'visible';
          (res.detailImages.length > 0 && (detailEle.style.visibility = 'visible'));

          document.querySelector('.product-container').innerHTML = html;
          document.querySelector('.product-detail').innerHTML = detail;

          setTimeout(() => {
            let html = template('editor-info', {data: options});
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
};

let changeBox = (box) => {
  console.log(box);
  document.querySelector('.page-box').style.cssText = `width: ${box.materialBoxWidth - box.materialWidth * 2}px;
            height: ${box.materialBoxHeight - box.materialWidth * 2}px;
            background: ${box.pageBoxBg};
            margin: ${(box.materialWidth)}px`;
  document.querySelector('.trim-box').style.cssText = `width: ${box.materialBoxWidth - box.materialWidth * 2 - box.pageWidth * 2}px;
            height: ${box.materialBoxHeight - box.materialWidth * 2 - box.pageWidth * 2}px;
            margin: ${box.pageWidth}px`;

  document.querySelector('.trim-box img').style.cssText = `width: ${box.materialBoxWidth - box.materialWidth * 2 - box.pageWidth * 2}px;
            height: ${box.materialBoxHeight - box.materialWidth * 2 - box.pageWidth * 2}px;`;

  document.querySelector('.material-box').style.cssText = `width: ${box.materialBoxWidth}px;
            height: ${box.materialBoxHeight}px;
            background:url(${ box.materialBoxBg}) no-repeat;
            background-size:cover;
            display: block;`;
};

window.toAddShoppingCart = () => {
  let select = document.querySelectorAll('.props-item>select'),
    selectStr = '',
    quantity = document.querySelector('.product-quantity');
  editorInfo.map(item => {
    item.values.map(v => {
      if (v.selected) {
        selectStr += item.id + ':' + v.id + ';';
      }
    });
  });

  console.log(selectStr);

  addShoppingCart({
    productType: productDetail.productType,
    productId: getParameter('productId'),
    number: quantity.value,
    optionValueIds: selectStr.substring(0, selectStr.length - 1)
  })
    .then(res => {
      console.log(res);
      let toast = new Toast();
      toast.show({
        content: '成功加入购物车了'
      });

      window.dispatchEvent(new CustomEvent('updateShoppingCart'));

    })

};

window.checkNumber = (ele) => {
  console.log(ele);
  ele.setAttribute('value', ele.value);
  if ((ele.value - 0) < 1) {
    ele.value = 1;
    ele.setAttribute('value', 1)
  }
};

window.showSelectBox = (ev, bool) => {
  let id = ev.target.getAttribute('data-op-id'),
      len = ev.target.getAttribute('data-op-len'),
    ele = document.querySelector('#drop-down-'+id);
  ele.style.height = bool === true ? len * 32 + 'px' : 0;
};

window.selectThisProp = (ev) => {
  console.log(ev.target);
  let target = ev.target, type = +target.getAttribute('data-type'), id = +target.getAttribute('data-prop-id');
  for (let i = editorInfo.length - 1; i >= 0; i--) {
    if (editorInfo[i].type === type) {
      editorInfo[i].values = editorInfo[i].values.map(item => {
        item.selected = false;
        if (item.id === id) {
          item.selected = true;
          ((type === 4 || type === 5) && (editorInfo[i].selectValue = item.name));
          if (type === 2) {
            box.materialBoxBg = item.largeImage;
            box.materialWidth = item.width;
            /*let box = document.querySelector('.material-box');
            box.style.background = `url(${item.largeImage}) no-repeat`;
            box.style.backgroundSize = 'cover';*/
          }
          if (type === 3) {
            box.pageBoxBg = item.color;
            box.pageWidth = item.width;
            // document.querySelector('.page-box').style.background = item.color;
          }
        }
        return item;
      });
      break;
    }
  }
  let html = template('editor-info', {data: editorInfo});
  console.log(editorInfo, document.querySelector('.product-info>.props'));
  document.querySelector('.product-info>.props').innerHTML = html;

  changeBox(box);

  let price = productDetail.hasOwnProperty('basePrice') ? productDetail.basePrice : 0;
  editorInfo.map(item => {
    item.values.map(v => {
      if (v.selected) {
        price -= -Number(v.price)
      }
    });
  });

  productDetail = Object.assign({}, productDetail, {price: price});

  console.log(price);
  document.querySelector('.price-count').innerHTML = '￥' + price;


};

window.selectShape = (ev) => {
  let target = ev.target,
    index = +target.getAttribute('data-op-index'),
    pid = +target.getAttribute('data-parent-id'),
    id = +target.getAttribute('data-prop-id'),
    propId = +target.getAttribute('data-op-prop-id'),
    price = productDetail.basePrice;
  getEditorOption({shapeId: id})
    .then(res => {
      let options = res.options;

      let b = JSON.parse(JSON.stringify(res));

      delete b.options;

      box = Object.assign({}, box, b);
      editorInfo = res.options.slice(0);
      console.log(editorInfo, 'editorInfo');
      editorInfo = editorInfo.map(item => {
        item.values = item.values.map((v, _index) => {
          v.selected = false;
          console.log(item.id, pid);
          if (item.id === pid) {
            v.selected = true;
          } else {
            if (_index === 0) {
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
  setTimeout(() => {
    let html = template('editor-info', {data: editorInfo});
    console.log(editorInfo, document.querySelector('.product-info>.props'));
    document.querySelector('.product-info>.props').innerHTML = html;
    console.log(box);
    changeBox(box);
    productDetail = Object.assign({}, productDetail, {price: price});

    console.log(price);
    document.querySelector('.price-count').innerHTML = '￥' + price;
  }, 100);
};

window.toUploadImage = () => {

  console.log(document.querySelector('#upload-file'));
  document.querySelector('#upload-file').click();
};

window.uploadImage = () => {
  uploadEditorImage(new FormData(document.querySelector('#upload-form')), {id: 0})
    .then(res => {
      productDetail = Object.assign({}, productDetail, res);
      document.querySelector('.product-picture').setAttribute('src', res.productImages[0].imageUrl);
    });
};