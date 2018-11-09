import { getOrder, payOrder, checkOrder } from "../common/api";
import template from '../common/template';
import { getParameter, format } from "../common/tools";

let orderInfo = {},
    payWay = 'wechat',
    orderId = null;

template.defaults.imports.formDate = (val) => {
  return format(new Date(val),'yyyy年MM月dd日 hh:mm:ss')
};

window.onload = () =>{
  orderId = getParameter('orderId');

  if(orderId === null) {
    alert('订单不存在');
  } else {

    getOrder({id:orderId})
      .then(res=>{
        console.log(res);

        if(res && res.hasOwnProperty('orderInfos') && res.orderInfos.length === 0) {
          document.querySelector('.to-pay-container').style.display = 'none';
          alert('订单不存在');
          return false;
        }

        orderInfo = res;

        if(res.orderInfos[0].status === 0) {
          window.location.href = './edit-order.html?orderId=' + orderId;
        } else if(res.orderInfos[0].status > 1) {
          window.location.href = './my-order.html?orderId='+ orderId
        }

        let baseInfo = template('base-info',{data:res.orderInfos[0],showDetail:true});
        document.querySelector('.base-info').innerHTML = baseInfo;

        document.querySelector('.money').innerHTML = '￥' + res.orderInfos[0].money;

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

window.selectThisPayWay = (ele) =>{
  if(ele !== ele.getAttribute('data-op-way')) {
    payWay = ele.getAttribute('data-op-way');
    document.querySelector('.pay-way-active').className = 'pay-way';

    ele.className = 'pay-way pay-way-active';
  }
};

window.toPay = () =>{
  payOrder({
    orderId:orderId,
    channelId:payWay === 'wechat' ? 2 : 1
  }).then(res=>{
    if(payWay === 'wechat') {
      document.querySelector('.pay-code').setAttribute('src',res);
      document.querySelector('.show-pay-box').style.display = 'block';
    } else {
      document.querySelector('body').style.display = 'none';
      document.querySelector('body').innerHTML = res;
      document.querySelector('#alipaysubmit').submit();
    }
    console.log(res)
  })
};

window.closePayBox = () =>{
  document.querySelector('.show-pay-box').style.display = 'none';
};

document.querySelector('.pay-done').addEventListener('click',()=>{
  checkOrder({
    orderId: orderId
  }).then(res=>{
    console.log(res);
  })
});