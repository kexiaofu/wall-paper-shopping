"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _api = require("../common/api");

var _encrypt = _interopRequireDefault(require("../common/encrypt"));

var _template = _interopRequireDefault(require("../common/template"));

var _tools = require("../common/tools");

var _mask = _interopRequireDefault(require("../common/mask"));

var _toast = _interopRequireDefault(require("../common/toast"));

var address = [],
    updateAddressInfo = [],
    _provcince = '',
    _city = '',
    _district = '';
var mask = new _mask.default();
var toast = new _toast.default();

_template.default.defaults.imports.formDate = function (val) {
  return (0, _tools.format)(new Date(val), 'yyyy-MM-dd');
};

var addressList = [],
    personalInfo = {};

window.onload = function () {
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
      info.provinceList = res.map(function (item) {
        return item.name;
      });

      if (info.address !== null) {
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
      }

      personalInfo = JSON.parse(JSON.stringify(info));
      console.log(personalInfo);
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
  console.log((0, _typeof2.default)(type));
  var html = '';
  var opActive = document.querySelector('.op-active');

  if (opActive !== null) {
    opActive.className = opActive.className.replace('op-active', '');
  }

  switch (type) {
    case 'address':
      if (addressList.length > 0) {
        (0, _api.getAddress)().then(function (res) {
          address = res;
          html = (0, _template.default)('addr-info', {
            data: res
          });
          document.querySelector('.op-content').innerHTML = html;
        });
      } else {
        (0, _api.addressConfig)().then(function (res) {
          console.log(res);
          addressList = res;
          (0, _api.getAddress)().then(function (res) {
            address = res;
            html = (0, _template.default)('addr-info', {
              data: res
            });
            document.querySelector('.op-content').innerHTML = html;
          });
        });
      }

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
        data: personalInfo
      });
      document.querySelector('.personal-icon').className += ' op-active';
      break;

    case 'binding-info':
      html = (0, _template.default)('binding-info', {
        data: personalInfo
      });
      document.querySelector('.binding-info').className += ' op-active';
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

  if (type === 'personal-info' || type === '' || type === undefined) {
    var addrSelectContainer = (0, _template.default)('addr-select-container', {
      data: personalInfo,
      source: 0
    });
    document.querySelector('.addr-select-container').innerHTML = addrSelectContainer;
  }
}; //右侧显示内容


window.showContent = function (type) {
  return changeTab(type);
}; //设置默认地址


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
}; //删除地址


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
}; //显示地址候选栏


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
}; //选中地址


window.selectThisArea = function (code, ele) {
  var info = null,
      source = +ele.getAttribute('data-op-source');

  if (source === 0) {
    info = personalInfo;
  } else {
    info = updateAddressInfo;
  }

  switch (code) {
    case 0:
      _provcince = ele.innerHTML;

      for (var i = addressList.length - 1; i >= 0; i--) {
        if (addressList[i].name === _provcince) {
          var province = addressList[i];
          info.province = _provcince;
          info.city = province.cities[0].name;
          info.cities = province.cities;
          info.district = province.cities[0].districts[0].name;
          info.districts = province.cities[0].districts;
        }
      }

      break;

    case 1:
      _city = ele.innerHTML;
      var cities = info.cities;

      for (var _i = cities.length - 1; _i >= 0; _i--) {
        if (cities[_i].name === _city) {
          var city = cities[_i];
          info.city = city.name;
          info.district = city.districts[0].name;
          info.districts = city.districts;
        }
      }

      break;

    case 2:
      _district = ele.innerHTML;
      info.district = _district;
      break;
  }

  var html = (0, _template.default)('addr-select-container', {
    data: info,
    source: source
  });

  if (source === 0) {
    document.querySelector('.addr-select-container').innerHTML = html;
  } else {
    document.querySelector('.my-modal .addr-select-container').innerHTML = html;
  }
}; //隐藏地址候选栏


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
}; //保存个人信息


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
}; //更换地址


