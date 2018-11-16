"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toast = _interopRequireDefault(require("../common/toast"));

var _mask = _interopRequireDefault(require("../common/mask"));

var _encrypt = _interopRequireDefault(require("../common/encrypt"));

var _api = require("../common/api");

var _template = _interopRequireDefault(require("../common/template"));

var mask = new _mask.default();
var toast = new _toast.default();

var toGetShoppingCarInfo = function toGetShoppingCarInfo() {
  (0, _api.getShoppingCarInfo)().then(function (res) {
    console.log(res, 'res');
    var len = res.length,
        maxQuantity = 4,
        data = {
      data: len >= maxQuantity ? res.slice(0, maxQuantity) : res,
      quantity: len >= maxQuantity ? len - maxQuantity : 0
    };
    var html = (0, _template.default)('shopping-car-container', {
      data: data
    });
    document.querySelector('.shopping-car-container').innerHTML = html;
    var quantityEle = document.querySelectorAll('.shopping-quantity');

    for (var i = quantityEle.length - 1; i >= 0; i--) {
      quantityEle[i].innerHTML = len < 1000 ? len : '···';
    }
  });
};

if (window.sessionStorage.getItem('account')) {
  var account = document.querySelector('.account'),
      accontInfo = JSON.parse(window.sessionStorage.getItem('account'));
  account.querySelector('img').setAttribute('src', accontInfo.icon);
  account.querySelector('span').innerHTML = accontInfo.nickName;
  document.querySelector('.account-container').style.display = 'block';
  account.style.display = '-webkit-flex';
  document.querySelector('.to-login').style.display = 'none';
  document.querySelector('.to-sign-up').style.display = 'none';
  toGetShoppingCarInfo();
}

var dispatchSomrthing = function dispatchSomrthing(bool) {
  if (bool) {
    mask.show();
  } else {
    mask.hide();
  }
};

var keyUpEvent = function keyUpEvent(e) {
  console.log(e);

  if (e.keyCode === 13) {
    window.location = './product-list.html?search=' + document.querySelector('.search-input').value;
  }
};

var toSearch = function toSearch() {
  var searchInput = document.querySelector('.search-input'),
      toSearch = document.querySelector('.to-search'),
      close = document.querySelector('.icon-close');
  toSearch.style.display = 'none';
  searchInput.style.display = 'block';
  close.style.display = 'block';
  searchInput.focus();
  dispatchSomrthing(true);
  searchInput.addEventListener('keyup', keyUpEvent);
};

var toClose = function toClose() {
  var searchInput = document.querySelector('.search-input'),
      toSearch = document.querySelector('.to-search'),
      close = document.querySelector('.icon-close');
  toSearch.style.display = 'block';
  searchInput.style.display = 'none';
  close.style.display = 'none';
  dispatchSomrthing(false);
  searchInput.removeEventListener('keyup', keyUpEvent);
};

var toShowLoginBox = function toShowLoginBox() {
  toCloseSignUpBox();
  var login = document.querySelector('.login');
  login.style.display = 'block';
  setTimeout(function () {
    login.style.transform = 'translate(-50%,-50%) scale(1)';
    login.style.opacity = 1;
  }, 0);
  dispatchSomrthing(true);
};

var toShowSignUpBox = function toShowSignUpBox() {
  toCloseLoginBox();
  var signUpBox = document.querySelector('.sign-up-box');
  signUpBox.style.display = 'block';
  setTimeout(function () {
    signUpBox.style.transform = 'translate(-50%,-50%) scale(1)';
    signUpBox.style.opacity = 1;
  }, 0);
  dispatchSomrthing(true);
};

var toCloseLoginBox = function toCloseLoginBox() {
  var login = document.querySelector('.login');
  login.style.transform = 'translate(-50%,-50%) scale(.5)';
  login.style.opacity = 0;
  setTimeout(function () {
    login.style.display = 'none';
  }, 500);
  setTimeout(function () {
    if (document.querySelector('.sign-up-box').style.display !== 'block') {
      dispatchSomrthing(false);
    }
  }, 0);
};

var toCloseSignUpBox = function toCloseSignUpBox() {
  var signUpBox = document.querySelector('.sign-up-box');
  signUpBox.style.transform = 'translate(-50%,-50%) scale(.5)';
  signUpBox.style.opacity = 0;
  setTimeout(function () {
    signUpBox.style.display = 'none';
  }, 500);
  setTimeout(function () {
    if (document.querySelector('.login').style.display !== 'block') {
      dispatchSomrthing(false);
    }
  }, 0);
};

