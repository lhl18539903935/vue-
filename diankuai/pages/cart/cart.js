var api = require('../../utils/ajax.js')
Page({
  data: {
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: true  ,  // 全选状态，默认全选
    cartlist:[]
  },

  onLoad: function (e) {
   
  },
  onShow() {
    var vm = this
    api.post({
      url: '/Template/cart',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data.lists)
        for (var i in res.data.lists) {
          console.log(res.data.lists[i].item_id)
        }
        vm.data.cart_num = res.data.cart_num

        if (res.code == 200) {
          vm.data.cartlist = res.data.lists
          vm.setData({
            cart_num: res.data.cart_num,
            cart_price: res.data.cart_price,
            carts: res.data.lists
          })
          vm.getTotalPrice();
        }
      }
    })
    this.setData({
      hasList: true,
      carts: [
        { id: 1, title: '新鲜芹菜 半斤', image: '../../images/a1.jpg', num: 4, price: 0.01, selected: true },
        { id: 2, title: '素米 500g', image: '../../images/a1.jpg', num: 1, price: 0.03, selected: true }
      ]
    });
    this.getTotalPrice();
  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts: carts,
      selected:carts[index].selected
    });
    this.getTotalPrice();
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index, 1);
    this.setData({
      carts: carts
    });
    if (!carts.length) {
      this.setData({
        hasList: false
      });
    } else {
      this.getTotalPrice();
    }
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    this.data.carts = this.data.carts;
    let num = this.data.carts[index].num;
    num++;
    this.data.carts[index].num = num;
    this.setData({
      carts: this.data.carts,
    });
    this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    var vm=this
    let carts = vm.data.carts;               // 获取购物车列表
    let total = 0;
    for (let i = 0; i < vm.data.carts.length; i++) {         // 循环列表得到每个数据                  // 判断选中才会计算价格
        total += vm.data.carts[i].num * vm.data.carts[i].price;  // 所有价格加起来    
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: vm.data.carts,
      cart_price: total.toFixed(2)
    });
  }

})