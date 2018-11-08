import { getOrder } from '../common/api'
import template from '../common/template';
import Pagination from '../common/pagination';

let pages = null,
  orderStatus = '';

window.orderTypeActive = (index, hash) =>{
  let orderType = document.querySelectorAll('.order-type'),
      hashState = hash || window.location.hash;

  console.log(index,hash,typeof index);

  for(let i=orderType.length-1;i>=0;i--) {
    orderType[i].className = 'order-type';
  }

  switch (hashState) {
    case '#order-done':
      orderType[1].className = 'order-type active';
      toGetOrder(index,3);
      break;
    case '#order-no-pay':
      orderType[2].className = 'order-type active';
      toGetOrder(index,1);
      break;
    case '#order-close':
      orderType[3].className = 'order-type active';
      toGetOrder(index,4);
      break;
    case '#order-income':
      orderType[4].className = 'order-type active';
      toGetOrder(index,5);
      break;
    case '#all':
    default:
      orderType[0].className = 'order-type active';
      toGetOrder(index,null);
  }
};


let toPage = (index) =>{
  orderTypeActive(index,orderStatus);
};

let toGetOrder = (index,status) =>{

  if(status) {
    getOrder({pageIndex:index,status:status}).then(res=>{
      console.log(res);
      if(pages === null) {
        pages = new Pagination({
          parent:document.querySelector('.my-order'),
          totalPages:res.totalPageCount,
          currentPage:res.currentPageIndex,
          toPage:toPage
        });
      } else {
        pages.init({
          parent:document.querySelector('.my-order'),
          totalPages:res.totalPageCount,
          currentPage:res.currentPageIndex,
          toPage:toPage
        })
      }
      let html = template('order-content',{data:res.orderInfos});
      document.querySelector('.order-content').innerHTML = html;
    })
  } else {
    getOrder({pageIndex:index}).then(res=>{
      console.log(res);
      if(pages === null) {
        pages = new Pagination({
          parent:document.querySelector('.my-order'),
          totalPages:res.totalPageCount,
          currentPage:res.currentPageIndex,
          toPage:toPage
        });
      } else {
        pages.init({
          parent:document.querySelector('.my-order'),
          totalPages:res.totalPageCount,
          currentPage:res.currentPageIndex,
          toPage:toPage
        })
      }


      let html = template('order-content',{data:res.orderInfos});
      document.querySelector('.order-content').innerHTML = html;
    })
  }

};

window.onload = () =>{
  console.log(window.location.hash);
  orderTypeActive(1,null);
  if('onhashchange' in window) {
    window.onhashchange = () =>{
      orderStatus = window.location.hash;
      orderTypeActive(1,orderStatus);
    }
  }

};