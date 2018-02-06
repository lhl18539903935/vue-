// pages/edit_address/edit_address.js
var api = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editname:'',
    editmobile:'',
    editemile:'',
    editdetail:'',
    address_id:'',
    mobile:'',
    zip: '',
    address: '',
    province_id: '',
    city_id: '',
    area_id: '',
    country_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var vm=this
    wx.setStorage({
      key: "address_id",
      data: options.address_id
    })
    wx.getStorage({
      key: 'address_id',
      success: function (res) {
        vm.data.address_id=res.data
        console.log(vm.data.address_id)
    console.log(options.address_id)
    api.post({
      url:'/Template/editAddress',
      data:{
        address_id: options.address_id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success:function(res){
        vm.data.address_id=res.data.address.address_id
        vm.data.mobile = res.data.address.mobile
        vm.data.zip = res.data.address.zip
        vm.data.address = res.data.address.address
        vm.data.province_id = res.data.address.province_id
        vm.data.city_id = res.data.address.city_id
        vm.data.area_id = res.data.address.area_id
        vm.data.country_id = res.data.address.country_id
        if(res.code==200){
          vm.setData({
            name:res.data.address.name,
            mobile:res.data.address.mobile,
            province: res.data.address.province,
            city:res.data.address.city,
            area:res.data.address.area,
            emile:res.data.address.zip,
            detail: res.data.address.address
          })
        }
      }
    })
      }
    })
   
    
  },
  editname(e){
    this.data.editname=e.detail.value
    console.log(this.data.editname)
  },
  editmobile(e) {
    this.data.editmobile=e.detail.value
  },
  editemile(e) {
    this.data.editemile=e.detail.value
  },
  editdetail(e) {
    this.data.editdetail=e.detail.value
  },
  submit(){
    var vm=this
    api.post({
      url:'/Template/editAddressSave',
      data:{
        name: vm.data.editname,
        address_id: vm.data.address_id,
        mobile: vm.data.editmobile,
        zip: vm.data.editemile,
        province_id: vm.data.province_id,
        city_id: vm.data.city_id,
        area_id: vm.data.area_id,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }, 
      success:function(res){
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        })
        wx.navigateTo({
          url: '../address/address',
        })
      }
    })
  }
})