window.updateAddress = function (ele) {
  console.log(ele.getAttribute('data-op-index'));
  var index = ele.getAttribute('data-op-index'),
      addr = null;

  if (index !== null) {
    addr = address[index];
  } else {
    addr = {
      linkMan: '',
      telephone: '',
      zipCode: '',
      id: '',
      addressDetail: '',
      province: addressList[0].name,
      city: addressList[0].cities[0].name,
      district: addressList[0].cities[0].districts[0].name
    };
  }

  var modal = document.querySelector('.my-modal');
  mask.show();
  modal.style.display = 'block';
  var html = (0, _template.default)('update-address', {
    data: addr,
    title: index !== null ? '编辑地址' : '新增地址'
  });
  modal.innerHTML = html;
  var provinceList = [],
      cities = [],
      districts = [];
  provinceList = addressList.map(function (item) {
    if (item.name === addr.province) {
      cities = item.cities;
      cities.map(function (item) {
        console.log(item);

        if (item.name === addr.city) {
          districts = item.districts;
        }
      });
    }

    return item.name;
  });
  updateAddressInfo = Object.assign({}, addr, {
    provinceList: provinceList,
    province: addr.province,
    cities: cities,
    city: addr.city,
    districts: districts,
    district: addr.district
  });
  var addrSelectContainer = (0, _template.default)('addr-select-container', {
    data: updateAddressInfo,
    source: 1
  });
  document.querySelector('.my-modal .addr-select-container').innerHTML = addrSelectContainer;
}; //关闭更新地址面板


var toCloseAddrBox = function toCloseAddrBox() {
  mask.hide();
  document.querySelector('.my-modal').style.display = 'none';
};

window.toCloseUpdateAddrBox = function () {
  return toCloseAddrBox();
}; //保存地址


window.toSaveAddress = function (ele) {
  var id = +ele.getAttribute('data-op-id'),
      linkMan = document.querySelector('.link-man').value,
      telephone = document.querySelector('.phone').value,
      zipCode = document.querySelector('.zip-code').value,
      addressDetail = document.querySelector('.address-detail').value;

  if (linkMan !== '' && telephone !== '' && addressDetail !== '') {
    (0, _api.addressOperate)({
      province: updateAddressInfo.province,
      city: updateAddressInfo.city,
      district: updateAddressInfo.district,
      id: id,
      linkMan: linkMan,
      telephone: telephone,
      zipCode: zipCode,
      address: addressDetail,
      cmd: id !== 0 ? 1 : 0
    }).then(function (res) {
      console.log(res);

      if (res !== undefined) {
        toCloseAddrBox();
        toast.show({
          content: id !== 0 ? '更新地址成功' : '新增地址成功'
        });
        changeTab(window.location.hash.substring(1));
      }
    });
  } else {
    alert('请完成必要信息，再进行保存！');
    return;
  }

  console.log(linkMan, telephone, zipCode, addressDetail);
};

window.toAddAddress = function () {
  console.log(addressList);
  var addr = {
    linkMan: '',
    telephone: '',
    zipCode: '',
    id: '',
    addressDetail: '',
    province: addressList[0].name,
    city: addressList[0].cities[0].name,
    district: addressList[0].cities[0].districts[0].name
  };
  var modal = document.querySelector('.my-modal');
  mask.show();
  modal.style.display = 'block';
  var html = (0, _template.default)('update-address', {
    data: addr,
    title: '编辑地址'
  });
  modal.innerHTML = html;
  var provinceList = [],
      cities = [],
      districts = [];
  provinceList = addressList.map(function (item) {
    if (item.name === addr.province) {
      cities = item.cities;
      cities.map(function (item) {
        console.log(item);

        if (item.name === addr.city) {
          districts = item.districts;
        }
      });
    }

    return item.name;
  });
  updateAddressInfo = Object.assign({}, addr, {
    provinceList: provinceList,
    province: addr.province,
    cities: cities,
    city: addr.city,
    districts: districts,
    district: addr.district
  });
  var addrSelectContainer = (0, _template.default)('addr-select-container', {
    data: updateAddressInfo,
    source: 1
  });
  document.querySelector('.my-modal .addr-select-container').innerHTML = addrSelectContainer;
}; //上传头像


