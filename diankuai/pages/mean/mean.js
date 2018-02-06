// pages/mean/mean.js
var api=require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchstate:true,
    datalist:true,//判断是否有数据
    checked:false,//使用余额
    orderlist:[],
    status:1,//订单状态
    page:1,
    options:'',
    detail_list:[],
    num:0,
    del_code:'',
    all_orderlist:[
      { order_num: 1, all: '全部订单', img: 'icon-dingdan'},
      { order_num: 1, all: '待付款', img: 'icon-dengdaifukuan' },
      { order_num: 1, all: '待发货', img: 'icon-icon-test ' },
      { order_num: 1, all: '待收货', img: 'icon-chongzhiyufukuanguanli' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getorder()
  },
  getorder(){
    var vm = this
    api.post({
      url: "/Template/index",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.code == 200) {
          wx.showLoading({
            title: '加载中...',
            mask: 'true'
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
          vm.data.orderlist.push(
            { order_num: res.data.all_total, all: '全部订单', img: 'icon-dingdan' }, //全部订单数量
            { order_num: res.data.wait_total, all: '待付款', img: 'icon-dengdaifukuan' }, //待付款订单数量
            { order_num: res.data.send_total, all: '待发货', img: 'icon-icon-test ' }, //已发货订单数量
            { order_num: res.data.return_total, all: '待收货', img: 'icon-chongzhiyufukuanguanli' },//退换货数量
          )

          vm.setData({
            avatar: res.data.avatar,
            create_time: res.data.user_info.create_time,
            user_id: res.data.user_info.user_id,
            nickname: res.data.user_info.nickname,
            all_orderlist: vm.data.orderlist
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    this.allOrderLists()
  }, 
  allOrderLists(){
    var vm=this
    let status = JSON.stringify(this.data.status)
    let page = JSON.stringify(this.data.page)  
    api.post({
      url:'/Template/allOrderLists',
      data:{
        status:status,
        p:page
      }, 
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }, 
      success:function(res){
        if(res.code==200){
          vm.setData({
            detail_list:res.data
          })
        }else{
          vm.setData({
            detail_list: []
          })
          wx.showToast({
            title: '没有更多数据',
            icon: 'none',
            duration: 2000
          })
        }
      }
       
    })
  },
  onReachBottomIndex(){
    var vm = this
    this.data.page++
    let status = JSON.stringify(this.data.status)
    let page = JSON.stringify(this.data.page)
    api.post({
      url: '/Template/allOrderLists',
      data: {
        status: status,
        p: page
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)
        if (res.code == 200) {
          console.log(vm.data.detail_list)
          vm.setData({
            detail_list: vm.data.detail_list.concat(res.data)
          })
        } else {
          wx.showToast({
            title: '没有更多数据',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
    this.setData({
      page: this.data.page
    })
  },
  // 上拉加载
  onReachBottom(){
    this.onReachBottomIndex()
  },
  // 导航栏切换颜色
  choose(e){
    var vm = this
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    if (e.currentTarget.id==0){
      this.data.status = 1
      this.data.page = 1
      this.allOrderLists()
    }
    this.setData({
      num: e.currentTarget.id
    }) 
    if (e.currentTarget.id == 1) {
      this.data.status=2
      this.data.page = 1
      this.allOrderLists()
    }
    this.setData({
      num: e.currentTarget.id
    }) 
    if (e.currentTarget.id == 2) {
      this.data.status = 3
      this.data.page = 1
      this.allOrderLists()
    }
    this.setData({
      num: e.currentTarget.id
    }) 
    if (e.currentTarget.id == 3) {
      this.data.status = 6
      this.data.page = 1
      this.allOrderLists()
    }
    this.setData({
      num: e.currentTarget.id
    }) 
  },
  // 切换支付
  switch:function(){
    var vm =this;
    this.setData({
      switchstate:false
    })
  },
  //取消支付
  exat_pay(){
    this.setData({
      switchstate: true
    })
  },
  choseradio(){
    this.setData({
      checked:!this.data.checked
    })
  },
  // 删除
  detele(options){
    var vm=this
    wx.showModal({
      title: '提示',
      content: '确定删除吗？',
      success: function (res) {
        if (res.confirm) {
         api.post({
           url:'/Template/orderDel',
           data:{
             order_id: options.currentTarget.id,
             del_code: vm.data.del_code
           },
           header: {
             "Content-Type": "application/x-www-form-urlencoded"
           },
           success:function(res){
             vm.getorder()
             vm.allOrderLists()
           }
         })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})