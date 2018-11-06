import template from '../common/template';
import Toast from '../common/toast';

import {addOrder, deleteShoppingCart, getShoppingCarInfo} from '../common/api';

template.defaults.imports.toFixed2 = (val) => {
  return val.toFixed(2);
};

let productInfo = [],
  productIds = [],
  toast = new Toast();

//获取购物车信息
getShoppingCarInfo().then(res => {
  productInfo = res.slice(0);
  productInfo = productInfo.map(item => {
    item.selected = false;
    productIds.push(item.id);
    return item;
  });
  let html = template('shopping-list-page', {data: productInfo});
  document.querySelector('.shopping-list-page').innerHTML = html;
  productInfo.length > 0 && (document.querySelector('.to-pay').style.visibility = 'visible');
  productInfo.length > 0 && (document.querySelector('.batch-operation').style.visibility = 'visible');
});

//改变商品的数量
window.opProductQuantity = (ele) => {
  let id =  ele.getAttribute('data-op-id'),
    _index = productIds.indexOf(id),
    _op = ele.getAttribute('data-op');

  let product = productInfo[_index],
    selected = document.querySelector(`#select${product.id}`).checked;

  console.log(selected);

  if (_op === 'add') {
    productInfo.splice(_index, 1, Object.assign({}, product, {
      number: product.number + 1
    }));
  } else {
    productInfo.splice(_index, 1, Object.assign({}, product, {
      number: product.number > 1 ? product.number - 1 : 1
    }));
  }

  if (selected) {
    let count = 0;
    productInfo.map(item => {
      item.selected && (count += (item.money * item.number));
    });
    orderCount = count.toFixed(2) - 0;
    document.querySelector('.order-count').innerHTML = orderCount;
  }


  let html = template('shopping-list-page', {data: productInfo});
  document.querySelector('.shopping-list-page').innerHTML = html;

};

//添加或者移除商品进订单里面
window.addProductToOrder = (ele) => {
  console.log(ele.checked);
  let id = ele.getAttribute('data-op-id'),
    _index = productIds.indexOf(id),
    product = productInfo[_index];
  if (ele.checked) {
    productInfo.splice(_index, 1, Object.assign({}, product, {
      selected: true
    }));
    document.querySelector('#product-id-' + product.id).className = 'product-item product-selected';
    //document.querySelector('#batch-operation-btn').checked = true;
  } else {
    productInfo.splice(_index, 1, Object.assign({}, product, {
      selected: false
    }));
    document.querySelector('#product-id-' + product.id).className = 'product-item';
    document.querySelector('#batch-operation-btn').checked = false;

  }

  calculateCount();

};

//删除商品
window.deleteThisProduct = (ele) => {
  console.log(productInfo,'0000',ele.getAttribute('data-op-id'));
  let id = ele.getAttribute('data-op-id');

  deleteShoppingCart({id: id})
    .then(res => {
      console.log(res);
      toast.show({
        content: '删除成功'
      });
      console.log(document.querySelector('#product-id-'+id));
      document.querySelector('.shopping-list-page').removeChild(document.querySelector('#product-id-'+id));
      productInfo.splice(productIds.indexOf(id), 1);
      calculateCount();

      window.dispatchEvent(new CustomEvent('updateShoppingCart'));

    })
};

//提交订单
window.toSumbitOrder = () => {
  let products = [];
  productInfo.map(item => {
    if (item.selected) {
      products.push({
        id: item.id,
        number: item.number
      })
    }
  });

  if (products.length > 0) {
    addOrder(products)
      .then(res => {
        window.location.href = './my-order.html#wait2pay';
      })
  }

  console.log(products)
};

//计算价格
let calculateCount = () =>{
  let orderCount = 0,
    productCount = 0;

  if(productCount.length > 0) {
    productInfo.map(item=>{
      if(item.selected) {
        orderCount  += item.money * item.number;
        productCount++;
      }
    });

    console.log(productInfo);

    orderCount = orderCount.toFixed(2) - 0;

    if (orderCount > 0) {
      document.querySelector('.to-order').style.background = '#f00';
    } else {
      document.querySelector('.to-order').style.background = '#aaa';
    }

    document.querySelector('.order-count').innerHTML = orderCount;
    document.querySelector('.order-quantity').innerHTML = productCount;
  } else {
    document.querySelector('.to-pay').style.visibility = 'hidden';
    document.querySelector('.batch-operation').style.visibility = 'hidden';
    let html = template('shopping-list-page', {data: []});
    document.querySelector('.shopping-list-page').innerHTML = html;


  }



};

//渲染函数
let rendering = () => {
  let count = 0, quantity = 0;
  let html = template('shopping-list-page', {data: productInfo});
  document.querySelector('.shopping-list-page').innerHTML = html;
  setTimeout(() => {
    productInfo.map((item, index) => {
      if (item.selected) {
        count += item.money * item.number;
        quantity++;
        document.querySelector('#product-id-' + item.id).className = 'product-item product-selected';
      } else {
        document.querySelector('#product-id-' + item.id).className = 'product-item';
      }
    });

    if (count > 0) {
      document.querySelector('.to-order').style.background = '#f00';
    } else {
      document.querySelector('.to-order').style.background = '#aaa';
    }

    document.querySelector('.order-count').innerHTML = count.toFixed(2);

    document.querySelector('.order-quantity').innerHTML = quantity;

  }, 0)
};

//滚动函数
let toPayBar = () => {
  let page = document.querySelector('.shopping-list-page'),
    body = document.documentElement,
    pageTop = page.offsetTop,
    pageHeight = page.offsetHeight,
    bodyHeight = body.clientHeight,
    bodyScroll = body.scrollTop,
    ele = document.querySelector('.to-pay');
  if (((pageHeight - bodyScroll) - (bodyHeight - pageTop)) <= 20) {
    ele.className = 'to-pay to-pay-bottom'
  } else {
    ele.className = 'to-pay'
  }
};

//监听页面滚动
window.addEventListener('scroll', toPayBar);

//全选
window.selectAll = (ele) => {
  console.log(ele.checked);
  let bool = ele.checked;
  if (bool) {
    productInfo = productInfo.map(item => {
      item.selected = true;
      return item
    });
  } else {
    productInfo = productInfo.map(item => {
      item.selected = false;
      return item
    })
  }
  rendering();

};


