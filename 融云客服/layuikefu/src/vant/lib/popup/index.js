'use strict';

exports.__esModule = true;

var _popup = require('../mixins/popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition', { attrs: { "name": _vm.currentTransition } }, [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.value, expression: "value" }], staticClass: "van-popup", class: [_vm.position ? 'van-popup--' + _vm.position : ''] }, [_vm._t("default")], 2)]);
  },

  name: 'van-popup',

  mixins: [_popup2.default],

  props: {
    transition: String,
    overlay: {
      default: true
    },
    lockOnScroll: {
      default: false
    },
    closeOnClickOverlay: {
      default: true
    },
    position: {
      type: String,
      default: ''
    }
  },

  data: function data() {
    var transition = this.transition || (this.position === '' ? 'popup-fade' : 'popup-slide-' + this.position);
    return {
      currentValue: false,
      currentTransition: transition
    };
  },
  mounted: function mounted() {
    if (this.value) {
      this.open();
    }
  }
};