window.addEventListener('showLoginBox', toShowLoginBox);
window.addEventListener('hideLoginBox', toCloseLoginBox); //window.addEventListener('showSignUpBox',toShowSignUpBox);
//window.addEventListener('hideSignUpBox',toCloseSignUpBox);

var toSumbitLoginData = function toSumbitLoginData() {
  var type = document.querySelector('.login-tab-active').getAttribute('data-op-type');
  console.log(type);

  switch (type) {
    case 'phone':
      var phone = document.querySelector('#phone').value,
          phoneCode = document.querySelector('#phone-code').value;

      if (phone !== '' && phoneCode !== '') {
        (0, _api.toLogin)({
          account: phone,
          code: phoneCode
        }).then(function (res) {
          if (res !== undefined) {
            console.log(res);
            toCloseLoginBox();
            window.location.reload();
          }
        });
      }

      break;

    case 'email':
      var email = document.querySelector('#email').value,
          emailCode = document.querySelector('#email-code').value;

      if (email !== '' && emailCode !== '') {
        (0, _api.toLogin)({
          account: email,
          code: emailCode
        }).then(function (res) {
          if (res !== undefined) {
            console.log(res);
            toCloseLoginBox();
            window.location.reload();
          }
        });
      }

      break;

    case 'account':
    default:
      var name = document.querySelector('#account'),
          psw = document.querySelector('#password');

      if (name.value !== '' && psw.value !== '') {
        (0, _api.toLogin)({
          account: name.value,
          password: (0, _encrypt.default)(psw.value)
        }).then(function (res) {
          if (res !== undefined) {
            console.log(res);
            toCloseLoginBox();
            window.location.reload();
          }
        });
      }

      console.log(name.value);
  }
}; //toGetShoppingCarInfo();


window.logout = function () {
  (0, _api.logout)().then(function (res) {
    if (res !== undefined) {
      window.sessionStorage.clear();
      window.location.reload();
    }
  });
};

window.addEventListener('updateShoppingCart', function () {
  console.log('---更新购物车信息---');
  toGetShoppingCarInfo();
});
var shoppingCar = document.querySelector('.show-shopping-car'),
    shoppingContainer = document.querySelector('.shopping-car-container');
shoppingCar.addEventListener('mouseenter', toGetShoppingCarInfo);
document.querySelector('.to-search').addEventListener('click', toSearch);
document.querySelector('.icon-close').addEventListener('click', toClose);
document.querySelector('.to-login').addEventListener('click', toShowLoginBox);
document.querySelector('.to-sign-up').addEventListener('click', toShowSignUpBox);
document.querySelector('.close-login-box').addEventListener('click', toCloseLoginBox);
document.querySelector('.close-sign-up-box').addEventListener('click', toCloseSignUpBox);
document.querySelector('.submit').addEventListener('click', toSumbitLoginData);

window.changeLoginType = function (type) {
  var activeTab = document.querySelector('.login-tab-active'),
      oldType = activeTab.getAttribute('data-op-type');
  console.log(activeTab, oldType, type);

  if (oldType !== type) {
    activeTab.className = activeTab.className.replace('login-tab-active', '');

    switch (type) {
      case 'phone':
        document.querySelector('.login-phone').className += ' login-tab-active';
        document.querySelector(".login-".concat(oldType, "-container")).style.display = 'none';
        document.querySelector('.login-phone-container').style.display = 'block';
        break;

      case 'email':
        document.querySelector('.login-email').className += ' login-tab-active';
        document.querySelector(".login-".concat(oldType, "-container")).style.display = 'none';
        document.querySelector('.login-email-container').style.display = 'block';
        break;

      case 'account':
        document.querySelector('.login-account').className += ' login-tab-active';
        document.querySelector(".login-".concat(oldType, "-container")).style.display = 'none';
        document.querySelector('.login-account-container').style.display = 'block';
        break;
    }
  }
};

