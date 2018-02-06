var api = require('../../utils/ajax.js')
Page({
  data: {
    num:0,
    province_id:'',
    city_id: '', 
    provice:'',
    cityname:'',
    areaname:'',
    list:[]
  },
  onLoad:function(e){
    console.log(e)
    var vm=this
    api.post({
      url:"/Template/getProvince",
      data:{},
      success:function(res){
        if(res.code==200){
          vm.setData({
            provinces:res.data
          })
        }
      }
    })
  },
  choose_city(e){

    var vm=this
    vm.data.province_id = e.currentTarget.id
    vm.data.num=1
    api.post({
      url: "/Template/getProvince",
      data: {},
      success: function (res) {
        wx.setStorage({
          key: "province_name",
          data: res.data[e.currentTarget.dataset.index].province_name
        })
        wx.setStorage({
          key: "province_id",
          data: res.data[e.currentTarget.dataset.index].province_id
        })
        if (res.code == 200) {
          vm.data.provice=res.data[e.currentTarget.dataset.index].province_name
          vm.setData({
            province: res.data[e.currentTarget.dataset.index].province_name
          })
        }
      }
    })
    vm.setData({
      num:vm.data.num
    })
    api.post({
      url:'/Template/getCity',
      data:{
        province_id: e.currentTarget.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success:function(res){
        if(res.code==200){
          vm.setData({
            city:res.data
          })
        }
      }
    })
   
  },
  choose_area(e){
    var vm = this
    vm.data.city_id = e.currentTarget.id
    vm.data.num = 2
    api.post({
      url: '/Template/getCity',
      data: {
        province_id: vm.data.province_id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.code == 200) {
          wx.setStorage({
            key: "city_name",
            data: res.data[e.currentTarget.dataset.index].city_name
          })
          wx.setStorage({
            key: "city_id",
            data: res.data[e.currentTarget.dataset.index].city_id
          })
          vm.data.cityname=res.data[e.currentTarget.dataset.index].city_name
          vm.setData({
            cityname: res.data[e.currentTarget.dataset.index].city_name
          })
        }
      }
    })
    vm.setData({
      num: vm.data.num
    })
    api.post({
      url: '/Template/getArea',
      data: {
        city_id: e.currentTarget.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.code == 200) {
          vm.setData({
            area: res.data
          })
        }
      }
    })

  },
  choose(e){
    var vm=this
    console.log(e)
    api.post({
      url: '/Template/getArea',
      data: {
        city_id: vm.data.city_id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.code == 200) {
          wx.setStorage({
            key: "area_name",
            data: res.data[e.currentTarget.dataset.index].area_name
          })
          wx.setStorage({
            key: "area_id",
            data: res.data[e.currentTarget.dataset.index].area_id
          })
          vm.data.areaname = res.data[e.currentTarget.dataset.index].area_name
          vm.setData({
            areaname: res.data[e.currentTarget.dataset.index].area_name
          })
        }
      }
    })
    // vm.data.list = vm.data.list.concat(vm.data.province+ vm.data.cityname+ vm.data.areaname )
   
    wx.navigateTo({
      url: "../add_address/add_address" 
    })
    vm.setData({
      area: e.currentTarget.id
    })
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function (e) {

  },
  onReachBottom: function () {
  },
  nono: function () { }
})
