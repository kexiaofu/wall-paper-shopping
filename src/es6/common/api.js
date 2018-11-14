import axios from 'axios';

const period = 60000;

let apiRequire = async (name,url,method,data,duration=0) => {
  let storageTime = new Date().getTime();
  if(duration > 0 && window.sessionStorage.getItem(name) !== null && storageTime - window.sessionStorage.getItem(name+'-time') < duration) {
    return JSON.parse(window.sessionStorage.getItem(name));
  } else {
    console.log(`require ${name} again`);
    if(method === undefined || method === null) {
      return await axios.get(url,{
        params:data
      })
        .then(res=>{
          if(res.data.code === 2000) {
            duration > 0 && window.sessionStorage.setItem(name,JSON.stringify(res.data.result));
            duration > 0 && window.sessionStorage.setItem(name+'-time',storageTime);
            return res.data.result;
          } else {
            return alert(res.data.msg);
          }
        })
        .catch(err=>{
          return alert(err);
        })
    } else {
      return await axios.post(url,data)
        .then(res=>{
          if(res.data.code === 2000) {
            duration > 0 && window.sessionStorage.setItem(name,JSON.stringify(res.data.result));
            duration > 0 && window.sessionStorage.setItem(name+'-time',storageTime);
            return res.data.result;
          } else {
            return alert(res.data.msg);
          }
        })
        .catch(err=>{
          return alert(err);
        })
    }

  }
};

//product
export const getAllProductList = async (data) => await apiRequire('getAllProductList','/api/Product/getproductList',null,data);

export const getProductClassify = async () => await apiRequire('getProductClassify','/api/Product/GetGroup',null);

export const getProductDetail = async (data) => await apiRequire('getProductDetail','/api/Product/GetProductDetail',null,data);

export const getTags =async () => await apiRequire('getTags','/api/Product/getTags',null,null,period);

//home
export const getCarousel = async ()=> await apiRequire('getCarousel','/api/Home/GetCarousel',null,null,period);

export const getProductionList = async ()=> await apiRequire('getProductionList','/api/Home/GetHomeProduct',null,null,period);

export const getHomeGroup =async () => await apiRequire('getHomeGroup','/api/Home/GetHomeGroup',null,null,period);

//account
export const toLogin = async (account) => await apiRequire('account','/api/account/login',null,account,period);

export const getAddress = async () => await apiRequire('getAddress','/api/account/GetAddressList',null,null);

export const setDefaultAddress = async (data) => await apiRequire('setDefaultAddress','/api/account/SetDefaultAddress','post',data);

export const addressOperate = async (data) => await apiRequire('addressOperate','/api/account/AddressOperate','post',data);

export const getUserInfo = async (data) => await apiRequire('addressOperate','/api/account/GetUserInfo',null,data);

export const updateUserInfo = async (data) => await apiRequire('updateUserInfo','/api/account/UpdateUserInfo','post',data);

export const updatePassword = async (data) => await apiRequire('updatePassword','/api/account/UpdatePassword','post',data);



//order
export const getShoppingCarInfo = async (data) => await apiRequire('getShoppingCarInfo','/api/order/GetShoppingCart',null,data);

export const addShoppingCart = async (data) => await apiRequire('addShoppingCart','/api/order/AddShoppingCart','post',data);

export const deleteShoppingCart = async (data) => await apiRequire('deleteShoppingCart','/api/order/DeleteShoppingCart','post',data);

export const getOrder = async (data) => await apiRequire('getOrder','/api/order/GetOrder',null,data);

export const addOrder = async (data) => await apiRequire('addOrder','/api/order/AddOrder','post',data);

export const getOrderStatus = async (data) => await apiRequire('getOrderStatus','/api/order/GetOrderStatus',null,data);

export const submitOrder = async (data) => await apiRequire('submitOrder','/api/order/SubmitOrder','post',data);

export const checkOrder = async (data) => await apiRequire('checkOrder','/api/order/CheckOrderPaid',null,data);

//pay
export const payOrder = async (data) => await apiRequire('payOrder','/api/pay/PayOrder',null,data);

//config
export const addressConfig = async () => await apiRequire('addressConfig','/api/config/GetAddressConfig',null,null,600000);



///api/order/AddShoppingCart
//getProductClassify,api/Product/GetProductDetail?id=
