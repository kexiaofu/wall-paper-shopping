import { getUserInfo, addressConfig, updateUserInfo, getAddress, updatePassword, setDefaultAddress, addressOperate } from '../common/api';
import SHA256 from '../common/encrypt';

import template from '../common/template';
import {format} from "../common/tools";

let address = [],
    _provcince = '',
    _city = '',
    _district = '';

template.defaults.imports.formDate = (val) => {
  return format(new Date(val),'yyyy-MM-dd')
};

let addressList = [],
    personalInfo = {};

window.onload = () =>{
  /*getAddress().then(res=>{
    address = res.slice(0);
    let html = template('addr-info',{data:res});
    document.querySelector('.addr-info').innerHTML = html;
  })*/

  getPersonalInfo();

};

let getPersonalInfo = () =>{
  addressConfig().then(res=>{
    console.log(res);
    addressList = res;
    getUserInfo()
      .then(info=>{
        console.log(info);

        document.querySelector('.account-personal-icon').setAttribute('src',info.icon);

        document.querySelector('.account-nick-name').innerHTML = info.nickName;

        console.log(document.querySelector('.account-personal-icon'),1234);

        info.provinceList = res.map(item=>{
          return item.name;
        });

        for(let i=res.length-1;i>=0;i--) {
          if(info.address.indexOf(res[i].name) > -1) {
            info.province = res[i].name;
            let cities = res[i].cities;

            info.cities = cities;

            for(let c = cities.length-1;c>=0;c--) {
              if(info.address.indexOf(cities[c].name) > -1) {
                info.city = cities[c].name;
                let districts = cities[c].districts;

                info.districts = districts;

                for(let d=districts.length-1;d>=0;d--) {
                  if(info.address.indexOf(districts[d].name) > -1) {
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

        if(hash !== null) {
          changeTab(hash.substring(1))
        } else {
          changeTab();
        }
      })
  });
};

window.onhashchange = () =>{
  console.log(window.location.hash);
  changeTab(window.location.hash.substring(1))
};

let changeTab = (type) =>{
  console.log(type);
  let html = '';
  let opActive = document.querySelector('.op-active');

  if(opActive !== null) {
    opActive.className = opActive.className.replace('op-active','');
  }

  switch (type) {
    case 'address':
      getAddress().then(res=>{
        address = res;
        html = template('addr-info',{data:res});
        document.querySelector('.op-content').innerHTML = html;
      });

      document.querySelector('.address').className += ' op-active';
      break;
    case 'update-password':
      html = template('update-password-container',{data:[]});
      document.querySelector('.update-password').className += ' op-active';
      break;
    case 'personal-icon':
      html = template('update-personal-icon',{data:[]});
      document.querySelector('.personal-icon').className += ' op-active';
      break;
    case 'personal-info':
    default:
      html = template('personal-info',{data:personalInfo});
      document.querySelector('.personal-info').className += ' op-active';
      break;

  }

  if(html !== '') {
    document.querySelector('.op-content').innerHTML = html;
  }

  if(type === 'personal-info' || type === undefined) {
    let addrSelectContainer = template('addr-select-container',{data:info});
    document.querySelector('.addr-select-container').innerHTML = addrSelectContainer;
  }


};

window.showContent = (type) => changeTab(type);

window.toSetDefaultAddress = (ele) =>{
  setDefaultAddress({id:ele.getAttribute('data-op-id')})
    .then(res=>{
      let index = ele.getAttribute('data-op-index'),
          addr = JSON.parse(JSON.stringify(address[index]));
      address.splice(index,1);
      address.unshift(addr);
      let html = template('addr-info',{data:address});
      document.querySelector('.op-content').innerHTML = html;
    })
};

window.toDeleteAddress = (ele) =>{
  addressOperate({id:ele.getAttribute('data-op-id'),cmd:2})
    .then(res=>{
      let index = ele.getAttribute('data-op-index');
      address.splice(index,1);
      let html = template('addr-info',{data:address});
      document.querySelector('.addr-info').innerHTML = html;
    })
};

window.toShowContainer = (code) =>{
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
  console.log(123)
};

window.selectThisArea = (code,ele) =>{
  switch (code) {
    case 0:
      _provcince = ele.innerHTML;

      for(let i=addressList.length-1;i>=0;i--) {
        if(addressList[i].name === _provcince) {
          let province = addressList[i];
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

      let cities = personalInfo.cities;

      for(let i=cities.length-1;i>=0;i--) {
        if(cities[i].name === _city) {
          let city = cities[i];
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

  let html = template('addr-select-container',{data:personalInfo});

  document.querySelector('.addr-select-container').innerHTML = html;

  console.log( ele.innerHTML)
};

window.toHideContainer = (code) =>{
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

window.toSavePersonalInfo = () =>{

  let sex = null;

  console.log(document.querySelector('input:checked').value);


  let obj = {
    account:personalInfo.account,
    address:personalInfo.province+personalInfo.city+personalInfo.district,
    birthday:document.querySelector('.birthday').value,
    nickName:document.querySelector('.nick-name').value,
    sex:document.querySelector('input:checked').value,
    introduction:document.querySelector('#introduction').value
  };

  updateUserInfo(obj).then(res=>{
    console.log(res);
  });

  console.log(obj);

};

//更新密码
window.toSaveNewPasswork = () =>{
  let oldP = document.querySelector('.old-password'),
      newP = document.querySelector('.new-password'),
      newP2 = document.querySelector('.new-password-again');

  if(newP.value !== newP2.value) {
    alert('新密码输入不正确');
    return
  }

  updatePassword({
    oldPassword:SHA256(oldP.value),
    newPassword:SHA256(newP.value)
  }).then(res=>{
    console.log(res);
  })


};