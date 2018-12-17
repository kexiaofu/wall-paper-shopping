import axios from 'axios';

const period = 60000;

let requestTimeout = new Date().getTime();

let apiRequire = async (obj) => {
  let storageTime = new Date().getTime();
  if(obj.duration > 0 && window.sessionStorage.getItem(obj.name) !== null && storageTime - window.sessionStorage.getItem(obj.name+'-time') < obj.duration) {
    return JSON.parse(window.sessionStorage.getItem(obj.name));
  } else {
    console.log(`require ${obj.name} again`);
    if(obj.method === undefined || obj.method === null) {
      return await axios.get(obj.url,{
        params:obj.data
      })
        .then(res=>{
          if(res.data.code === 2000) {
            //name === 'toLogin' && ( requestTimeout = new Date(res.data.result.timeOut).getTime());
            //console.log(name,requestTimeout);
            obj.duration > 0 && window.sessionStorage.setItem(obj.name,JSON.stringify(res.data.result));
            obj.duration > 0 && window.sessionStorage.setItem(obj.name+'-time',storageTime);
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
            alert(error.message);
            return
          }
          //console.log(error.config);
          throw Error('fetch api fail');
        })
    } else {
      console.log(obj.url,obj.data,obj.params);
      return await axios.post(obj.url, obj.data, {params: obj.params})
        .then(res=>{
          if(res.data.code === 2000) {
            obj.duration > 0 && window.sessionStorage.setItem(obj.name,JSON.stringify(res.data.result));
            obj.duration > 0 && window.sessionStorage.setItem(obj.name+'-time',storageTime);
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
          throw Error('fetch api fail');
        })
    }

  }
};

//product
export const getAllProductList = async (data) => await apiRequire({name: 'getAllProductList', url: '/api/Product/getproductList', data});

export const getProductClassify = async () => await apiRequire({name: 'getProductClassify', url: '/api/Product/GetGroup'});

export const getProductDetail = async (data) => await apiRequire({name: 'getProductDetail', url: '/api/Product/GetProductDetail',data});

export const getTags =async () => await apiRequire({name: 'getTags', url: '/api/Product/getTags', duration: period});

//home
export const getCarousel = async ()=> await apiRequire({name: 'getCarousel', url: '/api/Home/GetCarousel', duration: period});

export const getProductionList = async ()=> await apiRequire({name: 'getProductionList', url: '/api/Home/GetHomeProduct', duration: period});

export const getHomeGroup =async () => await apiRequire({name: 'getHomeGroup', url: '/api/Home/GetHomeGroup', duration: period});

//account
export const toLogin = async (account) => await apiRequire({name: 'account', url: '/api/account/login', method: 'post', data: account, duration: period});

export const logout = async () => await apiRequire({name: 'logout', url: '/api/account/Logout', methods: 'post'} );

export const getAddress = async () => await apiRequire({name: 'getAddress', url: '/api/account/GetAddressList'} );

export const setDefaultAddress = async (data) => await apiRequire({name: 'setDefaultAddress', url: '/api/account/SetDefaultAddress', method: 'post', data});

export const addressOperate = async (data) => await apiRequire({name: 'addressOperate', url: '/api/account/AddressOperate', method: 'post',data});

export const getUserInfo = async (data) => await apiRequire({name: 'addressOperate', url: '/api/account/GetUserInfo', data});

export const updateUserInfo = async (data) => await apiRequire({name: 'updateUserInfo', url: '/api/account/UpdateUserInfo', method: 'post', data});

export const updatePassword = async (data) => await apiRequire({name: 'updatePassword', url: '/api/account/UpdatePassword', method: 'post', data});

export const updateIcon = async (data) => await apiRequire({name: 'updateIcon', url: '/api/account/UpdateIcon', method: 'post', data});

export const sendMessage = async (data) => await apiRequire({name: 'sendMessage', url: '/api/account/SendMessage', method: 'post', data});

export const bindingInfo = async (data) => await apiRequire({name: 'bindingInfo', url: '/api/account/BindingInfo', method: 'post', data});

export const register = async (data) => await apiRequire({name: 'register', url: '/api/account/Register', method: 'post', data});

export const resetPassword = async (data) => await apiRequire({name: 'resetPassword', url: '/api/account/ResetPassword', method: 'post', data});

//order
export const getShoppingCarInfo = async (data) => await apiRequire({name: 'getShoppingCarInfo', url: '/api/order/GetShoppingCart', data});

export const addShoppingCart = async (data) => await apiRequire({name: 'addShoppingCart', url: '/api/order/AddShoppingCart', method: 'post', data});

export const deleteShoppingCart = async (data) => await apiRequire({name: 'deleteShoppingCart', url: '/api/order/DeleteShoppingCart', method: 'post', data});

export const getOrder = async (data) => await apiRequire({name: 'getOrder', url: '/api/order/GetOrder', data});

export const addOrder = async (data) => await apiRequire({name: 'addOrder', url: '/api/order/AddOrder', method: 'post', data});

export const getOrderStatus = async (data) => await apiRequire({name: 'getOrderStatus', url: '/api/order/GetOrderStatus', data});

export const submitOrder = async (data) => await apiRequire({name: 'submitOrder', url: '/api/order/SubmitOrder', method: 'post', data});

export const checkOrder = async (data) => await apiRequire({name: 'checkOrder', url: '/api/order/CheckOrderPaid', data});

//pay
export const payOrder = async (data) => await apiRequire({name: 'payOrder', url: '/api/pay/PayOrder', data});

//config
export const addressConfig = async () => await apiRequire({name: 'addressConfig', url: '/api/config/GetAddressConfig', duration: 600000});

// editor
export const getEditorOption = async (data) => await apiRequire({name: 'checkOrder', url: '/api/editor/GetEditorOption', data});

export const uploadEditorImage = async (data, params) => await apiRequire({name: 'uploadEditorImage', url: '/api/editor/uploadEditorImage', method: 'post', data, params});

///api/order/AddShoppingCart
//getProductClassify,api/Product/GetProductDetail?id=
