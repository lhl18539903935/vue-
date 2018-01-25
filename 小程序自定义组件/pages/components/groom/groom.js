// pages/components/groom/groom.js

function timer(vm) {
  let time = setInterval(function () {
    let endTime = new Date('2019/1/24 17:33:00');
    let nowTime = new Date();
    let ms = endTime.getTime() - nowTime.getTime();
    if (ms > 0) {
      var oDay = Math.floor(ms / 1000 / 60 / 60 / 24);
      //   console.log(oDay)
      var oHour = Math.floor(ms / 1000 / 60 / 60 % 24);
        // console.log(oHour)
      var oMain = Math.floor(ms / 1000 / 60 % 60);
      //   console.log(oMain)
      var osec = Math.floor(ms / 1000 % 60);
      vm.data.oDay = oDay
      vm.data.hours = oHour;
      vm.data.minutes = oMain;
      vm.data.seconds = osec;
      vm.setData({
        oDay: oDay,
        hours: oHour,
        minutes: oMain,
        seconds: osec
      })
      if (vm.data.seconds == 0 && vm.data.oDay == 0 && vm.data.hours == 0 && vm.data.minutes == 0) {
        vm.data.countstate = false;
        vm.data.act_status = true
        vm.data.changestate = true
        vm.data.delstate = true
        vm.data.nowstate = true
        vm.data.originalstate = false
        console.log(vm.data.nowstate)
        vm.setData({
          countstate: false,
          changestate: true,
          act_status: true,
          delstate: true,
          nowstate: true,
          originalstate: false
        })
      }
      //   console.log(vm.hours,vm.minutes,vm.seconds)
    } else {
      clearInterval(time)
    }
  }, 1000)
}




Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    images:{},
    hours: "0",
    minutes: '0',
    seconds: '0',
    oDay: '0',
    countstate: true,
    act_status: false,
    changestate: false,
    delstate: false,
    nowstate: false,
    originalstate: true,
    "id": "2017121914119341",
    "type": 20,
    "draggable": true,
    "sort": 1,
    "content": {
      "goodslist": [
        {
          "item_id": "771",
          "title": "测试商品",
          "price": "0.01",
          "original_price": "1.00",
          "create_time": "2017-11-25 10:02:28",
          "link": "http://n.diankuaike.com/Item/detail/id/771/sid/123.html",
          "pic": "../../../images/a1.jpg",
          "is_compress": 0
        }
      ],
      "act_status": "还有机会",
      "act_status_price": "疯抢价",
      "modulePadding": 9
    },
    "dom_conitem": null,
    "dom_ctrl": null,
    "ue": null
  },

  /**
   * 组件的方法列表
   */
  attached: function () { 
    timer(this)
  },
  methods: {
    imageLoad: function (e) {
      console.log(e)
      var $width = e.detail.width,    //获取图片真实宽度
        $height = e.detail.height,
        ratio = $width / $height;    //图片的真实宽高比例
      var viewWidth = 718,           //设置图片显示宽度，左右留有16rpx边距
        viewHeight = 718 / ratio;    //计算的高度值
      var image = this.data.images;
      //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
      image[e.target.dataset.index] = {
        width: viewWidth,
        height: viewHeight
      }
      this.setData({
        images: image
      })
    },
  }
})
