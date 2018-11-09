import { getOrder, getAddress, submitOrder } from '../common/api';
import { getParameter } from '../common/tools';

import template from '../common/template';

template.defaults.imports.toFixed2 = (val) => {
  return val.toFixed(2);
};

let address = [],
    isShowAddress = false,
    orderId = '';


window.onload = () =>{

  orderId = getParameter('orderId');

  console.log(orderId);

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

  if(orderId !== null) {
    getOrder({id:orderId})
      .then(res=>{
        console.log(res);

        if(res.orderInfos[0].status === 1) {
          window.location.href = './to-pay.html?orderId='+ orderId
        } else if(res.orderInfos[0].status > 1){
          window.location.href = './my-order.html?orderId='+ orderId
        }

        let html = template('shopping-list-page', {data: res.orderInfos});
        document.querySelector('.shopping-list-page').innerHTML = html;

        let count = template('order-pay-info',{data: res.orderInfos[0]});
        document.querySelector('.order-pay-info').innerHTML = count;

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

window.submitOrder = () =>{
  let addrId = '',remark = document.querySelector('.remark-input').value;
  if(address.length > 0) {
    address.map(item=>{
      if(item.selected) {
        console.log(item);
        addrId = item.id;
      }
    });


    submitOrder({id:orderId,addressId:addrId,description:remark})
      .then(res=>{
        console.log(res);
        window.location.href = './to-pay.html?orderId='+orderId;
      })

  } else {
    alert('请新增您的地址')
  }


};
