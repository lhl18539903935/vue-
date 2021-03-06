'use strict';

exports.__esModule = true;
exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "van-sku-header van-hairline--bottom" }, [_c('div', { staticClass: "van-sku-header__img-wrap" }, [_c('img', { staticClass: "van-sku__goods-img", attrs: { "src": _vm.goodsImg } })]), _c('div', { staticClass: "van-sku-header__goods-info" }, [_c('div', { staticClass: "van-sku__goods-name" }, [_vm._v(_vm._s(_vm.goods.title))]), _c('div', { staticClass: "van-sku__goods-price" }, [_c('span', { staticClass: "van-sku__price-symbol" }, [_vm._v("￥")]), _c('span', { staticClass: "van-sku__price-num" }, [_vm._v(_vm._s(_vm.price))])]), _c('span', { staticClass: "van-sku__close-icon", on: { "click": _vm.onCloseClicked } })])]);
  },

  name: 'van-sku-header',

  props: {
    skuEventBus: Object,
    sku: Object,
    selectedSku: Object,
    selectedSkuComb: Object,
    goods: Object
  },

  computed: {
    skuTree: function skuTree() {
      return this.sku.tree;
    },
    goodsImg: function goodsImg() {
      var s1Id = this.selectedSku.s1;
      var skuImg = this.getSkuImg(s1Id);
      // 优先使用选中sku的图片
      return skuImg || this.goods.picture;
    },
    price: function price() {
      if (this.selectedSkuComb) {
        return (this.selectedSkuComb.price / 100).toFixed(2);
      }
      // sku.price是一个格式化好的价格区间
      return this.sku.price;
    }
  },

  methods: {
    onCloseClicked: function onCloseClicked() {
      this.skuEventBus.$emit('sku:close');
    },
    getSkuImg: function getSkuImg(id) {
      if (!id) return;

      // 目前skuImg都挂载在skuTree中s1那类sku上
      var treeItem = this.skuTree.filter(function (treeItem) {
        return treeItem.k_s === 's1';
      })[0] || {};

      if (!treeItem.v) {
        return;
      }

      var matchedSku = treeItem.v.filter(function (skuValue) {
        return skuValue.id === id;
      })[0];
      if (matchedSku && matchedSku.imgUrl) {
        return matchedSku.imgUrl;
      }
    }
  }
};