window.changeSignUpTab = function (type) {
  var activeTab = document.querySelector('.sign-up-tab-active'),
      oldType = activeTab.getAttribute('data-op-type');
  console.log(activeTab, oldType, type);

  if (oldType !== type) {
    activeTab.className = activeTab.className.replace('sign-up-tab-active', '');

    switch (type) {
      case 'phone':
        document.querySelector('.sign-up-phone').className += ' sign-up-tab-active';
        document.querySelector(".sign-up-".concat(oldType, "-container")).style.display = 'none';
        document.querySelector('.sign-up-phone-container').style.display = 'block';
        break;

      case 'email':
        document.querySelector('.sign-up-email').className += ' sign-up-tab-active';
        document.querySelector(".sign-up-".concat(oldType, "-container")).style.display = 'none';
        document.querySelector('.sign-up-email-container').style.display = 'block';
        break;
    }
  }
};

var duration = 60;

window.sendCode = function (type, ele) {
  var next = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'login';

  if (ele.getAttribute('data-send-code') === 'false') {
    if (type === 'phone') {
      var sendCodeTime = new Date().getTime(),
          count = 0,
          inputValue = next === 'login' ? +document.querySelector('#phone').value : +document.querySelector('#sign-up-phone').value;

      if (inputValue === '' || !/^[1][3,4,5,7,8][0-9]{9}$/.test(inputValue)) {
        alert('请填写正确的手机号码');
        return;
      }

      ele.setAttribute('data-send-code', 'true');
      (0, _api.sendMessage)({
        phone: inputValue,
        sendMessageType: next === 'login' ? 2 : 1
      }).then(function (res) {
        if (res !== undefined) {
          console.log(res);
          toast.show({
            content: '验证码发送成功'
          });
          ele.innerHTML = duration + 's重发';
          var stop = setInterval(function () {
            count = duration - parseInt((new Date().getTime() - sendCodeTime) / 1000, 10);

            if (count > 0) {
              ele.innerHTML = "".concat(count, "s\u91CD\u53D1");
            } else {
              clearInterval(stop);
              ele.setAttribute('data-send-code', 'false');
              ele.innerHTML = '发送验证码';
            }
          }, 1000);
        }
      });
    } else {
      var _sendCodeTime = new Date().getTime(),
          _count = 0,
          _inputValue = next === 'login' ? document.querySelector('#email').value : document.querySelector('#sign-up-email').value;

      if (_inputValue === '' || !/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(_inputValue)) {
        alert('请填写邮箱地址');
        return;
      }

      ele.setAttribute('data-send-code', 'true');
      (0, _api.sendMessage)({
        email: _inputValue,
        sendMessageType: next === 'login' ? 2 : 1
      }).then(function (res) {
        if (res !== undefined) {
          console.log(res);
          toast.show({
            content: '验证码发送成功'
          });
          ele.innerHTML = duration + 's重发';
          var stop = setInterval(function () {
            _count = duration - parseInt((new Date().getTime() - _sendCodeTime) / 1000, 10);

            if (_count > 0) {
              ele.innerHTML = "".concat(_count, "s\u91CD\u53D1");
            } else {
              clearInterval(stop);
              ele.setAttribute('data-send-code', 'false');
              ele.innerHTML = '发送验证码';
            }
          }, 1000);
        }
      });
    }
  }
};

window.register = function () {
  var type = document.querySelector('.sign-up-tab-active').getAttribute('data-op-type');
  toast.show({
    content: '注册成功'
  });
  return;

  if (type === 'phone') {
    var phone = document.querySelector('#sign-up-phone').value,
        code = document.querySelector('#sign-up-phone-code').value,
        psw = document.querySelector('#phone-password').value;

    if (phone !== '' && code !== '' && psw !== '') {
      (0, _api.register)({
        phone: phone,
        code: code,
        password: (0, _encrypt.default)(psw)
      }).then(function (res) {
        if (res !== undefined) {
          toast.show({
            content: '注册成功'
          });
        }
      });
    }
  } else {
    var email = document.querySelector('#sign-up-email').value,
        _code = document.querySelector('#sign-up-email-code').value,
        _psw = document.querySelector('#email-password').value;

    if (email !== '' && _code !== '' && _psw !== '') {
      (0, _api.register)({
        email: email,
        code: _code,
        password: (0, _encrypt.default)(_psw)
      }).then(function (res) {
        if (res !== undefined) {
          toast.show({
            content: '注册成功'
          });
        }
      });
    }
  }
};