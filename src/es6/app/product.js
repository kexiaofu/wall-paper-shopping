import { getProductDetail, addShoppingCart, getEditorOption } from '../common/api';

import {getParameter, imageLazyLoad} from '../common/tools';

import template from '../common/template';
import Toast from '../common/toast';

let scrollX = (direct,w,parent) =>{
  console.log(direct,w,parent);
    parent.style.left = parent.offsetLeft +  direct * (w + 5) + 'px';
};

let editorInfo = [];

window.onload = () =>{

  let id = getParameter('productId');

  if(id === null) {
    return alert('没有该产品');
  }

  let containerEle = document.querySelector('.product-container'),
      detailEle = document.querySelector('.product-detail');

  //取得產品信息
  if (id !== 0) {
    getProductDetail({id:id})
      .then(res=>{
        console.log(res);

        let html = template('product-info',{data:res}),
          detail = template('product-detail',{data:res});

        containerEle.style.visibility = 'visible';
        detailEle.style.visibility = 'visible';

        document.querySelector('.product-container').innerHTML = html;
        document.querySelector('.product-detail').innerHTML = detail;

        getEditorOption({productId: id})
          .then(res => {
            let html = template('editor-info',{data:res});
              console.log(res, document.querySelector('.product-info>.props'));
              document.querySelector('.product-info>.props').innerHTML = html;
              editorInfo = res;
          })

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
    getEditorOption({shapeId: id})
      .then(res => {
        console.log(res);
      })
  }


};

window.toAddShoppingCart = () =>{
  let select = document.querySelectorAll('.props-item>select'),
      selectStr = '',
      quantity = document.querySelector('.product-quantity');
  for(let i=0,l=select.length;i<l;i++) {
    console.log(select[i][select[i].selectedIndex].getAttribute('data-op-id'));
    selectStr += select[i][select[i].selectedIndex].getAttribute('data-op-id') + ',';
  }
  console.log(selectStr.substring(0,selectStr.length-1),quantity.value);


  addShoppingCart({
    productId:getParameter('productId'),
    number:quantity.value,
    optionValueIds:selectStr.substring(0,selectStr.length-1)
  })
    .then(res=>{
      console.log(res);
      let toast = new Toast();
      toast.show({
        content:'成功加入购物车了'
      });

      window.dispatchEvent(new CustomEvent('updateShoppingCart'));

    })

};

window.checkNumber = (ele) =>{
  console.log(ele);
  ele.setAttribute('value',ele.value);
  if((ele.value-0) < 1) {
    ele.value = 1;
    ele.setAttribute('value',1)
  }
};

window.showSelectBox = (ev, bool) => {
  if (ev.target.getAttribute('data-type') === 'paper') {
      for (let i = editorInfo.length-1;i>=0;i--) {
        if (editorInfo[i].type === 4) {
          document.querySelector('.paper-box').style.height = bool === true ? editorInfo[i].values.length * 32 + 5 + 'px' : 0;
        }
      }
  } else {
    for (let i = editorInfo.length-1;i>=0;i--) {
      if (editorInfo[i].type === 5) {
        console.log(editorInfo[i].values.length, editorInfo[i].values);
        document.querySelector('.poli-box').style.height = bool === true ? (editorInfo[i].values.length -1) * 32 + 5 + 'px' : 0;
      }
    }
  }
};

window.selectThisValue = (type, index) => {
  if (type === 'paper') {
    document.querySelector('.paper-input').value = '呵呵呵';
  } else {}
};