window.toUploadAvatar = function () {
  var form = document.createElement('form'),
      input = document.querySelector('input');
  input.type = "file";
  input.name = "file";
  form.className = 'upload-form';
  input.className = 'upload-avatar';
  form.appendChild(input);
  document.querySelector('body').appendChild(form);
  input.click();
  input.addEventListener('change', function () {
    console.log(input.files);
    var formData = new FormData(form);
    (0, _api.updateIcon)(formData).then(function (res) {
      console.log(res);
      document.querySelector('.account-name img').setAttribute('src', res);
      document.querySelector('.avatar').setAttribute('src', res);
    });
  });
};

var duration = 60;
var sendCodeTime = null,
    sendCodeStop = null,
    countDown = 0;

window.sendCode = function (type) {
  var sendCodeBox = null;

  if (sendCodeTime === null) {
    if (type === 'email') {
      var email = document.querySelector('.email').value;

      if (email !== '') {
        sendCodeTime = new Date().getTime();
        sendCodeBox = document.querySelector('.send-code-btn-email');
        sendCodeBox.innerHTML = "".concat(duration, "s\u91CD\u53D1");
        (0, _api.sendMessage)({
          email: '864927512@qq.com',
          sendMessageType: 1
        }).then(function (res) {
          if (res !== undefined) {
            console.log(res);
          }
        });
      } else {
        alert('请填写正确的邮箱地址');
        return;
      }
    } else {
      var phone = document.querySelector('.phone').value;

      if (phone !== '') {
        sendCodeTime = new Date().getTime();
        sendCodeBox = document.querySelector('.send-code-btn-phone');
        sendCodeBox.innerHTML = "".concat(duration, "s\u91CD\u53D1");
        (0, _api.sendMessage)({
          phone: '15622316910',
          sendMessageType: 1
        }).then(function (res) {
          if (res !== undefined) {
            console.log(res);
          }
        });
      } else {
        alert('请填写正确的手机号码');
        return;
      }
    }

    sendCodeStop = setInterval(function () {
      countDown = duration - Math.floor((new Date().getTime() - sendCodeTime) / 1000);
      console.log(countDown <= 0);

      if (countDown > 0) {
        sendCodeBox.innerHTML = "".concat(countDown, "s\u91CD\u53D1");
      } else {
        clearInterval(sendCodeStop);
        sendCodeBox.innerHTML = '发送验证码';
        sendCodeTime = null;
      }
    }, 1000);
  }
}; //绑定信息


window.bindingInfo = function (type) {
  if (type === 'email') {
    var email = document.querySelector('.email').value,
        code = document.querySelector('.email-code').value;

    if (email !== '' && code !== '') {
      (0, _api.bindingInfo)({
        email: email,
        sendMessageType: 1,
        code: code
      }).then(function (res) {
        if (res !== undefined) {
          toast.show({
            content: '绑定邮箱成功'
          });
          getPersonalInfo();
        }
      });
    } else {
      alert('请填写完整信息');
    }
  } else if (type === 'phone') {
    var phone = document.querySelector('.phone').value,
        _code = document.querySelector('.phone-code').value;

    if (phone !== '' && _code !== '') {
      (0, _api.bindingInfo)({
        phone: phone,
        sendMessageType: 1,
        code: _code
      }).then(function (res) {
        if (res !== undefined) {
          toast.show({
            content: '绑定手机成功'
          });
          getPersonalInfo();
        }
      });
    } else {
      alert('请填写完整信息');
    }
  }
};