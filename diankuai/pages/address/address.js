// pages/address/address.js
var api = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    choose:false,
    index:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getaddresslist()
  },
  getaddresslist(){
    var vm = this
    api.post({
      url: '/Template/addressList',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data)
        if (res.code == 200) {
          vm.setData({
            addresslist: res.data.addressList
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  radioChange(e){
    var vm=this
    console.log(e.currentTarget.id)
    vm.data.index = e.target.dataset.index
    api.post({
      url:'/Template/setDefaultAddress',
      data:{
        address_id: e.currentTarget.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success:function(res){
        console.log(res)
        vm.getaddresslist()
        vm.setData({
          choose: !vm.data.choose
        })
      }
    })
  },
  detele(e){
    var vm=this
    wx.showModal({
      title: '提示',
      content: '确定删除吗？',
      success: function (res) {
        if (res.confirm) {
          api.post({
            url:'/Template/delAddress',
            data: { address_id: e.currentTarget.id},
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success:function(res){
              console.log(res)
              vm.getaddresslist()
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})