import Mask from '../common/mask';
import SHA256 from '../common/encrypt';
import { toLogin, getShoppingCarInfo, logout } from '../common/api';
import template from '../common/template';

let mask = new Mask();

if(window.sessionStorage.getItem('account')) {
  let account = document.querySelector('.account'),
    accontInfo = JSON.parse(window.sessionStorage.getItem('account'));
  account.querySelector('img').setAttribute('src',accontInfo.icon);
  account.querySelector('span').innerHTML = accontInfo.nickName;
  account.style.display = '-webkit-flex';
  document.querySelector('.to-login').style.display = 'none';
  document.querySelector('.to-sign-up').style.display = 'none';
}

let dispatchSomrthing =  (bool) => {
  if (bool) {
    mask.show();
  } else {
    mask.hide();
  }
};

let keyUpEvent = (e) =>{
  console.log(e);
  if(e.keyCode === 13) {
    window.location = './product-list.html?search='+document.querySelector('.search-input').value;
  }
};

let toSearch =  () => {
  let searchInput = document.querySelector('.search-input'),
    toSearch = document.querySelector('.to-search'),
    close = document.querySelector('.icon-close');
  toSearch.style.display = 'none';
  searchInput.style.display = 'block';
  close.style.display = 'block';
  searchInput.focus();
  dispatchSomrthing(true);
  searchInput.addEventListener('keyup',keyUpEvent)
};

let toClose =  () => {
  let searchInput = document.querySelector('.search-input'),
    toSearch = document.querySelector('.to-search'),
    close = document.querySelector('.icon-close');
  toSearch.style.display = 'block';
  searchInput.style.display = 'none';
  close.style.display = 'none';
  dispatchSomrthing(false);
  searchInput.removeEventListener('keyup',keyUpEvent);
};

let toShowLoginBox = () =>{
 let login =  document.querySelector('.login');
  login.style.display = 'block';
  setTimeout(()=>{
    login.style.transform = 'translate(-50%,-50%) scale(1)';
    login.style.opacity = 1;
  },0);

  dispatchSomrthing(true);
};

let toCloseLoginBox = () =>{
  let login =  document.querySelector('.login');

  login.style.transform = 'translate(-50%,-50%) scale(.5)';
  login.style.opacity = 0;
  setTimeout(()=>{
    login.style.display = 'none';
  },500);
  dispatchSomrthing(false);

};

window.addEventListener('showLoginBox',toShowLoginBox);
window.addEventListener('hideLoginBox',toCloseLoginBox);


let toSumbitLoginData = () =>{
  let name = document.querySelector('#account'),
      psw = document.querySelector('#password');

  if(name.value !== '' && psw.value !== '') {
    toLogin({account:name.value,password:SHA256(psw.value)})
      .then(res=>{
        console.log(res);
        toCloseLoginBox();
        toGetShoppingCarInfo();
        let account = document.querySelector('.account');
        account.querySelector('img').setAttribute('src',res.icon);
        account.querySelector('span').innerHTML = res.nickName;
        account.style.display = '-webkit-flex';
        document.querySelector('.to-login').style.display = 'none';
        document.querySelector('.to-sign-up').style.display = 'none';
        //window.sessionStorage.setItem('account',JSON.stringify(res));
        window.location.reload();
      })
  }

  console.log(name.value )
};

let toGetShoppingCarInfo = () =>{
  getShoppingCarInfo()
    .then(res=>{
      console.log(res,'res');
      let len = res.length,
        maxQuantity = 4,
        data = {
          data:len >= maxQuantity?res.slice(0,maxQuantity):res,
          quantity:len >= maxQuantity? len - maxQuantity: 0
        };
      let html = template('shopping-car-container',{data:data});
      document.querySelector('.shopping-car-container').innerHTML = html;

      let quantityEle =  document.querySelectorAll('.shopping-quantity');

      for(let i=quantityEle.length-1;i>=0;i--) {
        quantityEle[i].innerHTML = len < 1000?len:'···';
      }

    })
};

//toGetShoppingCarInfo();

window.logout = () =>{
  logout().then(res=>{
    if(res !== undefined) {
      window.sessionStorage.clear();
      window.location.reload();
    }
  })
};

window.addEventListener('updateShoppingCart',()=>{
  console.log('---更新购物车信息---');
  toGetShoppingCarInfo();
});

let shoppingCar = document.querySelector('.show-shopping-car'),
    shoppingContainer = document.querySelector('.shopping-car-container');

shoppingCar.addEventListener('mouseenter',toGetShoppingCarInfo);

document.querySelector('.to-search').addEventListener('click',toSearch);
document.querySelector('.icon-close').addEventListener('click',toClose);
document.querySelector('.to-login').addEventListener('click',toShowLoginBox);
document.querySelector('.close-login-box').addEventListener('click',toCloseLoginBox);
document.querySelector('.submit').addEventListener('click',toSumbitLoginData);



