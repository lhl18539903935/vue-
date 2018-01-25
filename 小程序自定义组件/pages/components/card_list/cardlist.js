// pages/components/card_list/cardlist.js
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
    show: 0,
    items: [],
    "id": "20171219141158940",
    "type": 21,
    "draggable": true,
    "sort": 2,
    "content": {
      "layout": 1,
      "showPrice": true,
      "showIco": true,
      "showName": 1,
      "titleLine": 0,
      "version": 1,
      "modulePadding": 12,
      "goodslist": [
        {
          "tabtitle": "卡片一",
          "goods": [
            {
              "item_id": "795",
              "title": "简约沙发",
              "price": "1200.00",
              "original_price": "1200.00",
              "create_time": "2017-12-18 18:47:18",
              "link": "http://n.diankuaike.com/Item/detail/id/795/sid/123.html",
              "pic": "http://tp.huileyi.com/20/2c/123/2017-12/5a379cc8eea64.png",
              "is_compress": 0
            }
          ]
        },
        {
          "tabtitle": "卡片二",
          "goods": [
            {
              "item_id": "795",
              "title": "简约沙发",
              "price": "1200.00",
              "original_price": "1200.00",
              "create_time": "2017-12-18 18:47:18",
              "link": "http://n.diankuaike.com/Item/detail/id/795/sid/123.html",
              "pic": "../../../images/a1.jpg",
              "is_compress": 0
            }
          ]
          
        },
        {
          "tabtitle": "卡片三",
          "goods": [
            {
              "item_id": "795",
              "title": "简约沙发",
              "price": "1200.00",
              "original_price": "1200.00",
              "create_time": "2017-12-18 18:47:18",
              "link": "http://n.diankuaike.com/Item/detail/id/795/sid/123.html",
              "pic": "../../../images/a2.jpg",
              "is_compress": 0
            }
          ]
        },
        {
          "tabtitle": "卡片四",
          "goods": [
            {
              "item_id": "795",
              "title": "简约沙发",
              "price": "1200.00",
              "original_price": "1200.00",
              "create_time": "2017-12-18 18:47:18",
              "link": "http://n.diankuaike.com/Item/detail/id/795/sid/123.html",
              "pic": "../../../images/a3.jpg",
              "is_compress": 0
            }
          ]
        }
      ]
    },
    "dom_conitem": null,
    "dom_ctrl": null,
    "ue": null
  },

  /**
   * 组件的方法列表
   */
  attached: function () { 
    this.select() 
  },
  methods: {
    selected(e) {
      if (e.currentTarget){
        e.currentTarget.id = e.currentTarget.id || 0
        this.data.show = e.currentTarget.id 
        this.data.items = this.data.content.goodslist[e.currentTarget.id ].goods
        this.setData({
          show: e.currentTarget.id ,
          items: this.data.content.goodslist[e.currentTarget.id].goods
        })
      }
    },
    select(){
      this.data.show = 0
        this.data.items = this.data.content.goodslist[0].goods
        this.setData({
        show: 0,
        items: this.data.content.goodslist[0].goods
      })
    },
  }
})
