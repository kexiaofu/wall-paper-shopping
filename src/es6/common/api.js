import axios from 'axios';

const period = 60000;

let requestTimeout = new Date().getTime();

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
            //name === 'toLogin' && ( requestTimeout = new Date(res.data.result.timeOut).getTime());
            //console.log(name,requestTimeout);
            duration > 0 && window.sessionStorage.setItem(name,JSON.stringify(res.data.result));
            duration > 0 && window.sessionStorage.setItem(name+'-time',storageTime);
            return res.data.result;
          } else {
            console.log(res,'res');
            alert(res.data.msg);
            return
          }
        })
        .catch(error=>{
          if (error.response) {
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            if(error.response.status === 401) {

              if(window.sessionStorage.getItem('account')) {
                window.sessionStorage.clear();
              }

              window.dispatchEvent(new CustomEvent('showLoginBox'))
            } else {
              alert(error);
              return
            }

          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            alert(error.message)
            return
          }
          //console.log(error.config);
        })
    } else {
      return await axios.post(url,data)
        .then(res=>{
          if(res.data.code === 2000) {
            duration > 0 && window.sessionStorage.setItem(name,JSON.stringify(res.data.result));
            duration > 0 && window.sessionStorage.setItem(name+'-time',storageTime);
            return res.data.result;
          } else {
            alert(res.data.msg);
            return
          }
        })
        .catch(error=>{
          if (error.response) {
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            if(error.response.status === 401) {

              if(window.sessionStorage.getItem('account')) {
                window.sessionStorage.clear();
              }

              window.dispatchEvent(new CustomEvent('showLoginBox'))
            } else {
              alert(error);
              return
            }

          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            alert(error.message)
            return
          }
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
export const toLogin = async (account) => await apiRequire('account','/api/account/login','post',account,period);

export const logout = async () => await apiRequire('logout','/api/account/Logout','post',null);

export const getAddress = async () => await apiRequire('getAddress','/api/account/GetAddressList',null,null);

export const setDefaultAddress = async (data) => await apiRequire('setDefaultAddress','/api/account/SetDefaultAddress','post',data);

export const addressOperate = async (data) => await apiRequire('addressOperate','/api/account/AddressOperate','post',data);

export const getUserInfo = async (data) => await apiRequire('addressOperate','/api/account/GetUserInfo',null,data);

export const updateUserInfo = async (data) => await apiRequire('updateUserInfo','/api/account/UpdateUserInfo','post',data);

export const updatePassword = async (data) => await apiRequire('updatePassword','/api/account/UpdatePassword','post',data);

export const updateIcon = async (data) => await apiRequire('updateIcon','/api/account/UpdateIcon','post',data);

export const sendMessage = async (data) => await apiRequire('sendMessage','/api/account/SendMessage','post',data);

export const bindingInfo = async (data) => await apiRequire('bindingInfo','/api/account/BindingInfo','post',data);

export const register = async (data) => await apiRequire('register','/api/account/Register','post',data);

export const resetPassword = async (data) => await apiRequire('resetPassword','/api/account/ResetPassword','post',data);

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

// editor
export const getEditorOption = async (data) => await apiRequire('checkOrder','/api/editor/GetEditorOption',null,data);

///api/order/AddShoppingCart
//getProductClassify,api/Product/GetProductDetail?id=
