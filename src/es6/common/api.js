import axios from 'axios';

const period = 60000;

let apiRequire = async (name,url,method,data,storage=true) => {
  console.log(storage,'---');
  let storageTime = new Date().getTime();
  if(storage && window.sessionStorage.getItem(name) !== null && storageTime - window.sessionStorage.getItem(name+'-time') < period) {
    return JSON.parse(window.sessionStorage.getItem(name));
  } else {
    console.log(`require ${name} again`);
    if(method === undefined || method === null) {
      return await axios.get(url,{
        params:data
      })
        .then(res=>{
          if(res.data.code === 2000) {
            storage && window.sessionStorage.setItem(name,JSON.stringify(res.data.result));
            storage && window.sessionStorage.setItem(name+'-time',storageTime);
            return res.data.result;
          } else {
            alert(res.data.msg);
          }
        })
        .catch(err=>{
          alert(err);
        })
    } else {
      return await axios.post(url,data)
        .then(res=>{
          if(res.data.code === 2000) {
            storage && window.sessionStorage.setItem(name,JSON.stringify(res.data.result));
            storage && window.sessionStorage.setItem(name+'-time',storageTime);
            return res.data.result;
          } else {
            alert(res.data.msg);
          }
        })
        .catch(err=>{
          alert(err);
        })
    }

  }
};

export const getCarousel = async ()=> await apiRequire('getCarousel','/api/Home/GetCarousel');

export const getProductionList = async ()=> await apiRequire('getProductionList','/api/Home/GetHomeProduct');

export const toLogin = async (account) => await apiRequire('account','/api/account/login',null,account);

export const getAllProductList = async (data) => {
  console.log(data);
  if(data && data.hasOwnProperty('name')) {
    return await apiRequire('getAllProductList','/api/Product/SearchProduct',null,data,false);
  } else {
    return await apiRequire('getAllProductList','/api/Product/getproductList',null,data,false);
  }
};

export const getProductClassify = async () => await apiRequire('getProductClassify','/api/Product/GetGroup',null);

export const getProductDetail = async (data) => await apiRequire('getProductDetail','/api/Product/GetProductDetail',null,data,false);

export const getShoppingCarInfo = async (data) => await apiRequire('getShoppingCarInfo','/api/order/GetShoppingCart',null,data,false);

export const addShoppingCart = async (data) => await apiRequire('addShoppingCart','/api/order/AddShoppingCart','post',data,false);

export const deleteShoppingCart = async (data) => await apiRequire('deleteShoppingCart','/api/order/DeleteShoppingCart','post',data,false);

export const getOrder = async (data) => await apiRequire('getOrder','/api/order/GetOrder',null,data,false);

export const addOrder = async (data) => await apiRequire('addOrder','/api/order/AddOrder','post',data,false);

export const getAddress = async () => await apiRequire('getAddress','/api/account/GetAddressList',null,null,false);

export const setDefaultAddress = async (data) => await apiRequire('setDefaultAddress','/api/account/SetDefaultAddress','post',data,false);

export const addressOperate = async (data) => await apiRequire('addressOperate','/api/account/AddressOperate','post',data,false);


export const getHomeGroup =async () => await apiRequire('getHomeGroup','/api/Home/GetHomeGroup',null,null,true);


///api/order/AddShoppingCart
//getProductClassify,api/Product/GetProductDetail?id=