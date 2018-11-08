import { getOrder, getAddress } from '../common/api';
import { getParameter } from '../common/tools';

import template from '../common/template';

template.defaults.imports.toFixed2 = (val) => {
  return val.toFixed(2);
};

let address = [],
    isShowAddress = false;


window.onload = () =>{

  let id = getParameter('orderId');

  console.log(id);

  getAddress().then(res=>{
    console.log(res);
    res = res.map(item=>{
      item.selected = false;
      return item;
    });
    res[0].selected = true;
    address = res.slice(0);
    let html = template('address-content',{data:res,isShowAddress:isShowAddress});
    document.querySelector('.address-content').innerHTML = html;
  });

  if(id !== null) {
    getOrder({id:id})
      .then(res=>{
        console.log(res);
        let html = template('shopping-list-page', {data: res});
        document.querySelector('.shopping-list-page').innerHTML = html;
        let totalPaid = document.querySelectorAll('.total-paid');
        let paidCount = 0;
          res.map(item=>{
            paidCount += item.money;
          });
        for(let i=totalPaid.length-1;i>=0;i--) {
          totalPaid[i].innerHTML = '￥' + paidCount;
        }

      });
  } else {
    alert('订单不存在');
  }


};

window.selectAddr = (ele) =>{
  let index = ele.getAttribute('data-op-index')-0;

  address = address.map(item=>{
    item.selected = false;
    return item;
  });

  address[index].selected = true;

  let html = template('address-content',{data:address,isShowAddress:isShowAddress});
  document.querySelector('.address-content').innerHTML = html;

};

window.showAddress = (ele) =>{
  let bool = ele.getAttribute('data-op-show');

  ele.setAttribute('data-op-show',(bool==='false'?true:false));

  isShowAddress = !isShowAddress;

  ele.className = bool==='true'?'show-address':'show-address active';

  let html = template('address-content',{data:address,isShowAddress:isShowAddress});
  document.querySelector('.address-content').innerHTML = html;


};

window.addNewAddress = (ele) =>{};
