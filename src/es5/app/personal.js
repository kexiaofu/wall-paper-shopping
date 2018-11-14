"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _api = require("../common/api");

var _encrypt = _interopRequireDefault(require("../common/encrypt"));

var _template = _interopRequireDefault(require("../common/template"));

var _tools = require("../common/tools");

var address = [],
    _provcince = '',
    _city = '',
    _district = '';

_template.default.defaults.imports.formDate = function (val) {
  return (0, _tools.format)(new Date(val), 'yyyy-MM-dd');
};

var addressList = [],
    personalInfo = {};

window.onload = function () {
  /*getAddress().then(res=>{
    address = res.slice(0);
    let html = template('addr-info',{data:res});
    document.querySelector('.addr-info').innerHTML = html;
  })*/
  getPersonalInfo();
};

var getPersonalInfo = function getPersonalInfo() {
  (0, _api.addressConfig)().then(function (res) {
    console.log(res);
    addressList = res;
    (0, _api.getUserInfo)().then(function (info) {
      console.log(info);
      document.querySelector('.account-personal-icon').setAttribute('src', info.icon);
      document.querySelector('.account-nick-name').innerHTML = info.nickName;
      console.log(document.querySelector('.account-personal-icon'), 1234);
      info.provinceList = res.map(function (item) {
        return item.name;
      });

      for (var i = res.length - 1; i >= 0; i--) {
        if (info.address.indexOf(res[i].name) > -1) {
          info.province = res[i].name;
          var cities = res[i].cities;
          info.cities = cities;

          for (var c = cities.length - 1; c >= 0; c--) {
            if (info.address.indexOf(cities[c].name) > -1) {
              info.city = cities[c].name;
              var districts = cities[c].districts;
              info.districts = districts;

              for (var d = districts.length - 1; d >= 0; d--) {
                if (info.address.indexOf(districts[d].name) > -1) {
                  info.district = districts[d].name;
                  break;
                }
              }

              break;
            }
          }

          break;
        }
      }

      personalInfo = JSON.parse(JSON.stringify(info));
      var hash = window.location.hash;

      if (hash !== null) {
        changeTab(hash.substring(1));
      } else {
        changeTab();
      }
    });
  });
};

window.onhashchange = function () {
  console.log(window.location.hash);
  changeTab(window.location.hash.substring(1));
};

var changeTab = function changeTab(type) {
  console.log(type);
  var html = '';
  var opActive = document.querySelector('.op-active');

  if (opActive !== null) {
    opActive.className = opActive.className.replace('op-active', '');
  }

  switch (type) {
    case 'address':
      (0, _api.getAddress)().then(function (res) {
        address = res;
        html = (0, _template.default)('addr-info', {
          data: res
        });
        document.querySelector('.op-content').innerHTML = html;
      });
      document.querySelector('.address').className += ' op-active';
      break;

    case 'update-password':
      html = (0, _template.default)('update-password-container', {
        data: []
      });
      document.querySelector('.update-password').className += ' op-active';
      break;

    case 'personal-icon':
      html = (0, _template.default)('update-personal-icon', {
        data: []
      });
      document.querySelector('.personal-icon').className += ' op-active';
      break;

    case 'personal-info':
    default:
      html = (0, _template.default)('personal-info', {
        data: personalInfo
      });
      document.querySelector('.personal-info').className += ' op-active';
      break;
  }

  if (html !== '') {
    document.querySelector('.op-content').innerHTML = html;
  }

  if (type === 'personal-info' || type === undefined) {
    var addrSelectContainer = (0, _template.default)('addr-select-container', {
      data: info
    });
    document.querySelector('.addr-select-container').innerHTML = addrSelectContainer;
  }
};

window.showContent = function (type) {
  return changeTab(type);
};

window.toSetDefaultAddress = function (ele) {
  (0, _api.setDefaultAddress)({
    id: ele.getAttribute('data-op-id')
  }).then(function (res) {
    var index = ele.getAttribute('data-op-index'),
        addr = JSON.parse(JSON.stringify(address[index]));
    address.splice(index, 1);
    address.unshift(addr);
    var html = (0, _template.default)('addr-info', {
      data: address
    });
    document.querySelector('.op-content').innerHTML = html;
  });
};

window.toDeleteAddress = function (ele) {
  (0, _api.addressOperate)({
    id: ele.getAttribute('data-op-id'),
    cmd: 2
  }).then(function (res) {
    var index = ele.getAttribute('data-op-index');
    address.splice(index, 1);
    var html = (0, _template.default)('addr-info', {
      data: address
    });
    document.querySelector('.addr-info').innerHTML = html;
  });
};

window.toShowContainer = function (code) {
  switch (code) {
    case 0:
      document.querySelector('.addr-province').style.display = 'block';
      break;

    case 1:
      document.querySelector('.addr-city').style.display = 'block';
      break;

    case 2:
      document.querySelector('.addr-district').style.display = 'block';
      break;
  }

  console.log(123);
};

window.selectThisArea = function (code, ele) {
  switch (code) {
    case 0:
      _provcince = ele.innerHTML;

      for (var i = addressList.length - 1; i >= 0; i--) {
        if (addressList[i].name === _provcince) {
          var province = addressList[i];
          personalInfo.province = _provcince;
          personalInfo.city = province.cities[0].name;
          personalInfo.cities = province.cities;
          personalInfo.district = province.cities[0].districts[0].name;
          personalInfo.districts = province.cities[0].districts;
        }
      }

      break;

    case 1:
      _city = ele.innerHTML;
      var cities = personalInfo.cities;

      for (var _i = cities.length - 1; _i >= 0; _i--) {
        if (cities[_i].name === _city) {
          var city = cities[_i];
          personalInfo.city = city.name;
          personalInfo.district = city.districts[0].name;
          personalInfo.districts = city.districts;
        }
      }

      break;

    case 2:
      _district = ele.innerHTML;
      personalInfo.district = _district;
      break;
  }

  var html = (0, _template.default)('addr-select-container', {
    data: personalInfo
  });
  document.querySelector('.addr-select-container').innerHTML = html;
  console.log(ele.innerHTML);
};

window.toHideContainer = function (code) {
  console.log(code);

  switch (code) {
    case 0:
      document.querySelector('.addr-province').style.display = 'none';
      break;

    case 1:
      document.querySelector('.addr-city').style.display = 'none';
      break;

    case 2:
      document.querySelector('.addr-district').style.display = 'none';
      break;
  }
};

window.toSavePersonalInfo = function () {
  var sex = null;
  console.log(document.querySelector('input:checked').value);
  var obj = {
    account: personalInfo.account,
    address: personalInfo.province + personalInfo.city + personalInfo.district,
    birthday: document.querySelector('.birthday').value,
    nickName: document.querySelector('.nick-name').value,
    sex: document.querySelector('input:checked').value,
    introduction: document.querySelector('#introduction').value
  };
  (0, _api.updateUserInfo)(obj).then(function (res) {
    console.log(res);
  });
  console.log(obj);
}; //更新密码


window.toSaveNewPasswork = function () {
  var oldP = document.querySelector('.old-password'),
      newP = document.querySelector('.new-password'),
      newP2 = document.querySelector('.new-password-again');

  if (newP.value !== newP2.value) {
    alert('新密码输入不正确');
    return;
  }

  (0, _api.updatePassword)({
    oldPassword: (0, _encrypt.default)(oldP.value),
    newPassword: (0, _encrypt.default)(newP.value)
  }).then(function (res) {
    console.log(res);
  });
};