import Toast from '../common/toast';
import Mask from '../common/mask';
import SHA256 from '../common/encrypt';
import {getShoppingCarInfo, logout, register, resetPassword, sendMessage, toLogin} from '../common/api';
import template from '../common/template';

let mask = new Mask();
let toast = new Toast();

let toGetShoppingCarInfo = () => {
  getShoppingCarInfo()
    .then(res => {
      console.log(res, 'res');
      let len = res.length,
        maxQuantity = 4,
        data = {
          data: len >= maxQuantity ? res.slice(0, maxQuantity) : res,
          quantity: len >= maxQuantity ? len - maxQuantity : 0
        };
      let html = template('shopping-car-container', {data: data});
      document.querySelector('.shopping-car-container').innerHTML = html;

      let quantityEle = document.querySelectorAll('.shopping-quantity');

      for (let i = quantityEle.length - 1; i >= 0; i--) {
        quantityEle[i].innerHTML = len < 1000 ? len : '···';
      }

    })
};

if (window.sessionStorage.getItem('account')) {
  let account = document.querySelector('.account'),
    accontInfo = JSON.parse(window.sessionStorage.getItem('account'));
  account.querySelector('img').setAttribute('src', accontInfo.icon);
  account.querySelector('span').innerHTML = accontInfo.nickName;
  document.querySelector('.account-container').style.display = 'block';
  account.style.display = '-webkit-flex';
  document.querySelector('.to-login').style.display = 'none';
  document.querySelector('.to-sign-up').style.display = 'none';
  toGetShoppingCarInfo();
}

let dispatchSomrthing = (bool) => {
  if (bool) {
    mask.show();
  } else {
    mask.hide();
  }
};

let keyUpEvent = (e) => {
  console.log(e);
  if (e.keyCode === 13) {
    window.location = './product-list.html?search=' + document.querySelector('.search-input').value;
  }
};

let toSearch = () => {
  let searchInput = document.querySelector('.search-input'),
    toSearch = document.querySelector('.to-search'),
    close = document.querySelector('.icon-close');
  toSearch.style.display = 'none';
  searchInput.style.display = 'block';
  close.style.display = 'block';
  searchInput.focus();
  dispatchSomrthing(true);
  searchInput.addEventListener('keyup', keyUpEvent)
};

let toClose = () => {
  let searchInput = document.querySelector('.search-input'),
    toSearch = document.querySelector('.to-search'),
    close = document.querySelector('.icon-close');
  toSearch.style.display = 'block';
  searchInput.style.display = 'none';
  close.style.display = 'none';
  dispatchSomrthing(false);
  searchInput.removeEventListener('keyup', keyUpEvent);
};

let toShowLoginBox = () => {
  toCloseSignUpBox();
  let login = document.querySelector('.login');
  login.style.display = 'block';
  setTimeout(() => {
    login.style.transform = 'translate(-50%,-50%) scale(1)';
    login.style.opacity = 1;
  }, 0);
  dispatchSomrthing(true);

};

let toShowSignUpBox = () => {
  toCloseLoginBox();
  let signUpBox = document.querySelector('.sign-up-box');
  signUpBox.style.display = 'block';
  setTimeout(() => {
    signUpBox.style.transform = 'translate(-50%,-50%) scale(1)';
    signUpBox.style.opacity = 1;
  }, 0);

  dispatchSomrthing(true);
};

let toShowForgetBox = () => {
  let forgetBox = document.querySelector('.forget-password-box');
  forgetBox.style.display = 'block';
  toCloseLoginBox();
  setTimeout(() => {
    forgetBox.style.transform = 'translate(-50%,-50%) scale(1)';
    forgetBox.style.opacity = 1;
  }, 0);

  dispatchSomrthing(true);
};

