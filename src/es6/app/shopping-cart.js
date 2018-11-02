import template from '../common/template';
import { getShoppingCarInfo } from '../common/api';

template.defaults.imports.toFixed2 = (val) =>{
  return val.toFixed(2);
};

window.addEventListener('shoppingCartInfo',(e)=>{
  let html = '';
  if(e.detail) {
    html = template('shopping-list-page',{data:e.detail})
  } else {
    html = template('shopping-list-page',{data:[]})
  }
  document.querySelector('.shopping-list-page').innerHTML = html;
});

