import {
  addressConfig,
  addressOperate,
  bindingInfo,
  getAddress,
  getUserInfo,
  sendMessage,
  setDefaultAddress,
  updateIcon,
  updatePassword,
  updateUserInfo
} from '../common/api';
import SHA256 from '../common/encrypt';

import template from '../common/template';
import {format} from "../common/tools";

import Mask from '../common/mask';
import Toast from '../common/toast';

let address = [],
  updateAddressInfo = [],
  _provcince = '',
  _city = '',
  _district = '';

let mask = new Mask();
let toast = new Toast();

template.defaults.imports.formDate = (val) => {
  return format(new Date(val), 'yyyy-MM-dd')
};

let addressList = [],
  personalInfo = {};

window.onload = () => {
  getPersonalInfo();

};

let getPersonalInfo = () => {
  addressConfig().then(res => {
    console.log(res);
    addressList = res;
    getUserInfo()
      .then(info => {
        console.log(info);

        document.querySelector('.account-personal-icon').setAttribute('src', info.icon);

        document.querySelector('.account-nick-name').innerHTML = info.nickName;

        info.provinceList = res.map(item => {
          return item.name;
        });

        for (let i = res.length - 1; i >= 0; i--) {
          if (info.address.indexOf(res[i].name) > -1) {
            info.province = res[i].name;
            let cities = res[i].cities;

            info.cities = cities;

            for (let c = cities.length - 1; c >= 0; c--) {
              if (info.address.indexOf(cities[c].name) > -1) {
                info.city = cities[c].name;
                let districts = cities[c].districts;

                info.districts = districts;

                for (let d = districts.length - 1; d >= 0; d--) {
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

        let hash = window.location.hash;

        if (hash !== null) {
          changeTab(hash.substring(1))
        } else {
          changeTab();
        }
      })
  });
};

window.onhashchange = () => {
  console.log(window.location.hash);
  changeTab(window.location.hash.substring(1))
};

let changeTab = (type) => {
  console.log(typeof type);
  let html = '';
  let opActive = document.querySelector('.op-active');

  if (opActive !== null) {
    opActive.className = opActive.className.replace('op-active', '');
  }

  switch (type) {
    case 'address':
      if (addressList.length > 0) {
        getAddress().then(res => {
          address = res;
          html = template('addr-info', {data: res});
          document.querySelector('.op-content').innerHTML = html;
        });
      } else {
        addressConfig().then(res => {
          console.log(res);
          addressList = res;
          getAddress().then(res => {
            address = res;
            html = template('addr-info', {data: res});
            document.querySelector('.op-content').innerHTML = html;
          });
        })
      }


      document.querySelector('.address').className += ' op-active';
      break;
    case 'update-password':
      html = template('update-password-container', {data: []});
      document.querySelector('.update-password').className += ' op-active';
      break;
    case 'personal-icon':
      html = template('update-personal-icon', {data: personalInfo});
      document.querySelector('.personal-icon').className += ' op-active';
      break;
    case 'binding-info':
      html = template('binding-info', {data: personalInfo});
      document.querySelector('.binding-info').className += ' op-active';
      break;
    case 'personal-info':
    default:
      html = template('personal-info', {data: personalInfo});
      document.querySelector('.personal-info').className += ' op-active';
      break;
  }

  if (html !== '') {
    document.querySelector('.op-content').innerHTML = html;
  }

  if (type === 'personal-info' || type === '' || type === undefined) {
    let addrSelectContainer = template('addr-select-container', {data: personalInfo, source: 0});
    document.querySelector('.addr-select-container').innerHTML = addrSelectContainer;
  }
};

//右侧显示内容
window.showContent = (type) => changeTab(type);

//设置默认地址
window.toSetDefaultAddress = (ele) => {
  setDefaultAddress({id: ele.getAttribute('data-op-id')})
    .then(res => {
      let index = ele.getAttribute('data-op-index'),
        addr = JSON.parse(JSON.stringify(address[index]));
      address.splice(index, 1);
      address.unshift(addr);
      let html = template('addr-info', {data: address});
      document.querySelector('.op-content').innerHTML = html;
    })
};

//删除地址
window.toDeleteAddress = (ele) => {
  addressOperate({id: ele.getAttribute('data-op-id'), cmd: 2})
    .then(res => {
      let index = ele.getAttribute('data-op-index');
      address.splice(index, 1);
      let html = template('addr-info', {data: address});
      document.querySelector('.addr-info').innerHTML = html;
    })
};

//显示地址候选栏
window.toShowContainer = (code) => {
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
};

//选中地址
window.selectThisArea = (code, ele) => {

  let info = null,
    source = +ele.getAttribute('data-op-source');

  if (source === 0) {
    info = personalInfo;
  } else {
    info = updateAddressInfo;
  }

  switch (code) {
    case 0:
      _provcince = ele.innerHTML;

      for (let i = addressList.length - 1; i >= 0; i--) {
        if (addressList[i].name === _provcince) {
          let province = addressList[i];
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

      let cities = info.cities;

      for (let i = cities.length - 1; i >= 0; i--) {
        if (cities[i].name === _city) {
          let city = cities[i];
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

  let html = template('addr-select-container', {data: info, source: source});

  if (source === 0) {
    document.querySelector('.addr-select-container').innerHTML = html;
  } else {
    document.querySelector('.my-modal .addr-select-container').innerHTML = html;
  }

};

//隐藏地址候选栏
window.toHideContainer = (code) => {
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

//保存个人信息
window.toSavePersonalInfo = () => {

  let sex = null;

  console.log(document.querySelector('input:checked').value);


  let obj = {
    account: personalInfo.account,
    address: personalInfo.province + personalInfo.city + personalInfo.district,
    birthday: document.querySelector('.birthday').value,
    nickName: document.querySelector('.nick-name').value,
    sex: document.querySelector('input:checked').value,
    introduction: document.querySelector('#introduction').value
  };

  updateUserInfo(obj).then(res => {
    console.log(res);
  });

  console.log(obj);

};

//更新密码
window.toSaveNewPasswork = () => {
  let oldP = document.querySelector('.old-password'),
    newP = document.querySelector('.new-password'),
    newP2 = document.querySelector('.new-password-again');

  if (newP.value !== newP2.value) {
    alert('新密码输入不正确');
    return
  }

  updatePassword({
    oldPassword: SHA256(oldP.value),
    newPassword: SHA256(newP.value)
  }).then(res => {
    console.log(res);
  })


};

//更换地址
window.updateAddress = (ele) => {
  console.log(ele.getAttribute('data-op-index'));
  let index = ele.getAttribute('data-op-index'),
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


  let modal = document.querySelector('.my-modal');

  mask.show();

  modal.style.display = 'block';

  let html = template('update-address', {data: addr, title: index !== null ? '编辑地址' : '新增地址'});

  modal.innerHTML = html;

  let provinceList = [],
    cities = [],
    districts = [];

  provinceList = addressList.map(item => {

    if (item.name === addr.province) {
      cities = item.cities;
      cities.map(item => {
        console.log(item);
        if (item.name === addr.city) {
          districts = item.districts;
        }
      });
    }
    return item.name
  });

  updateAddressInfo = Object.assign({}, addr, {
    provinceList: provinceList,
    province: addr.province,
    cities: cities,
    city: addr.city,
    districts: districts,
    district: addr.district
  });


  let addrSelectContainer = template('addr-select-container', {data: updateAddressInfo, source: 1});
  document.querySelector('.my-modal .addr-select-container').innerHTML = addrSelectContainer;


};

//关闭更新地址面板
let toCloseAddrBox = () => {
  mask.hide();

  document.querySelector('.my-modal').style.display = 'none';
};
window.toCloseUpdateAddrBox = () => toCloseAddrBox();

//保存地址
window.toSaveAddress = (ele) => {
  let id = +ele.getAttribute('data-op-id'),
    linkMan = document.querySelector('.link-man').value,
    telephone = document.querySelector('.phone').value,
    zipCode = document.querySelector('.zip-code').value,
    addressDetail = document.querySelector('.address-detail').value;

  if (linkMan !== '' && telephone !== '' && addressDetail !== '') {
    addressOperate({
      province: updateAddressInfo.province,
      city: updateAddressInfo.city,
      district: updateAddressInfo.district,
      id,
      linkMan,
      telephone,
      zipCode,
      address: addressDetail,
      cmd: id !== 0 ? 1 : 0
    }).then(res => {
      console.log(res);

      if (res !== undefined) {
        toCloseAddrBox();
        toast.show({
          content: id !== 0 ? '更新地址成功' : '新增地址成功'
        });
        changeTab(window.location.hash.substring(1))
      }

    });
  } else {
    alert('请完成必要信息，再进行保存！');
    return
  }

  console.log(linkMan, telephone, zipCode, addressDetail)

};

window.toAddAddress = () => {

  console.log(addressList)

  let addr = {
    linkMan: '',
    telephone: '',
    zipCode: '',
    id: '',
    addressDetail: '',
    province: addressList[0].name,
    city: addressList[0].cities[0].name,
    district: addressList[0].cities[0].districts[0].name
  };

  let modal = document.querySelector('.my-modal');

  mask.show();

  modal.style.display = 'block';

  let html = template('update-address', {data: addr, title: '编辑地址'});

  modal.innerHTML = html;

  let provinceList = [],
    cities = [],
    districts = [];

  provinceList = addressList.map(item => {

    if (item.name === addr.province) {
      cities = item.cities;
      cities.map(item => {
        console.log(item);
        if (item.name === addr.city) {
          districts = item.districts;
        }
      });
    }
    return item.name
  });

  updateAddressInfo = Object.assign({}, addr, {
    provinceList: provinceList,
    province: addr.province,
    cities: cities,
    city: addr.city,
    districts: districts,
    district: addr.district
  });


  let addrSelectContainer = template('addr-select-container', {data: updateAddressInfo, source: 1});
  document.querySelector('.my-modal .addr-select-container').innerHTML = addrSelectContainer;


};

//上传头像
window.toUploadAvatar = () => {
  let form = document.createElement('form'),
    input = document.querySelector('input');

  input.type = "file";
  input.name = "file";

  form.className = 'upload-form';

  input.className = 'upload-avatar';

  form.appendChild(input);

  document.querySelector('body').appendChild(form);

  input.click();

  input.addEventListener('change', () => {
    console.log(input.files);

    let formData = new FormData(form);

    updateIcon(formData).then(res => {
      console.log(res);
      document.querySelector('.account-name img').setAttribute('src', res);
      document.querySelector('.avatar').setAttribute('src', res);
    })

  })

};

const duration = 60;

let sendCodeTime = null,
  sendCodeStop = null,
  countDown = 0;

window.sendCode = (type) => {

  let sendCodeBox = null;

  if (sendCodeTime === null) {
    if (type === 'email') {
      let email = document.querySelector('.email').value;
      if (email !== '') {
        sendCodeTime = new Date().getTime();
        sendCodeBox = document.querySelector('.send-code-btn-email');
        sendCodeBox.innerHTML = `${duration}s重发`;
        sendMessage({
          email: '864927512@qq.com',
          sendMessageType: 1
        }).then(res => {
          if (res !== undefined) {
            console.log(res)
          }
        });
      } else {
        alert('请填写正确的邮箱地址');
        return
      }

    } else {
      let phone = document.querySelector('.phone').value;
      if (phone !== '') {
        sendCodeTime = new Date().getTime();
        sendCodeBox = document.querySelector('.send-code-btn-phone');
        sendCodeBox.innerHTML = `${duration}s重发`;
        sendMessage({
          phone: '15622316910',
          sendMessageType: 1
        }).then(res => {
          if (res !== undefined) {
            console.log(res)
          }
        });
      } else {
        alert('请填写正确的手机号码');
        return
      }
    }

    sendCodeStop = setInterval(() => {
      countDown = duration - Math.floor((new Date().getTime() - sendCodeTime) / 1000);
      console.log(countDown <= 0);
      if (countDown > 0) {
        sendCodeBox.innerHTML = `${countDown}s重发`
      } else {
        clearInterval(sendCodeStop);
        sendCodeBox.innerHTML = '发送验证码';
        sendCodeTime = null;
      }

    }, 1000)
  }
};

//绑定信息
window.bindingInfo = (type) => {

  if (type === 'email') {
    let email = document.querySelector('.email').value,
      code = document.querySelector('.email-code').value;
    if (email !== '' && code !== '') {
      bindingInfo({
        email: email,
        sendMessageType: 1,
        code: code
      })
        .then(res => {
          if(res !== undefined) {
            toast.show({
              content: '绑定邮箱成功'
            });
            getPersonalInfo();
          }

        })
    } else {
      alert('请填写完整信息');
    }

  } else if (type === 'phone') {
    let phone = document.querySelector('.phone').value,
      code = document.querySelector('.phone-code').value;
    if (phone !== '' && code !== '') {
      bindingInfo({
        phone: phone,
        sendMessageType: 1,
        code: code
      })
        .then(res => {
          if(res !== undefined) {
            toast.show({
              content: '绑定手机成功'
            });
            getPersonalInfo();
          }
        })
    } else {
      alert('请填写完整信息');
    }
  }
};