let toCloseLoginBox = () => {

  let login = document.querySelector('.login');

  login.style.transform = 'translate(-50%,-50%) scale(.5)';
  login.style.opacity = 0;
  setTimeout(() => {
    login.style.display = 'none';
  }, 500);
  setTimeout(() => {
    console.log(document.querySelector('.forget-password-box'));
    if (document.querySelector('.sign-up-box').style.display !== 'block' && document.querySelector('.forget-password-box').style.display !== 'block') {
      dispatchSomrthing(false);
    }
  }, 0);

};

let toCloseSignUpBox = () => {

  let signUpBox = document.querySelector('.sign-up-box');

  signUpBox.style.transform = 'translate(-50%,-50%) scale(.5)';
  signUpBox.style.opacity = 0;
  setTimeout(() => {
    signUpBox.style.display = 'none';
  }, 500);
  setTimeout(() => {
    if (document.querySelector('.login').style.display !== 'block') {
      dispatchSomrthing(false);
    }
  }, 0);

};

let toCloseForgetBox = () => {

  let forgetBox = document.querySelector('.forget-password-box');

  forgetBox.style.transform = 'translate(-50%,-50%) scale(.5)';
  forgetBox.style.opacity = 0;
  setTimeout(() => {
    forgetBox.style.display = 'none';
  }, 500);
  setTimeout(() => {
    if (document.querySelector('.login').style.display !== 'block') {
      dispatchSomrthing(false);
    }
  }, 0);

};


window.addEventListener('showLoginBox', toShowLoginBox);
window.addEventListener('hideLoginBox', toCloseLoginBox);
//window.addEventListener('showSignUpBox',toShowSignUpBox);
//window.addEventListener('hideSignUpBox',toCloseSignUpBox);


let toSumbitLoginData = () => {

  let type = document.querySelector('.login-tab-active').getAttribute('data-op-type');

  console.log(type);

  switch (type) {
    case 'phone':
      let phone = document.querySelector('#phone').value,
        phoneCode = document.querySelector('#phone-code').value;

      if (phone !== '' && phoneCode !== '') {
        toLogin({account: phone, code: phoneCode})
          .then(res => {
            if (res !== undefined) {
              console.log(res);
              toCloseLoginBox();
              window.location.reload();
            }

          })
      }

      break;
    case 'email':

      let email = document.querySelector('#email').value,
        emailCode = document.querySelector('#email-code').value;

      if (email !== '' && emailCode !== '') {
        toLogin({account: email, code: emailCode})
          .then(res => {
            if (res !== undefined) {
              console.log(res);
              toCloseLoginBox();
              window.location.reload();
            }
          })
      }

      break;
    case 'account':
    default:
      let name = document.querySelector('#account'),
        psw = document.querySelector('#password');

      if (name.value !== '' && psw.value !== '') {
        toLogin({account: name.value, password: SHA256(psw.value)})
          .then(res => {
            if (res !== undefined) {
              console.log(res);
              toCloseLoginBox();
              window.location.reload();
            }
          })
      }

      console.log(name.value)
  }
};
//toGetShoppingCarInfo();

window.logout = () => {
  logout().then(res => {
    if (res !== undefined) {
      window.sessionStorage.clear();
      window.location.reload();
    }
  })
};

window.addEventListener('updateShoppingCart', () => {
  console.log('---更新购物车信息---');
  toGetShoppingCarInfo();
});

let shoppingCar = document.querySelector('.show-shopping-car'),
  shoppingContainer = document.querySelector('.shopping-car-container');

shoppingCar.addEventListener('mouseenter', toGetShoppingCarInfo);

document.querySelector('.to-search').addEventListener('click', toSearch);
document.querySelector('.icon-close').addEventListener('click', toClose);
document.querySelector('.to-login').addEventListener('click', toShowLoginBox);
document.querySelector('.to-sign-up').addEventListener('click', toShowSignUpBox);
document.querySelector('.sign-up').addEventListener('click', toShowSignUpBox);
document.querySelector('.show-forget-box').addEventListener('click', toShowForgetBox);
document.querySelector('.close-login-box').addEventListener('click', toCloseLoginBox);
document.querySelector('.close-sign-up-box').addEventListener('click', toCloseSignUpBox);
document.querySelector('.close-forget-password-box').addEventListener('click', toCloseForgetBox);
document.querySelector('.submit').addEventListener('click', toSumbitLoginData);

