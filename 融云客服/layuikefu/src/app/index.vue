<template>
  <div></div>
</template>
<script>
import mixin from './../vuex/mixin.js'
import upload from "./../upload.js"
import http from './../ajax.js'
export default {
    data(){
        return{
            shop_id:''
        }
    },
    methods:{
        GetRequest(type) { //获取参数，转化为对象
        var url = window.location.href;
        if(url.indexOf('#')<url.indexOf('?')){
          url = url.split('#')[1]
        }else{
          if(url.split('?').length - 1 > 1){ 
            url = url.split('#')[1]
          }else {
            url = url.split('#')[0]
          }
        }
         //alert(url)
        //获取url中"?"符后的字串
        var theRequest = new Object();
        var _type = typeof type == "undefined" ? "1" : "2";
        if (url.indexOf("?") > -1 && url.split("?").length>0) {
          var str = url.split("?")[1];
          var strs = str.split("&");
          for (var i = 0; i < strs.length; i++) {
            if (_type == 1) {
              theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            } else {

              theRequest[strs[i].split("=")[0]] = (unescape(strs[i].split("=")[1]));
            }
          }
        }

        return theRequest
      },
    },
  mounted(){
    var referrer = document.referrer;
      if(this.GetRequest(1).shop_id){
        localStorage.setItem('shop_id',this.GetRequest(1).shop_id)
        }
        if(this.GetRequest(1).shop_user_id){
        localStorage.setItem('shop_user_id',this.GetRequest(1).user_id)
        }
        this.shop_id=this.GetRequest(1).shop_id
        this.shop_user_id=this.GetRequest(1).user_id
      this.apiPost(this.khost+'/public/portal/Kf_api/getShopConfig',{shop_id:this.shop_id}).then((res)=>{
          if(res.code == 200){
              if(res.data == 1){
                  this.$router.push('/workerman_index')
              }
              if(res.data == 2){
                  this.$router.push('/rong_index')
              }
          }
      })
  },
  mixins: [mixin, http, upload]
}
</script>

