import template from '../common/template';

import { deleteShoppingCart } from '../common/api';

template.defaults.imports.toFixed2 = (val) =>{
  return val.toFixed(2);
};

let productInfo = [],
    orderCount = 0,
    productCount = 0;

window.addEventListener('shoppingCartInfo',(e)=>{
  let html = '';
  if(e.detail) {
    productInfo = e.detail;
    productInfo = productInfo.map(item=>{
      item.selected = false;
      return item;
    });
    html = template('shopping-list-page',{data:productInfo})
  } else {
    html = template('shopping-list-page',{data:[]})
  }
  document.querySelector('.shopping-list-page').innerHTML = html;

});

window.opProductQuantity = (ele) =>{
  let _index = ele.getAttribute('data-op-index'),
      _op = ele.getAttribute('data-op');

  let product = productInfo[_index],
    selected = document.querySelector(`#select${product.id}`).checked;

  console.log(selected);

  if(_op === 'add') {
    productInfo.splice(_index,1,Object.assign({},product,{
      number:product.number+1
    }));
  } else {
    productInfo.splice(_index,1,Object.assign({},product,{
      number:product.number>1?product.number-1:1
    }));
  }

  if(selected) {
    let count = 0;
    productInfo.map(item=>{
      item.selected && (count += (item.money * item.number));
    });
    orderCount = count.toFixed(2)-0;
    document.querySelector('.order-count').innerHTML = orderCount;
  }


  let html = template('shopping-list-page',{data:productInfo});
  document.querySelector('.shopping-list-page').innerHTML = html;

};

window.addProductToOrder = (ele) => {
  console.log(ele.checked);
  let _index = ele.getAttribute('data-op-index'),
      product = productInfo[_index];
  if(ele.checked) {
    productCount +=1;
    orderCount += (product.money * product.number);
    productInfo.splice(_index,1,Object.assign({},product,{
      selected:true
    }));
  } else {
    productCount -=1;
    orderCount -= (product.money * product.number);
    productInfo.splice(_index,1,Object.assign({},product,{
      selected:false
    }));
  }

  orderCount = orderCount.toFixed(2) -0;

  if(orderCount > 0) {
    document.querySelector('.to-order').style.background = '#f00';
  } else {
    document.querySelector('.to-order').style.background = '#aaa';
  }

  document.querySelector('.order-count').innerHTML = orderCount;
  document.querySelector('.order-quantity').innerHTML = productCount;

};

window.deleteThisProduct = (ele) =>{
  let index = ele.getAttribute('data-op-index');

  deleteShoppingCart({id:productInfo[index].id})
    .then(res=>{
      console.log(res)

    })

};