window.changeLoginType = (type) => {
  let activeTab = document.querySelector('.login-tab-active'),
    oldType = activeTab.getAttribute('data-op-type');
  console.log(activeTab, oldType, type);
  if (oldType !== type) {
    activeTab.className = activeTab.className.replace('login-tab-active', '');
    switch (type) {
      case 'phone':
        document.querySelector('.login-phone').className += ' login-tab-active';
        document.querySelector(`.login-${oldType}-container`).style.display = 'none';
        document.querySelector('.login-phone-container').style.display = 'block';
        break;
      case 'email':
        document.querySelector('.login-email').className += ' login-tab-active';
        document.querySelector(`.login-${oldType}-container`).style.display = 'none';
        document.querySelector('.login-email-container').style.display = 'block';
        break;
      case 'account':
        document.querySelector('.login-account').className += ' login-tab-active';
        document.querySelector(`.login-${oldType}-container`).style.display = 'none';
        document.querySelector('.login-account-container').style.display = 'block';
        break;
    }
  }
};

window.changeSignUpTab = (type) => {
  let activeTab = document.querySelector('.sign-up-tab-active'),
    oldType = activeTab.getAttribute('data-op-type');
  console.log(activeTab, oldType, type);
  if (oldType !== type) {
    activeTab.className = activeTab.className.replace('sign-up-tab-active', '');
    switch (type) {
      case 'phone':
        document.querySelector('.sign-up-phone').className += ' sign-up-tab-active';
        document.querySelector(`.sign-up-${oldType}-container`).style.display = 'none';
        document.querySelector('.sign-up-phone-container').style.display = 'block';
        break;
      case 'email':
        document.querySelector('.sign-up-email').className += ' sign-up-tab-active';
        document.querySelector(`.sign-up-${oldType}-container`).style.display = 'none';
        document.querySelector('.sign-up-email-container').style.display = 'block';
        break;
    }
  }
};

window.changeForgetPasswordTab = (type) => {
  let activeTab = document.querySelector('.forget-password-tab-active'),
    oldType = activeTab.getAttribute('data-op-type');
  console.log(activeTab, oldType, type);
  if (oldType !== type) {
    activeTab.className = activeTab.className.replace('forget-password-tab-active', '');
    switch (type) {
      case 'phone':
        document.querySelector('.forget-password-phone').className += ' forget-password-tab-active';
        document.querySelector(`.forget-password-${oldType}-container`).style.display = 'none';
        document.querySelector('.forget-password-phone-container').style.display = 'block';
        break;
      case 'email':
        document.querySelector('.forget-password-email').className += ' forget-password-tab-active';
        document.querySelector(`.forget-password-${oldType}-container`).style.display = 'none';
        document.querySelector('.forget-password-email-container').style.display = 'block';
        break;
    }
  }
};

const duration = 60;

