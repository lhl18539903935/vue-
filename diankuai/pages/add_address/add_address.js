var model = require('../../model/model.js')
var api = require('../../utils/ajax.js')
var show = false;
var item = {};

Page({
  data: {
    item: {
      show: show,
      city_id:'',
      area_id:'',
      province_id:'',
      sheng:'',
      shi:'',
      qu:'',
    }
  },
  onLoad:function(e){
    wx.getStorage({
      key: 'province_id',
      success: function (res) {
        vm.data.sheng = res.data
      }
    })
    wx.getStorage({
      key: 'city_id',
      success: function (res) {
        vm.data.shi = res.data
        console.log(res.data)
      }
    })
    wx.getStorage({
      key: 'area_id',
      success: function (res) {
        vm.data.qu = res.data
      }
    })
    var vm=this
    wx.getStorage({
      key: 'area_name',
      success: function (res) {
        vm.data.area_id=res.data
        vm.setData({
          area_id: res.data
        })
      }
    })
    wx.getStorage({
      key: 'city_name',
      success: function (res) {
        vm.data.city_id=res.data
        vm.setData({
          city_id: res.data
        })
      }
    })
    wx.getStorage({
      key: 'province_name',
      success: function (res) {
        vm.data.province_id=res.data
        vm.setData({
          province_id: res.data
        })
      }
    })
  },
  name(e){
    this.data.name=e.detail.value
  },
  mobile(e) {
    this.data.mobile=e.detail.value
  },
  emile(e) {
    this.data.emile=e.detail.value
  },
  address_detail(e) {
    this.data.address_list=e.detail.value
  },
  submit(){
    var vm=this
    console.log(vm.data.qu)
    api.post({
      url:'/Template/addAddress',
      data:{
        name:vm.data.name,
        mobile: vm.data.mobile,
        address: vm.data.address_list,
        province_id: vm.data.sheng,
        city_id: vm.data.shi,
        area_id: vm.data.qu,
        zip: vm.data.emile
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success:function(res){
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000
        })
        // wx.clearStorage()
        wx.navigateTo({
          url: '../address/address',
        })
      }
    })
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function (e) {
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
  },
  //点击选择城市按钮显示picker-view
  translate: function (e) {
    model.animationEvents(this, 0, true, 400);
  },
  //隐藏picker-view
  hiddenFloatView: function (e) {
    model.animationEvents(this, 200, false, 400);
  },
  //滑动事件
  bindChange: function (e) {
    model.updateAreaData(this, 1, e);
    item = this.data.item;
    this.setData({
      province: item.provinces[item.value[0]].name,
      city: item.citys[item.value[1]].name,
      county: item.countys[item.value[2]].name
    });
  },
  onReachBottom: function () {
  },
  nono: function () { }
})
