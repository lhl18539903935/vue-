<template>
  <div  @click="offline_clear" id="obj" style="position:relative">
    <!--移动端-->
    <div class="roffline_mobile" v-show="offline_mobile_show">
      <div class="offline_mobile_head">
        <span v-show="offline_jump" style="position:absolute;" @click.stop="mobile_kefu_referrer"><i></i></span>
        <span>离线客服</span>
      </div>
      <div class="offline_mobile_content">
        <p>{{time}}</p>
        <p>温馨提示</p>
        <p> 当前客服不在线，请<span> 填写手机号</span> 提交问题 </p> <p style="width:50%;margin:0 auto;text-align:center">方便客服与您联系。</p>
      </div>
      <div class="offline_mobile_footer">
          <transition name="fade">
              <div v-show="offline_emoji" class="offline_mobile_list" style="">
                  <ul style="float:left;">
                      <li @click.stop="check_emoji(item,i)" style="float:left;padding:2px" v-for="(item,i) in listemoji" :key="i">{{item.emoji}}</li>
                  </ul>
              </div>                   
          </transition> 
          <div>
            <label class="layui-form-label">手机号</label>
              <div class="layui-input-inline">
             <input v-model="offline_mobile"  type="tel" class="" name="password" required lay-verify="required" placeholder="请输入手机号码，方便客服第一时间与您联系" autocomplete="off" class="layui-input offline_input">
          </div>
          <div class="offline_mobile_emoji">
            <!--<i class="layui-icon" @click.stop="offline_showemoji" style="font-size: 20px; ">&#xe60c;</i> -->
            <!--<i class="layui-icon" @click.stop="addFile" style="font-size: 20px; ">&#xe64a;</i>-->
            <img style="width:20px;margin:-4px 20px 0 20px;vertical-align:middle;"  @click.stop="offline_showemoji" src="../assets/face.png" alt="">
            <img width="20" @touchend="addPic" style="vertical-align:top;margin-top:4px" src="../assets/wenjian.png" alt=""> 
            <input id="d3"  type="file" @change="getimg($event)" style="display:none" name="" > 
          </div>
          <textarea @keyup.enter="enter" v-model="offline_content" class="offline_textarea" placeholder="请输入留言信息"></textarea>
          <button @click="send" class="layui-btn rt" style="margin-right:20px">发送</button>
      </div>
    </div>
    <!--pc端--> 
    </div>
     <div v-show="offline_pc_show" class="offline">  
       <div v-if="offline_status" class="offline_main">
         <div class="offline_maintop">
           <ul class="lf">
             <li>
                <!--<img src="../assets/kefu.png" alt="">-->
                <span class="offline_pic" style="">
                  <i style="color:#fff;font-size:26px" class="iconfont icon-kefu"></i>
                </span>
             </li>
             <li>
               <p>客服</p>
               <p>离线</p>
             </li>
             <li>
               <!--<i @click="offline_referrer" class="layui-icon">&#x1006;</i> -->
               <!-- <img   @click="offline_referrer" src="../assets/close.png" style="width:15px" alt=""> -->
             </li>
           </ul> 
         </div>
          <div class="offline_m-message" >
            <p>{{this.time}}</p>
            <p>&nbsp;&nbsp;&nbsp;温馨提示：当前客服不在线，请 <span>填写手机号</span> 提交问题，方便客服与您联系。</p>
          </div>
          <transition name="fade">
                <div v-show="offline_emoji" class="offline_emoji_list" style="">
                  <ul style="float:left;">
                      <li @click.stop="check_emoji(item,i)" style="float:left;padding:2px" v-for="(item,i) in listemoji" :key="i">{{item.emoji}}</li>
                  </ul>
              </div>                   
          </transition>  
          <div class="offline_m-text">
              <div class="offline_mobile"> 
                <span>手机号</span> 
                <input v-model="offline_mobile"  autofocus="autofocus" type="tel" placeholder="请输入手机号码，方便客服第一时间与您联系">
              </div>
              <div class="offline_face">
                <!--<i class="layui-icon" @click.stop="offline_showemoji" style="font-size: 30px;color:#E3E3E3;">&#xe60c;</i>  
                <i class="layui-icon" @click.stop="offline_addfile" style="font-size: 30px;color:#E3E3E3">&#xe61d;</i>-->
                <img style="width:20px;margin:0 20px;"  @click.stop="offline_showemoji" src="../assets/face.png" alt="">
                <img style="width:20px" @click.stop="offline_addfile" src="../assets/wenjian.png" alt="">
                <input id="d2"  type="file" @change="getimg($event)" style="display:none" name="" >   
                <!--<i class="layui-icon" style="font-size: 30px; ">&#xe60c;</i>  -->
              </div>
              <textarea @keyup.enter="enter" v-model="offline_content" autofocus="autofocus" placeholder="请输入留言信息" ></textarea>
              <button @click="send" class="layui-btn rt" style="margin:0 2rem 0 0;background-color:#4992F7!important;">发送</button>
          </div>
        </div>
      </div>
    </div> 

