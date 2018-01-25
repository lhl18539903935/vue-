<template>
	<div>
		
 			<router-view   class='router-view'></router-view>
			 <lg-preview></lg-preview>
		
	</div>
</template>

<script type="es6">
import {  ViewBox} from 'vux'
import { mapState, mapActions } from 'vuex'
import mixin from './vuex/mixin.js'
import http from './ajax.js'
import "./assets/icon/iconfont.css"
import "./js/web_socket.js"
import "./emoji/jquery.qqFace.min.js"
import "./emoji/browser.js"
import "./emoji/qqFace.css"
window.mixins=mixin;
window.http=http;
export default {
	name:'app',
	components:{
	    ViewBox,
	},
	data(){
		return{
			footer:[],
			rank:'',
			kalendarvalue:false,
			status:false,
			demo3: 'TODAY',
			show:false,
			rank:true,
		}
	},
	beforeCreate(){
		
	},
	methods:{					
	},
	computed:{

		...mapState({
	      route: state => state.route,
	      path: state => state.route.path,
	      deviceready: state => state.app.deviceready,
	      demoTop: state => state.vux.demoScrollTop,
	      isLoading: state => state.vux.isLoading,
	      direction: state => state.vux.direction,
	      pageName: state => state.vux.pageName,
	      pageHeader: state => state.vux.pageHeader,
	      pageFooter: state => state.vux.pageFooter,
	      src: state => state.vux.src,
	      src1: state => state.vux.src1,
	      src2: state => state.vux.src2,
	      bg: state => state.vux.bg,
	    }),

	},
	
	mounted:function(){
	  
	},
	mixins:[mixin,http]

}
</script>
<style lang='less'>
@import "./layui/css/layui.css";
.router-view{
	overflow: hidden;
    border-radius: 3px;
}
// .router-view {
//     // margin: 20px auto;
//     // width: 800px;
//     // height: 600px;
// }
</style>
