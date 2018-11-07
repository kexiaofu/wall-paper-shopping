import { getOrder } from '../common/api';
import { getParameter } from '../common/tools';

import template from '../common/template';

template.defaults.imports.toFixed2 = (val) => {
  return val.toFixed(2);
};


window.onload = () =>{

  let id = getParameter('id');

  console.log(id);

  if(id !== null) {
    getOrder({id:id})
      .then(res=>{
        console.log(res);
        let html = template('shopping-list-page', {data: res});
        document.querySelector('.shopping-list-page').innerHTML = html;
      });
  } else {
    alert('订单不存在');
  }


};
