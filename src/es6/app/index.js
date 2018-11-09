import Carousel from '../common/carousel';

import Mask from '../common/mask';
import { getCarousel, getProductionList, getHomeGroup } from '../common/api';

import { imageLazyLoad } from '../common/tools';

import template from '../common/template.js';

window.onload = () =>{

  let mask = new Mask();

  getCarousel().then(res=>{
    let carousel = new Carousel({
      autoPlay:true,
      parent:'carousel-container',
      images:res
    });
  });

  getProductionList().then(res=>{
    let html = template('production-list', {data:res});
    document.querySelector('.production-list').innerHTML = html;
    let images = document.querySelectorAll('.lazy-load-img');

    imageLazyLoad(images);

  });

  getHomeGroup()
    .then(res=>{
      console.log(res);

      let html = '';

      res.map(item=>{

        switch(item.templetType) {
          case 1:
            break;
          case 2:
            html += template('show-text-images-box',{data:item});
            break;
          case 3:
            html += template('show-images-box-a',{data:item});
            break;
          case 4:
            console.log(item);
            html += template('show-more-info',{data:item});
            break;
        }

        document.querySelector('.show-box').innerHTML = html;

      });

      let images = document.querySelectorAll('.lazy-load-img');

      imageLazyLoad(images);

    });

  window.onscroll = () =>{
    let images = document.querySelectorAll('.lazy-load-img'),
      len = images.length;
    if(images[len-1].getAttribute('data-is-load') === 'false') {
      imageLazyLoad(images);
    }
  }

};
