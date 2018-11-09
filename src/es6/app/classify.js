import { getProductClassify } from '../common/api';

import template from '../common/template';


getProductClassify()
  .then(res=>{
    let html = template('classify-view',{data:res});
    document.querySelector('.classify-container').innerHTML = html;
  });

window.onhashchange = () =>{
  console.log()
  let newActive =document.querySelector('#classify-'+window.location.hash.substring(1)),
      oldEle = document.querySelector('.sec-active');

  oldEle!== null && (oldEle.className = 'sec-classify-item');

  newActive.className = 'sec-classify-item sec-active';

};