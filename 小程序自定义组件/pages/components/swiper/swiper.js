// pages/components/swiper/swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content:{
      type: Object,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    images: {},
    "id": 9,
    "type": "Header_style46",
    "draggable": true,
    "sort": 0,
    "content": {
      "showType": "2",
      "modulePadding": 0,
      "dataset": [
        {
          "link": "%/Shop%/index",
          "linkType": 6,
          "showtitle": "白金早礼",
          "title": "",
          "subtitle": "女装",
          "pic": "http:tp.huileyi.com/5a27b822d0213.jpg"
        },
        {
          "link": "%/Shop%/index",
          "linkType": 6,
          "showtitle": "白金早礼",
          "title": "",
          "subtitle": "男装",
          "pic": "http:tp.huileyi.com/5a27b822d0213.jpg"
        }
      ]
    },
    "margin": 20,
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
    },
    changeIndicatorDots: function (e) {
      this.setData({
        indicatorDots: !this.data.indicatorDots
      })
    },
    changeAutoplay: function (e) {
      this.setData({
        autoplay: !this.data.autoplay
      })
    },
    intervalChange: function (e) {
      this.setData({
        interval: e.detail.value
      })
    },
    durationChange: function (e) {
      this.setData({
        duration: e.detail.value
      })
    }
  }
})
