import { getOrder } from '../common/api'
import template from '../common/template';

window.orderTypeActive = (hash=null) =>{
  let orderType = document.querySelectorAll('.order-type'),
      hashState = hash || window.location.hash;

  for(let i=orderType.length-1;i>=0;i--) {
    orderType[i].className = 'order-type';
  }

  switch (hashState) {
    case '#wait2pay':
      orderType[1].className = 'order-type active';
      break;
    case '#wait2send':
      orderType[2].className = 'order-type active';
      break;
    case '#wait2take':
      orderType[3].className = 'order-type active';
      break;
    case '#all':
    default:
      orderType[0].className = 'order-type active';
  }

  //暂时没有状态的
  getOrder().then(res=>{
    console.log(res);
    let html = template('order-content',{data:res});
    document.querySelector('.order-content').innerHTML = html;
  })

};


window.onload = () =>{
  console.log(window.location.hash);
  orderTypeActive();
  if('onhashchange' in window) {
    window.onhashchange = () =>{
      orderTypeActive();
    }
  }

};