</template>
<script>
import { dateFormat} from 'vux'
import upload from "./../upload.js"
import mixin from './../vuex/mixin.js'
import http from './../ajax.js'
export default {
  components:{
    dateFormat 
  },
  data(){
    return{
      offline_mobile:'',
      offline_content:'',
      offline_status:true,
      time:'',
      offline_emoji:false,
      listemoji:[],
      offline_mobile_show:false,
      offline_pc_show:false,
      offline_jump:true
    }
  },
  methods:{
    offline_clear(){
      this.offline_emoji=false
    },
    check_emoji(item,i){
     this.offline_content+=item.symbol
    //  console.log(this.offline_content)
    },
    offline_showemoji(){
      this.offline_emoji=!this.offline_emoji
    },
    addFile: function addFile() {
      var vm = this;
      this.getPhotoAndUpload(function (ret) {
        if (ret.code = 200) {
          // vm.src= typeof ret.url!="undefined"? ret.url : vm.said;
         vm.offline_content = res.url;
            vm.clientleave()
            vm.offline_content=''
        }
      }, function (r) {
        //alert(JSON.stringify(r));
      });
    },
    addPic(){
      $('#d3').click();
    },
    offline_addfile(){
      var vm = this;
      $('#d2').click();
    },
    getimg: function getimg(e) {
      if(!this.offline_mobile){
        this.$vux.toast.show({
          text:"请输入手机号",
          type:'text',position:'middle'
        })
        return
      }
      if(!/^1[34578]\d{9}$/.test(this.offline_mobile)){
          this.$vux.toast.show({
              text: '请输入正确的手机号',
              type: "text",position:'middle'
        })
          return
      }
      var vm = this;
      var files = e.target.files[0];
      if (!/image\/\w+/.test(files.type)) {
        alert("请确保文件为图像类型");
        return false;
      }
      var reader = new FileReader();
      reader.onload = function () {
        var data = reader.result;
        var data1 = data.replace(/\+/g, "%2B");
        var data2 = data1.replace(/\&/g, "%26");
        vm.apiPost('http://chat.huileyi.com/public/portal/Kf_api/saveBase64Image', { tp: data2 }).then(function (res) {
          if (res.code == 200) {
            // vm.sendurl=res.url.substring(17,res.url.length)//发送图片url
            vm.offline_content = res.url;
            vm.clientleave()
            vm.offline_content=''
          }
        });
      };
      reader.readAsDataURL(files);
    },
    enter: function enter() {
      if(!this.offline_mobile){
        this.$vux.toast.show({
          text:"请输入手机号",
          type:'text',position:'middle'
        })
        return
      }
      if(!/^1[34578]\d{9}$/.test(this.offline_mobile)){
          this.$vux.toast.show({
              text: '请输入正确的手机号',
              type: "text",position:'middle'
        })
          return
      }
      if(!this.offline_content){
        this.$vux.toast.show({
          text:'请输入留言信息',
          type:'text',
          position:'middle'
        })
        return
      }else{
        this.clientleave()
      }
    },
    send(){
      if(!this.offline_mobile){
        this.$vux.toast.show({
          text:"请输入手机号",
          type:'text',position:'middle'
        })
        return
      }
      if(!/^1[34578]\d{9}$/.test(this.offline_mobile)){
          this.$vux.toast.show({
              text: '请输入正确的手机号',
              type: "text",position:'middle'
        })
          return
      }
      if(!this.offline_content){
        this.$vux.toast.show({
          text:'请输入留言信息',
          type:'text',
          position:'middle'
        })
        return
      }else{
        this.clientleave()
      }
    },
    clientleave(){
       let vm=this
        this.apiPost(this.khost+'/public/portal/Kf_api/clientLeave',{phone:this.offline_mobile,user_id:localStorage.getItem('id'),leave_content:this.offline_content,shop_id:localStorage.getItem('shop_id')}).then((res)=>{
            if(res.code == 200){
              this.$vux.toast.show({
                text:"提交成功",
                type:'text',
                position:'middle'
              })
              this.offline_mobile=''
              this.offline_content=''
            }else{
              this.$vux.toast.show({
                text:res.msg,
                type:'text',
                position:'middle'
              })
            }
        })
     },
    offline_referrer(){
       this.referrer = document.referrer;
      //  console.log(this.referrer )
       let URLRexExp = /^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
       if(!this.referrer || !URLRexExp.test(this.referrer)){
        // this.offline_status=false
         location.href=this.referrer 
       }
     },
    gettime(){
        this.time=dateFormat(new Date(), ' HH:mm:ss')
    },
          // 判断是手机端还是pc端 true则说明是电脑客户端，如果是false，则说明使用的是移动客户端
    navigator: function (_navigator) {
      function navigator() {
        return _navigator.apply(this, arguments);
      }

      navigator.toString = function () {
        return _navigator.toString();
      };

      return navigator;
    }(function () {
      var vm = this;
      var userAgentInfo = navigator.userAgent;
      var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
      var flag = true;
      vm.offline_pc_show=true
      vm.offline_mobile_show=false
      vm.network=''
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          vm.offline_mobile_show=true
           vm.offline_pc_show=false
          break;
        }
      }
      return flag;
    }),
    mobile_kefu_referrer(){
          window.close()
      },
  },
  mounted(){
      this.gettime()
      this.navigator()
      this.mobile_kefu_referrer()
      RongIMLib.RongIMEmoji.init();
      this.listemoji = RongIMLib.RongIMEmoji.list;
      var mouseDownX,mouseDownY,initX,initY,flag = false;
         var obj=document.getElementById('obj')  
         obj.onmousedown = function(e) {  
            //鼠标按下时的鼠标所在的X，Y坐标  
            mouseDownX = e.pageX;  
            mouseDownY = e.pageY;  
        
            //初始位置的X，Y 坐标  
            initX = obj.offsetLeft;  
            initY = obj.offsetTop;  
        
            //表示鼠标已按下  
            flag = true;  
        }  
        obj.onmousemove = function(e) {  
            // 确保鼠标已按下  
            if(flag) {  
                var mouseMoveX = e.pageX,mouseMoveY = e.pageY;  
                this.style.left = parseInt(mouseMoveX) - parseInt(mouseDownX) + parseInt(initX) + "px";  
                this.style.top = parseInt(mouseMoveY) - parseInt(mouseDownY) + parseInt(initY) + "px";  
            }  
            
        }  
        obj.onmouseup = function() {  
            //标识已松开鼠标  
            flag = false;  
        }  
    },
  mixins:[mixin,http,upload]
}
</script>
<style scoped>
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
      opacity: 0
    }
  .lf{
    float:left;
  }
  .rt{
    float:right;
  }
  .offline_pic{
    background-color:#4992F7;
    margin-top:10px;
    width:40px;
    height:40px;
    display:inline-block;
    line-height:40px;
    border-radius:50%;
  }
  .offline{
    width:800px;
    height:600px;
    margin-left:25%;
    margin-top:10%;
    border:1px solid #D9D9D9;
    box-shadow:0px 0px  1px 1px #aaa;
  }
  .offline_maintop{
    width:100%;
    height:60px;
    border-bottom:1px solid #E3E3E3;
  }
  .offline_maintop>ul {
    width:100%;
  }
  .offline_maintop>ul li{
    float:left;
  }
  .offline_maintop>ul li:nth-child(1){
    width:10%;
    line-height: 60px;
    text-align: center
  }
  .offline_maintop>ul li:nth-child(1) img{
    width:40px;
    background-color: #4891F7;
    border-radius:50%;
  }
  .offline_maintop>ul li:nth-child(2){
    width:80%;
    height:40px;
    line-height: 20px;
    margin-top:10px;
  }
  .offline_maintop>ul li:nth-child(2) p:nth-child(1){
    font-size: 16px;
    font-weight: 600;
    color:#9D9D9D ;
    margin:2px 0;
  }
  .offline_maintop>ul li:nth-child(2) p:nth-child(2){
    font-size: 12px;
    color:#D4D4D4;
    font-weight: bold ;
  }
  .offline_maintop>ul li:nth-child(2) p:nth-child(2):before{
    content: '';
    display: inline-block;
    width:7px;
    height:7px;
    background-color:#D4D4D4;
    border-radius:50%;
    margin-right:5px
  }
  .offline_maintop>ul li:nth-child(3){
    width: 5%;
    line-height: 30px;
    text-align: center;
    float: right;
  }
  .offline_maintop>ul li:nth-child(3):hover{
    background-color: #e4393c;
    color:#fff;
  }
  .offline_maintop>ul li:nth-child(3) img{
    width:15px;
  }
  .offline_main {
     height: 100%;   
  }
  .offline_main {
      position: relative;
      overflow: hidden;   
      background-color: #eee;
  }
  .offline_m-text {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
  }
  .offline_m-text .offline_mobile{
    width:100%;
    margin:1rem auto;
    background-color: #fff;
    position: absolute;
  }
  .offline_m-text .offline_mobile>span{
    width:15%;
    text-align: center;
    display: inline-block;
    color:#BFBEBE;
    font-family: "Micrsofot Yahei";
  }
   .offline_m-text .offline_mobile input{
     width:50% ;
     border:0;
     outline:none;
     
   }
  .offline_m-message {
      height:'calc(100% - 160px)';
      width:100%;
  }
  .offline_m-message p:nth-child(1){
    width:8%;
    padding:3px 3px;
    margin:2rem auto; 
    background-color: #DCDCDC ;
    text-align: center ;
    color:#fff;
    border-radius:3px;  
  }
  .offline_m-message p:nth-child(2){
    background-color: #DCDCDC ;
    width:61%;
    text-align: center ;
    padding:3px 0;
    margin:0 auto ;
    border-radius: 3px;
    color:#7E7E7E
  }
  .offline_m-message p:nth-child(2) span{
    color:#4791F7
  }
    .offline_m-card {
        padding: 12px;
        border-bottom: solid 1px #24272C;
    }
    .offline_face{
      position: absolute;
      width: 90%;
      margin: 3.5rem auto;
      left:4%
    }
    .offline_m-text {
        height: 230px;
        border-top: solid 1px #ddd;
        background-color: #fff;
        padding-bottom:2rem
    } 
    textarea {
      padding: 10px;
      height: 50%;
      width: 90%;
      border: none;
      outline: none;
      font-family: "Micrsofot Yahei";
      resize: none;
      margin-top:10% ;
      margin-left:4%;
    }
    .offline_emoji_list{
      width:50%;
      background-color: #fff;
      height:200px;
      padding:5px 10px;
      margin-bottom:10px;
      position: absolute;
      top:164px;
      left:5px;
      border-radius:3px;
    }
    .offline_face i:hover{
      color:#4791F7!important
    }


    /*移动端*/
    .roffline_mobile{
      width:100%;
      height:100%;
      position: fixed;
    }
    .offline_mobile_head{
      width:100%;
      height:50px;
      line-height:50px;
      background-color: #36373C;
    }
    .offline_mobile_head span:nth-child(1){
      height:100%;
      width:20%;;
      display:inline-block;
      text-align: center
    }
    .offline_mobile_head span:nth-child(1) i{
      width:13px;
      height:13px;
      display:inline-block;
      border-top:2px solid #fff;
      border-left:2px solid #fff;
      transform: rotate(-45deg)
    }
    .offline_mobile_head span:nth-child(2){
      height:100%;
      display:inline-block;
      font-size: 16px ;
      color:#fff;
      width:100%;
      text-align: center
    }
    .offline_mobile_content{
      width:100%;
      height:70%;
      background-color: #fff;
      padding-top:2rem ;
      border-bottom:1px solid #FEFEFE;
      position: relative;
    }
    .offline_mobile_content p:nth-child(1){
      width:20%;
      margin:0 auto;
      background-color: #DCDCDC ;
      text-align: center ;
      padding:5px;
      border-radius:3px;
      color:#fff
    }
    .offline_mobile_content p:nth-child(2){
      width:20%;
      margin:1rem auto;
      text-align: center ;
      border-radius:3px;
      font-weight: bold ;
    }
    .offline_mobile_content p:nth-child(3){
      width:80%;
      text-align: center ;
      margin: 0 auto;
      color:#707070
    }
    .offline_mobile_content p:nth-child(3) span{
      color:#4791F7;
    }
    .offline_textarea{
          padding: 10px;
          height: 20%;
          width: 90%;
          border: none;
          outline: none;
          font-family: "Micrsofot Yahei";
          resize: none;
          margin: 0;
          margin-left: 4%;
    }
    .offline_mobile_footer{
      background-color: #fff;
      position: absolute;
      bottom:0;
      padding-bottom:1rem
    }
    .offline_input{
      width:165%!important;
      height:30px!important;
      margin-top:4px;
      border:0;
      padding-left: 0!important
    }
    .layui-form-label{
      padding:9px 5px !important;
      width:80px;
      text-align: center ;

    }
    .offline_mobile_emoji{
      height:30px;
      line-height: 30px;
      width:100%;
      float:left;
      padding:5px 13px;
       border-top:1px solid #FEFEFE
    }
    .offline_mobile_list{
    width: 90%;
    background-color: #fff;
    height: 240px;
    padding: 5px 10px;
    margin-bottom: 10px;
    position: absolute;
    top: -240px;
    left: 5px;
    border-radius: 3px;
    z-index: 1000 ;
    /*border:1px solid #eee;*/
    }
    @media screen and (max-width:375px){
         .offline_mobile_list{
                top:-280px!important;
            }
     }
</style>

