import { getOrder, getOrderStatus } from "../common/api";
import template from '../common/template';
import { getParameter, format } from "../common/tools";

let orderInfo = {};

template.defaults.imports.formDate = (val) => {
  return format(new Date(val),'yyyy年MM月dd日 hh:mm:ss')
};

window.onload = () =>{
  let orderId = getParameter('orderId');

  if(orderId === null) {
    alert('订单不存在');
  } else {

    getOrderStatus({orderId:orderId})
      .then(res=>{
        console.log(res)
      });


    getOrder({id:orderId})
      .then(res=>{
        console.log(res);
        orderInfo = res;
        let order = template('order-express-info',{data:res.orderInfos[0]});
        document.querySelector('.order-express-info').innerHTML = order;
        let pay = template('order-pay-info',{data:res.orderInfos[0]});
        document.querySelector('.order-pay-info').innerHTML = pay;

        let baseInfo = template('base-info',{data:res.orderInfos[0],showDetail:true});
        document.querySelector('.base-info').innerHTML = baseInfo;
      })
  }
};

window.showDetail = (ele) =>{
  let baseInfo = [];
  if(ele.getAttribute('data-op-bool') === 'true') {
    baseInfo = template('base-info',{data:orderInfo.orderInfos[0],showDetail:true});
  } else {
    baseInfo = template('base-info',{data:[],showDetail:false});
  }
  document.querySelector('.base-info').innerHTML = baseInfo;
};