window.sendCodeForLogin = (type, ele, next = 'login') => {

  if (ele.getAttribute('data-send-code') === 'false') {
    if (type === 'phone') {
      let sendCodeTime = new Date().getTime(),
        count = 0,
        inputValue = '';

      switch (next) {
        case 'login':
          inputValue = +document.querySelector('#phone').value;
          break;
        case 'signUp':
          inputValue = +document.querySelector('#sign-up-phone').value;
          break;
        case 'forgetPassword':
          inputValue = +document.querySelector('#forget-password-phone').value;
          break;
      }

      console.log(next, inputValue);

      if (inputValue === '' || !/^[1][3,4,5,7,8][0-9]{9}$/.test(inputValue)) {
        alert('请填写正确的手机号码');
        return
      }
      ele.setAttribute('data-send-code', 'true');
      sendMessage({
        phone: inputValue,
        sendMessageType: next === 'signUp' ? 1 : 2
      }).then(res => {
        if (res !== undefined) {
          console.log(res);

          toast.show({
            content: '验证码发送成功'
          });

          ele.innerHTML = duration + 's重发';
          let stop = setInterval(() => {
            count = duration - parseInt((new Date().getTime() - sendCodeTime) / 1000, 10);
            if (count > 0) {
              ele.innerHTML = `${count}s重发`
            } else {
              clearInterval(stop);
              ele.setAttribute('data-send-code', 'false');
              ele.innerHTML = '发送验证码';
            }

          }, 1000)

        }
      });
    } else {
      let sendCodeTime = new Date().getTime(),
        count = 0,
        inputValue = '';

      switch (next) {
        case 'login':
          inputValue = document.querySelector('#email').value;
          break;
        case 'signUp':
          inputValue = document.querySelector('#sign-up-email').value;
          break;
        case 'forgetPassword':
          inputValue = document.querySelector('#forget-password-email').value;
          break;
      }

      if (inputValue === '' || !/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(inputValue)) {
        alert('请填写邮箱地址');
        return
      }
      ele.setAttribute('data-send-code', 'true');
      sendMessage({
        email: inputValue,
        sendMessageType: next === 'signUp' ? 1 : 2
      }).then(res => {
        if (res !== undefined) {
          console.log(res);

          toast.show({
            content: '验证码发送成功'
          });

          ele.innerHTML = duration + 's重发';
          let stop = setInterval(() => {
            count = duration - parseInt((new Date().getTime() - sendCodeTime) / 1000, 10);
            if (count > 0) {
              ele.innerHTML = `${count}s重发`
            } else {
              clearInterval(stop);
              ele.setAttribute('data-send-code', 'false');
              ele.innerHTML = '发送验证码';
            }

          }, 1000)

        }
      });
    }
  }
};

window.register = () => {
  let type = document.querySelector('.sign-up-tab-active').getAttribute('data-op-type');

  if (type === 'phone') {
    let phone = document.querySelector('#sign-up-phone').value,
      code = document.querySelector('#sign-up-phone-code').value,
      psw = document.querySelector('#phone-password').value;

    if (phone !== '' && code !== '' && psw !== '') {
      register({
        phone: phone,
        code: code,
        password: SHA256(psw)
      }).then(res => {
        if (res !== undefined) {
          toast.show({
            content: '注册成功'
          });
          toShowLoginBox();
        }
      })
    }

  } else {
    let email = document.querySelector('#sign-up-email').value,
      code = document.querySelector('#sign-up-email-code').value,
      psw = document.querySelector('#email-password').value;

    if (email !== '' && code !== '' && psw !== '') {
      register({
        email: email,
        code: code,
        password: SHA256(psw)
      }).then(res => {
        if (res !== undefined) {
          toast.show({
            content: '注册成功'
          });
          toShowLoginBox();
        }
      })
    }
  }

};

window.toResetPassword = () => {
  let type = document.querySelector('.forget-password-tab-active').getAttribute('data-op-type');

  if (type === 'phone') {
    let phone = document.querySelector('#forget-password-phone').value,
      code = document.querySelector('#forget-password-phone-code').value,
      psw = document.querySelector('#f-phone-password').value;

    if (phone !== '' && code !== '' && psw !== '') {
      resetPassword({
        phone: phone,
        code: code,
        password: SHA256(psw)
      }).then(res => {
        if (res !== undefined) {
          toast.show({
            content: '重置密码成功'
          });
          toShowLoginBox();
        }
      })
    }

  } else {
    let email = document.querySelector('#forget-password-email').value,
      code = document.querySelector('#forget-password-email-code').value,
      psw = document.querySelector('#f-email-password').value;

    if (email !== '' && code !== '' && psw !== '') {
      resetPassword({
        email: email,
        code: code,
        password: SHA256(psw)
      }).then(res => {
        if (res !== undefined) {
          toast.show({
            content: '重置密码成功'
          });
          toShowLoginBox();
        }
      })
    }
  }

};



