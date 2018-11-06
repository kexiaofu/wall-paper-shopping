import { getAddress, setDefaultAddress, addressOperate } from '../common/api';

import template from '../common/template';

let address = [];

window.onload = () =>{
  getAddress().then(res=>{
    address = res.slice(0);
    let html = template('addr-info',{data:res});
    document.querySelector('.addr-info').innerHTML = html;
  })
};

window.toSetDefaultAddress = (ele) =>{
  setDefaultAddress({id:ele.getAttribute('data-op-id')})
    .then(res=>{
      let index = ele.getAttribute('data-op-index'),
          addr = JSON.parse(JSON.stringify(address[index]));
      address.splice(index,1);
      address.unshift(addr);
      let html = template('addr-info',{data:address});
      document.querySelector('.addr-info').innerHTML = html;
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