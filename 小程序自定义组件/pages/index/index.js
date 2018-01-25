//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    "content": {
      "showType": "2",
      "modulePadding": 0,
      "margin": 20,
      "dom_conitem": null,
      "dom_ctrl": null,
      "ue": null,
      dataset: [
        { pic: "../../../images/a1.jpg", "showtitle": "白金早礼", },
        { pic: "../../../images/a4.jpg", "showtitle": "白金早礼", },
        { pic: "../../../images/g07.jpg", "showtitle": "白金早礼", }
      ],
    },
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },
  //事件处理函数

  onLoad: function () {
    
    }
  
  
})
