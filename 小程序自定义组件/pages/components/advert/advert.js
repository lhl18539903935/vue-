// pages/components/advert/advert.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // content:{
    //   type:Object
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    images: {},
    "id": "20171219102032793",
    "type": 9,
    "draggable": true,
    "sort": 1,
    "content": {
      "showType": "2",
      "space": 0,
      "margin": 5,
      "modulePadding": 11,
      "dataset": [
        {
          "linkType": 0,
          "link": "",
          "title": "",
          "showtitle": "电话费手机卡",
          "pic": "http://tp.huileyi.com/20/2c/123/2017-12/5a27b8351762a.jpg",
          "subtitle": "阿萨德李康康"
        },
        {
          "linkType": 0,
          "link": "",
          "title": "",
          "showtitle": "阿道夫公积",
          "pic": "http://tp.huileyi.com/20/2c/123/2017-12/5a27b8351762a.jpg",
          "subtitle": "福利控股"
        }
      ]
    },
    "dom_conitem": null,
    "dom_ctrl": null,
    "ue": null,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },

  /**
   * 组件的方法列表
   */
  methods: {
    imageLoad: function (e) {
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
    }
  }
})
