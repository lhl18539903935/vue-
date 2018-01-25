<template>
  <div @click="clear" style="position:relative" id="obj">
      <!--pc页面-->
    <div class="lhl_pc" v-show="pc_show_status" >
        <div class="main">
            <div class="main_top" style="height:60px;width:100%;background-color:#EEEEEE;border-bottom:1px solid #ddd; z-index:1000 ">
                <span style="width:10%;text-align:center;line-height:60px;margin-left:1rem">
                    <img  width="40" height="40" :src="kf_pic">
                    <!--<span v-if="!youheadpic" style="background-color:#009688;margin-top:10px;width:40px;height:40px;display:inline-block;line-height:40px;border-radius:50%;">
                        <i style="color:#fff;font-size:26px"  class="iconfont icon-kefu"></i>
                    </span>-->
                    <p class="name" style="font-weight:bold">{{kf_name}}</p>
                </span>
                <span @click="pc_model" class="close rt" style="width:5%;text-align:center;line-height:30px;cursor:pointer">X</span>
            </div>
            <div class="rm-message" id="d1">
                <!--消息推送-->
                <div style="width:80%;margin:0 auto 4rem;word-break: break-all;text-align:center" v-html="massage_title"></div>
                <ul>
                    <li v-for="(item,i) in tell_list" :key="i">
                        <div v-show="item.youtell.youstatus">
                            <p class="time"><span>{{item.youtell.youtime}}</span></p>
                            <div class="main">
                                <img class="avatar lf" width="30" height="30" :src="kf_pic" />
                                <div class="text">
                                    {{item.youtell.youtext}}
                                    <img style="max-width:300px;max-height:100px;" @click.stop="get_url(item.youtell.youlink)" :src="item.youtell.youlink" alt="">
                                </div>
                            </div>
                        </div>
                        <div v-show="item.meantell.meanstatus">
                            <p class="time"><span>{{item.meantell.meantime}}</span></p>
                            <div class="main self">
                                <img class="avatar_rt rt" width="30" height="30" :src="rong_pic?rong_pic:headpic" />
                                <div class="text_rt"><i></i>{{item.meantell.meantext}}
                                 <img @click.stop="get_url(item.meantell.meanlink)" class="rt" style="max-width:300px;max-height:100px;" :src="item.meantell.meanlink" alt="">
                                 </div>
                            </div>                            
                        </div>    
                    </li>       
                </ul>
            </div> 
            <div class="m-text">
                    <transition name="fade">
                        <div v-show="emoji" class="lhl_emoji_list" style="">
                            <ul style="float:left;">
                                <li @click.stop="check_emoji(item,i)" style="float:left;padding:2px" v-for="(item,i) in listemoji" :key="i">{{item.emoji}}</li>
                            </ul>
                             <i class="bottom_jiantou"></i>
                        </div>                   
                    </transition> 
                <div style="background:#fff;width:100%;">
                    <div style="width:100%;margin:0 auto;padding-top:10px;">
                        <img style="width:20px;margin:0 20px;"  @click.stop="show_emoji" src="../assets/face.png" alt="">
                        <img style="width:20px" @click.stop="pc_addfile" src="../assets/wenjian.png" alt="">
                        <input id="d2"  type="file" @change="getimg($event)" style="display:none" name="" > 
                    </div>
                </div>
                <textarea v-model="text_list" placeholder="" @keyup.enter="enter"></textarea>
                <button class="lhlbtn layui-bg-green" @click="send_msg">发送</button>
            </div>
        </div>
        <div class="pc_model" v-show="pc_model_status">
            <div class="pc_model_content">
                <div style="width:100%;margin:0.8rem auto;border-bottom:1px solid #ddd;padding:0.8rem">
                    <span style="display:inline-block;width:60%;color:#A7A7A7;">即将结束本次对话</span>
                    <span  @click.stop="pc_kefu_referrer" style="display:inline-block;width:20%;color:#19CAA6;text-align:right;cursor:pointer">立即结束</span>
                    <span @click="pc_cancel" style="display:inline-block;width:10%;text-align:right;color:#19CAA6;cursor:pointer">取消</span>
                </div>
                <p style="width:90%;margin:0.5rem auto;text-align:center">{{kf_title}}</p>
                <div style="width:90%;margin:1rem auto;text-align:center">
                    <label for="d1" v-for="(item,i) in label_list" :key="i">
                       <input name="d1" type="radio" @click="choice_radio(i)">{{item.content}} 
                    </label>    
                </div>
                <div style="width:80%;margin:0 auto;">
                    <span
                     style="display:inline-block;width:40%;border:1px solid #E6E6E6;text-align:center;margin:0.5rem 2.5% 0.5rem 6%;padding:3px;cursor:pointer"
                      v-for="(item,i) in server_list" :key="i" :class="stutes==i?'bg_green':''" @click="choose(i)">{{item.title}}</span>
                </div>
                <div style="width:70%;height:100px;margin:1rem auto;">
                    <textarea v-model="agrent_content" style="width:100%;height:100px;border:1px solid #A9A9A9;margin:1rem auto;"></textarea>
                </div>
                <div style="width:70%;margin:1rem auto;text-align:center">
                     <button style="width:30%;margin:1rem auto;" @click="gradeSubmit" class="layui-btn layui-btn-sm">提交评价</button>
                </div>
            </div>
        </div>
        <div class="img_big" v-show="show_big_img">
            <div >
                <img style="position:absolute;top:0;left:0;bottom:0;right:0;margin:auto" :src="big_url" alt="">
            </div>
        </div>
    </div>
    <!--移动页面-->
    <div class="lhl_mobile" v-show="mobile_show_status">
        <div class="mobile_header">
            <span @click="goback" style="width:20%;display: inline-block;">
                <span></span>
            </span>   
            <span>{{kf_name}}</span>
        </div>
        <div class="rmobile_main"  id="d1" ref="xavier">
            <div style="width:80%;margin:1rem auto;word-break: break-all;text-align:center" v-html="massage_title"></div>
            <ul>
                <li v-for="(item,i) in tell_list" :key="i">                   
                    <div class="lhl_mean lf" style="clear:both;width:100%;"  v-show="item.youtell.youstatus">
                        <p>{{item.youtell.youtime}}</p>
                        <div >
                            <img class="lf" style="clear:both;margin:0 20px 0 20px;border-radius:50%;" width="40" height="40px" :src="kf_pic" alt="">
                            <span>{{youname}}</span> 
                             <p  class="mean_p">
                              {{item.youtell.youtext}}
                              <img @click.stop="get_url(item.youtell.youlink)" style="max-width:300px;max-height:100px;" :src="item.youtell.youlink" alt="">
                             </p>
                        </div>    
                    </div>
                    <div class="lhl_you rt" style="clear:both;width:100%;text-align:right;" v-show="item.meantell.meanstatus">
                        <p>{{item.meantell.meantime}}</p>
                        <div >
                            <img v-if="rong_pic" style="float:right;clear:both;margin:0 20px 0 20px;border-radius:50%;" width="40" height="40px" :src="rong_pic" alt="">
                            <span v-if="!rong_pic" style="background-color:#009688;margin-top:10px;width:40px;height:40px;display:inline-block;line-height:40px;border-radius:50%;">
                                <i style="color:#fff;font-size:26px"  class="iconfont icon-kefu"></i>
                            </span>
                            <span>{{name}}</span>
                            <p class="you_p rt" style="">
                                <i></i>
                                {{item.meantell.meantext}}
                                <img @click.stop="get_url(item.meantell.meanlink)" style="max-width:300px;max-height:100px;" :src="item.meantell.meanlink" alt="">
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="mobile_footer layui-container">
            <div class="layui-row">
                <textarea v-model="text_list" class=" pho_text"></textarea>
                <button v-show="layui_btn" class="layui-btn layui-col-md3" 
                style="height:40px!important;line-height:40px!important;padding: 0 20px!important;margin-left:4px!important;background-color:#D2D2D2!important">发送</button>
                <button @click="send_msg" v-show="!layui_btn" class="layui-btn layui-col-md3" style="height:40px!important;line-height:40px!important;padding: 0 20px!important;margin-left:4px!important">发送</button>
            </div>
            <transition name="fade">
                <div class="feel_list" v-show="mobile_emoji" style="position:absolute;top:-245px;width:100%;">
                    <ul style="float:left;width:90%;padding:3px 5px;background-color:#fff;">
                        <li  @click.stop="check_emoji(item,i)" style="float:left;height:30px;line-height:30px;border-radius:3px;" v-for="(item,i) in listemoji" :key="i">{{item.emoji}}</li>
                    </ul>
                    <i class="bottom_jiantou"></i>
                </div>           
            </transition> 
           <div style="background:#EEEEEE;width:100%;">
                    <div style="width:95%;height:38px;line-height:38px;margin-top:3px">
                        <img style="width:20px;margin:0 20px;"  @click.stop="phone_emoji" src="../assets/face.png" alt="">
                        <img style="width:20px"  @touchend="addPic" src="../assets/wenjian.png" alt="">
                           <input id="d3"  type="file" @change="getimg($event)" style="display:none" name="" > 
                    </div>
                </div>
        </div>
        <div class="phone_model" v-show="phone_model_status">
            <div class="phone_model_content">
                <div style="width:100%;margin:0.8rem auto;border-bottom:1px solid #ddd;padding:0.8rem">
                    <span style="display:inline-block;width:50%;color:#A7A7A7">即将结束本次对话</span>
                    <span @click.stop="kefu_referrer" style="display:inline-block;width:25%;color:#19CAA6;text-align:right;">立即结束</span>
                    <span @click="phone_cancel" style="display:inline-block;width:15%;text-align:right;color:#19CAA6;cursor:pointer">取消</span>
                </div>
                <p style="width:100%;margin:0.5rem auto;text-align:center">{{kf_title}}</p>
                <div style="width:90%;margin:1rem auto;text-align:center">
                    <label for="" v-for="(item,i) in label_list" :key="i">
                       <input name="d1" type="radio" @click="choice_radio(i)">{{item.content}} 
                    </label>
        
                </div>
                <div style="width:80%;margin:0 auto;">
                    <span 
                    style="display:inline-block;width:40%;border:1px solid #E6E6E6;text-align:center;margin:0.5rem 2.5% 0.5rem 6%;padding:3px;"
                     :class="stutes==i?'bg_green':''" @click="choose(i)" v-for="(item,i) in server_list" :key="i">{{item.title}}</span>
                </div>
                <div style="width:70%;height:100px;margin:1rem auto;">
                    <textarea v-model="agrent_content" style="width:100%;height:100px;border:1px solid #A9A9A9;margin:1rem auto;"></textarea>
                </div>
                <div style="width:70%;margin:1rem auto;text-align:center">
                     <button @click="gradeSubmit" style="width:30%;margin:1rem auto;" class="layui-btn layui-btn-sm">提交评价</button>
                </div>
            </div>
        </div>
        <div class="phone_img_big" v-show="show_big_img">
            <div >
                <img style="position:absolute;top:0;left:0;bottom:0;right:0;margin:auto;width:100%;" :src="big_url" alt="">
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import { dateFormat,XDialog, TransferDomDirective as TransferDom } from 'vux'
import upload from "./../upload.js"
import mixin from './../vuex/mixin.js'
import http from './../ajax.js'
export default {
 directives: {
    TransferDom
  },
  components: {
    XDialog,
  },
  data(){
      return{
          listemoji:[],//表情列表
          emoji:false,//pc
          mobile_emoji:false,//mobile
          pc_show_status:false,//判断是pc还是移动
          mobile_show_status:false,//判断是pc还是移动
          pc_model_status:false,//pc评价
          phone_model_status:false,//移动评价
          text_list:'',//测试
          massage_title:'',//推送消息
          time:'',
          name:"",
          layui_btn:true,
          youheadpic:'',
          headpic:require('../assets/a3.jpg'),
          meanlink:'',//发送图片的链接
          youlink:'',//接收图片的链接
          meanstatus:true,
          youstatus:true,
          kf_name:'',
          stutes:-1,
          big_url:'',//放大图片的路经
          show_big_img:false,
          kf_title:'',
          shop_id:'',
          shop_user_id:'',
          kf_pic:'',
          youname:'',
          rong_pic:'',
          referrer:'',
          URLRexExp:'',
          radio_content:'',
          bgrade_content:"",
          agrent_content:'',
          label_list:[
              {content:""},{content:""},{content:""},{content:""},{content:""},
          ],
          tell_list:[{
              meantell:{meantime:'12:00',meantext:'qsd', meanstatus: false },
              youtell:{ youtime:'12:00',youtext:'', youstatus: false }
          }],//对话list
          server_list:[
              {title:'服务非常好'},{title:'业务熟练'},{title:'技术精湛'},{title:'态度友好'},{title:'响应很快'},{title:'其他因素'},
          ]
      }
  },
  methods:{
      goback(){
        this.phone_model_status=true
        this.kfGradeSetGet()
      },
      clear(){
          this.show_big_img=false
          this.emoji=false
          this.mobile_emoji=false
      },
      choose(i){
          this.stutes=i
          this.bgrade_content=i
      },
    //   发送信息
    send_msg(){
        var vm = this;
        if (!vm.text_list){
            this.$vux.toast.show({
                text:"不能发送空白消息",
                type:'text',position:'middle'
            })
            return;
        } 
        this.gettime();
        vm.TextMessage();
        this.tell_list.push({
            meantell:{meantime:this.time,meantext:RongIMLib.RongIMEmoji.symbolToEmoji(this.text_list),meanstatus: true },
            youtell:{youstatus: false }
        })
        vm.add();
        this.text_list=''
    },
    // 回车发送信息
    enter: function enter() {
      var vm = this;
        if (!vm.text_list){
            this.$vux.toast.show({
                text:"不能发送空白消息",
                type:'text',position:'middle'
            })
            return;
        } 
        this.gettime();
        vm.TextMessage();
        this.tell_list.push({
            meantell:{meantime:this.time,meantext:RongIMLib.RongIMEmoji.symbolToEmoji(this.text_list),meanstatus: true },
            youtell:{youstatus: false }
        })
        vm.add();
        this.text_list=''
    },
    // 选择表情
    check_emoji(item,i){
        this.text_list+=item.symbol
    },
    //   pc表情
     show_emoji(){
         this.emoji = !this.emoji
     },
     //移动表情
     phone_emoji(){
         this.mobile_emoji = !this.mobile_emoji
     },
     //pc评价页面
     pc_model(){
         this.pc_model_status=true
         this.kfGradeSetGet()
     },
    //  取消评价弹框
     pc_cancel(){
         this.pc_model_status=false
     },
     phone_cancel(){
         this.phone_model_status=false
     },
     addPic(){
         $('#d3').click();
     },
     //pc选择图片
     pc_addfile: function pcaddfile() {
      var vm = this;
      $('#d2').click();
    },
    getimg: function getimg(e) {
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
        vm.apiPost(vm.khost+'/public/portal/Kf_api/saveBase64Image', { tp: data2 }).then(function (res) {
          if (res.code == 200) {
            // vm.sendurl=res.url.substring(17,res.url.length)//发送图片url
            vm.sendurl = res.url;
            vm.sendImageMessage(); //发送图片 
            vm.gettime();
            vm.tell_list.push({
                meantell:{meanlink: res.url,meantime:vm.time,meanstatus: true },
                youtell:{youstatus: false }
            })
          }
        });
      };
      reader.readAsDataURL(files);
    },
    get_url(url){
        this.show_big_img=true
        this.big_url=url
    },
    addFile: function addFile() {
      var vm = this;
      this.getPhotoAndUpload(function (ret) {
        if (ret.code = 200) {
          // vm.src= typeof ret.url!="undefined"? ret.url : vm.said;
          vm.sendurl = ret.url;
          vm.sendImageMessage();
          vm.gettime();
          vm.tell_list.push({
            meantell:{meanlink: ret.url,meantime:vm.time,meanstatus: true },
            youtell:{youstatus: false }
        })
          // vm.mysaid.push({mysaid:vm.said,myheadpic:require('./ph4690-p00003.jpg'),useid:1})
        }
      }, function (r) {
        //alert(JSON.stringify(r));
      });
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
      vm.pc_show_status=true
       vm.mobile_show_status=false
       vm.add()
      vm.network=''
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          vm.mobile_show_status=true
           vm.pc_show_status=false
           vm.phone_ref()
          break;
        }
      }
      return flag;
    }),
        // 连接服务器
    connect: function connect() {
      var vm = this;
      var token= localStorage.getItem('token');
    //   var token = 'NIuul9mrwvMh0XXNcxfH7Fnfk/gJVBJ5Yhcb7htzRoOdUeOAX498kwEQSkfIICsOsLfSs/LMWTZwOB2YlBaTvA==';
      var appKey=localStorage.getItem('app_key');
    //   var appKey = 'bmdehs6pb1w8s';
      var config = {
        protobuf: "//cdn.ronghub.com/protobuf-2.3.0.min.js"
      };
      RongIMLib.RongIMClient.init(appKey, null, config);
      var instance = RongIMClient.getInstance();
      // AppKey 和 token，初始化代码：
      // 必须设置监听器后，再连接融云服务器
      RongIMClient.setConnectionStatusListener({
        onChanged: function onChanged(status) {
          switch (status) {
            case RongIMLib.ConnectionStatus.CONNECTED:
              console.log("链接成功");
              break;
            case RongIMLib.ConnectionStatus.CONNECTING:
              console.log("正在链接");
              break;
            case RongIMLib.ConnectionStatus.DISCONNECTED:
              vm.reconnect();
              console.log("断开链接");
              break;
            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
              console.log("其他设备登录");
              break;
            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
              console.log("网络不可用");
              vm.reconnect();
              break;
          }
        }
      });
      // 消息监听器
      RongIMClient.setOnReceiveMessageListener({
        // 接收到的消息
        onReceived: function onReceived(message) {
          // 判断消息类型
          switch (message.messageType) {
            case RongIMClient.MessageType.TextMessage:
              // message.content.content => 消息内容
              var sentTime = dateFormat(message.sentTime, 'HH:mm:ss');
            //   vm.youname=message.content.user.name
                vm.tell_list.push({
                    youtell:{youtext:RongIMLib.RongIMEmoji.symbolToEmoji(message.content.content),youname:message.content.user.name, youlink: vm.imageUri ,youtime:sentTime,youstatus:true },
                    meantell:{meanstatus: false }
                })
              vm.navigator()
              break;
            case RongIMClient.MessageType.VoiceMessage:
              // 对声音进行预加载                
              // message.content.content 格式为 AMR 格式的 base64 码
              break;
            case RongIMClient.MessageType.ImageMessage:
                  var sentTime = dateFormat(message.sentTime, 'HH:mm:ss');
                    vm.tell_list.push({
                      youtell: { youlink: message.content.imageUri,youtime:sentTime,youname:message.content.user.name, youstatus: true },
                      meantell: { meanstatus: false }
                    });
                    //   vm.add()
                    vm.navigator()
              break;
            case RongIMClient.MessageType.DiscussionNotificationMessage:
              // message.content.extension => 讨论组中的人员。
              break;
            case RongIMClient.MessageType.LocationMessage:
              // message.content.latiude => 纬度。
              // message.content.longitude => 经度。
              // message.content.content => 位置图片 base64。
              break;
            case RongIMClient.MessageType.RichContentMessage:
              // message.content.content => 文本消息内容。
              // message.content.imageUri => 图片 base64。
              // message.content.url => 原图 URL。
              break;
            case RongIMClient.MessageType.InformationNotificationMessage:
              // do something...
              break;
            case RongIMClient.MessageType.ContactNotificationMessage:
              // do something...
              break;
            case RongIMClient.MessageType.ProfileNotificationMessage:
              // do something...
              break;
            case RongIMClient.MessageType.CommandNotificationMessage:
              // do something...
              break;
            case RongIMClient.MessageType.CommandMessage:
              // do something...
              break;
            case RongIMClient.MessageType.UnknownMessage:
              // do something...
              break;
            default:
            // do something...
          }
        }
      });
      //开始链接
      let userId=localStorage.getItem('userId')
    //   var userId = '1';
      RongIMClient.connect(token, {
        onSuccess: function onSuccess(userId) {
          //链接成功后 才可 发送消息 
          console.log('开始链接的token:' + token, userId);
          console.log('链接成功，用户id：' + userId);
          // vm.TextMessage()
          vm.tification()//获取推送消息
        },
        onTokenIncorrect: function onTokenIncorrect() {
          console.log('token无效');
          vm.reconnect();
        },
        onError: function onError(errorCode) {
          var info = '';
          switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
              info = '超时';
              vm.reconnect();
              break;
            case RongIMLib.ErrorCode.UNKNOWN_ERROR:
              info = '未知错误';
              vm.reconnect();
              break;
            case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
              info = '不可接受的协议版本';
              vm.reconnect();
              break;
            case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
              info = 'appkey不正确';
              vm.reconnect();
              break;
            case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
              info = '服务器不可用';
              vm.reconnect();
              break;
          }
          console.log(errorCode);
        }
      });
    },
        //	1: reconnect 是重新连接，并没有重连机制，调用此方法前应该进行网络嗅探，网络正常再调用 reconnect。
    reconnect: function reconnect() {
      var start = new Date().getTime();
      var userId=localStorage.getItem('userId')
      var begin = new Date().getTime();
    //   let userId='1'
      RongIMClient.reconnect({
        onSuccess: function onSuccess(userId) {
          showTips("重新链接成功，用户id：" + userId + "; " + getTimer(begin));
          showResult("重新链接 成功", userId, start);
        },
        onTokenIncorrect: function onTokenIncorrect() {
          //console.log('token无效');
          showResult("重新链接 失败", "token无效", start);
        },
        onError: function onError(errorCode) {
          var info = '';
          switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
              info = '超时';
              break;
            case RongIMLib.ErrorCode.UNKNOWN_ERROR:
              info = '未知错误';
              break;
            case RongIMLib.ErrorCode.UNACCEPTABLE_PROTOCOL_VERSION:
              info = '不可接受的协议版本';
              break;
            case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
              info = 'appkey不正确';
              break;
            case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
              info = '服务器不可用';
              break;
          }
          showTips(info);
          showResult("重新链接 失败", info, start);
        }
      });
    },
        // 发送消息
    TextMessage: function TextMessage() {
      var vm = this;
      var msg = new RongIMLib.TextMessage({ content: RongIMLib.RongIMEmoji.emojiToSymbol(this.text_list), user: { name: localStorage.getItem('user_name'), icon: vm.rong_pic }, extra: "附加信息" });
      var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
      var targetId =localStorage.getItem('kf_id') // 目标 Id
    //   var targetId = '2';
      console.log('发送消息' + targetId, this.text_list);
      // var instance = RongIMClient.getInstance();
      RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
        onSuccess: function onSuccess(message) {
          //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
        //   console.log(message)
        //   console.log("发送成功");
        //   vm.add();
        vm.navigator()
        },
        onError: function onError(errorCode, message) {
          var info = '';
          switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
              info = '超时';
              vm.reconnect();
              break;
          }
        //   console.log('发送失败:' + info);
        }
      });
    },
     // 发送图片
    //获取base64假数据方法
    getBase64Image: function getBase64Image() {
      var canvas = document.createElement("canvas");
      canvas.width = 100;
      canvas.height = 100;
      var context = canvas.getContext("2d");
      context.font = "20pt Arial";
      context.fillStyle = "blue";
      context.fillText("RongCloud.cn", 10, 20);
      var content = canvas.toDataURL("image/jpeg");
      content = content.replace("data:image/jpeg;base64,", "");
      return content;
    },
    sendImageMessage: function sendImageMessage() {
      /*
      文档：http://www.rongcloud.cn/docs/api/js/ImageMessage.html
       需自行解决文件上传
      上传插件（含获取缩略图方法）: https://github.com/rongcloud/rongcloud-web-im-upload
      
      缩略图必须是base64码的jpg图，而且不带前缀"data:image/jpeg;base64,"，不得超过100K
      压缩：https://github.com/rongcloud/rongcloud-web-im-upload/blob/master/resize.html
      */
      var vm = this;
      var content = {
        imageUri: vm.sendurl,
        user: { name: localStorage.getItem('user_name'), icon:vm.rong_pic   },
        content: vm.getBase64Image()
      };
      var targetId = localStorage.getItem('kf_id');
    //   var targetId='2'
      var msg = new RongIMLib.ImageMessage(content);
      var start = new Date().getTime();
      var conversationType = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
      RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
        onSuccess: function onSuccess(message) {
          // markMessage(message);
          console.log("发送图片消息 成功", message, start);
        //   vm.add();
        vm.navigator()
        },
        onError: function onError(errorCode, message) {
          console.log("发送图片消息 失败", message, start);
        }
      });
    },
    
    // Emoji 转名称
    emojiname: function emojiname() {
      var vm = this;
      var message = vm.said;
      // 将 message 中的原生 Emoji 转化为对应名称
      vm.said = RongIMLib.RongIMEmoji.emojiToSymbol(message);
    //   console.log(RongIMLib.RongIMEmoji.emojiToSymbol(message));
      // => "[笑嘻嘻][露齿而笑]测试 Emoji"
    },

    // Emoji 转 HTML
    emojiHTML: function emojiHTML() {
      var message = '\uF600\u6D4B\u8BD5 Emoji';
      // 将 message 中的原生 Emoji (包含 Unicode ) 转化为 HTML
      RongIMLib.RongIMEmoji.emojiToHTML(message);
      // => "<span class='rong-emoji-content' name='[笑嘻嘻]'>😀</span>测试 Emoji"
    },

    // 名称转 HTML
    nameHTML: function nameHTML() {
      var message = "[露齿而笑]测试 Emoji";
      // 将 message 中的 Emoji 对应名称转化为 HTML
      RongIMLib.RongIMEmoji.symbolToHTML(message);
      // => "<span class='rong-emoji-content' name='[露齿而笑]'>😁</span>测试 Emoji"
    },
        // 滚动条固定底部
    add: function add() {
    //   var content = document.querySelector('#d1');
    //   content.scrollTop = content.scrollHeight;
      $("#d1").animate({"scrollTop": $('#d1')[0].scrollHeight}, "slow");
    },
    phone_ref(){
        this.$refs.xavier.scrollTop = this.$refs.xavier.scrollHeight;
    },
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
      pc_kefu_referrer(){
          this.pc_model_status=false
      },
      kefu_referrer(){
          this.phone_model_status=false
        window.close()
     },
    //获取token
    gettoken: function gettoken() {
      let vm=this
      if(!vm.shop_user_id) vm.shop_user_id=''
       this.apiPost(this.khost+'/public/portal/Kf_api/getRongToken',{ shop_id:vm.shop_id,shop_user_id:vm.shop_user_id}).then((res)=>{
         if(res.code == 200){
                        localStorage.setItem('userId',res.data.user_id)
                        localStorage.setItem('token',res.data.user_token)
                        localStorage.setItem('kf_id',res.data.kf_id)
                        localStorage.setItem('user_name',res.data.user_name)
                        localStorage.setItem('app_key',res.data.app_key)
                        vm.name=res.data.user_name
                        vm.kf_pic=res.data.kf_pic
                        vm.kf_name=res.data.kf_name
                          this.getclientadd()//上传信息
                          this.connect()//链接融云服务器
                }
                if(res.code == 203){
                        localStorage.setItem('userId',res.data.user_id)
                        localStorage.setItem('token',res.data.user_token)
                          this.getclientadd()//上传信息
                       this.$router.push('/rong_offline')
                }
        })
    },
    // 获取当前时间
    gettime: function gettime() {
      this.time = dateFormat(new Date(), ' HH:mm:ss');
      // this.othertime=dateFormat(new Date(), ' HH:mm:ss')
    },
    // 浏览器信息
    BrowserInfo: function BrowserInfo() {
      var userLanguage = navigator.userLanguage; // 用户在自己的操作系统上设置的语言（火狐没有）    
      var userAgent = navigator.userAgent; //包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform    
      var systemLanguage = navigator.systemLanguage; // 用户操作系统支持的默认语言（火狐没有）  
      var info = "";
      info += "浏览器属性信息： " + userAgent + "<br />";
      info += "用户设置的操作系统语言： " + userLanguage + "<br />";
      info += "操作系统支持的默认语言： " + systemLanguage + "<br />";
    //   console.log('浏览器信息');console.log(userLanguage, userAgent, systemLanguage);console.log('浏览器信息');

      return info;
    },
    //获取客户端操作系统类型 
    detectOS: function detectOS() {
      var sUserAgent = navigator.userAgent;
      var isWin = navigator.platform == "Win32" || navigator.platform == "Windows";
      var isMac = navigator.platform == "Mac68K" || navigator.platform == "MacPPC" || navigator.platform == "Macintosh" || navigator.platform == "MacIntel";
      if (isMac) return "Mac";
      var isUnix = navigator.platform == "X11" && !isWin && !isMac;
      if (isUnix) return "Unix";
      var isLinux = String(navigator.platform).indexOf("Linux") > -1;
      if (isLinux) return "Linux";
      if (isWin) {
        var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
        if (isWin2K) return "Win2000";
        var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
        if (isWinXP) return "WinXP";
        var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
        if (isWin2003) return "Win2003";
        var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
        if (isWinVista) return "WinVista";
        var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
        if (isWin7) return "Win7";
        var isWin10 = sUserAgent.indexOf("Windows NT 10") > -1 || sUserAgent.indexOf("Windows 10") > -1;
        if (isWin10) return "Win10";
      }
      return "other";
    },
    /**
    * 获取网络类型
    */
    getNetwork: function getNetwork() {
      var vm = this;
      var wifi = true;
      var ua = window.navigator.userAgent;
      var con = window.navigator.connection;
      // 如果是微信
      if (/MicroMessenger/.test(ua)) {
        // 如果是微信6.0以上版本，用UA来判断
        if (/NetType/.test(ua)) {
          if (ua.match(/NetType\/(\S*)$/)[1] != 'WIFI') {
            wifi = false;
            vm.network = "4G 或 3G 或2G";
          }
          // 如果是微信6.0以下版本，调用微信私有接口WeixinJSBridge
        } else {
          document.addEventListener("WeixinJSBridgeReady", function onBridgeReady() {
            WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
              if (e.err_msg != "network_type:wifi") {
                wifi = false;
                vm.network = "4G 或 3G 或2G";
              }
            });
          });
        }
        // 如果支持navigator.connection
      } else if (con) {
        var network = con.type;
        if (network != "wifi" && network != "2" && network != "unknown") {
          // unknown是为了兼容Chrome Canary
          wifi = false;
          vm.network = "4G 或 3G 或2G";
        }
      } else {
        vm.network = "wifi";
      }
      window.networkWIFI = wifi;
    },
    //获取手机浏览器
    getphono: function getphono() {
      var browser = {
        versions: function () {
          var u = navigator.userAgent,
              app = navigator.appVersion;
          return { //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
          };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
      };
    },
    //取得浏览器的userAgent字符串
         myBrowser(){
                var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
                var isOpera = userAgent.indexOf("Opera") > -1;
                if (isOpera) {
                   this.userAgent="Opera"
                }; //判断是否Opera浏览器
                if (userAgent.indexOf("Firefox") > -1) {
                    this.userAgent="Firefox"
                } //判断是否Firefox浏览器
                if (userAgent.indexOf("Chrome") > -1){
                    this.userAgent="Chrome"
            }
                if (userAgent.indexOf("Safari") > -1) {
                    this.userAgent="Safari"
                } //判断是否Safari浏览器
                if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
                    this.userAgent ='IE'
                }; //判断是否IE浏览器
            },
    // 上传用户信息
    getclientadd: function getclientadd() {
      this.myBrowser() //取得浏览器的userAgent字符串
      this.navigator()
      var vm = this;  
      var win_os = this.detectOS(); //获取客户端操作系统类型 
      var data = {
        rong_id: localStorage.getItem('userId'),
        rong_name: localStorage.getItem('user_name'),
        rong_token: localStorage.getItem('token'),
        shop_id: localStorage.getItem('shop_id'),
        win_os: win_os, //获取客户端操作系统类型 
        resolution: screen.width + '*' + screen.height, //分辨率
        browser: vm.userAgent, // 浏览器信息
        netinfo: vm.network //移动端网络信息
      };
      this.apiPost(this.khost+'/public/portal/Kf_api/clientAdd', data).then(function (res) {
        if(res.code == 200){
          vm.rong_pic=res.data.rong_pic
          vm.name=res.data.name
          vm.id=res.data.id
          localStorage.setItem('id',res.data.id)
        }
      });
    },
    choice_radio(i){
        this.radio_content=i
    },
    //  提交评价
     gradeSubmit(){
        //  console.log(typeof this.radio_content)
         if( !String(this.radio_content) || !String(this.bgrade_content) || !this.agrent_content){
            //  console.log(this.radio_content,this.bgrade_content ,this.agrent_content)
             this.$vux.toast.show({
                 text:'请填写评价信息',
                 type:'text',
                 position:'middle'
             })
             return;
         }
         var data={
             shop_id :this.shop_id,
             user_id: this.id,
             kf_id  :localStorage.getItem('kf_id'),
             Agrade:this.radio_content,
             Bgrade :this.bgrade_content,
             content :this.agrent_content                    
         }
         this.apiPost(this.khost+'/public/portal/kf_api/kfGradeSub',data).then((res)=>{
             if(res.code==200){
                 this.$vux.toast.show({
                     text:res.msg,
                     type:'text',
                     position:'middle'
                 })
                 this.radio_content = '' ;
                 this.bgrade_content = '' ;
                 this.stutes= -1 ;
                 this.agrent_content  = '' ;
             }
         })
     },
    //客户评价
    kfGradeSetGet(){
        this.apiPost(this.khost+'/public/portal/kf_api/kfGradeSetGet',{shop_id:this.shop_id}).then((res)=>{
            if(res.code == 200){
                this.kf_title=res.data.title
                for(var i in res.data.Agrade){
                    for(var i in this.label_list){
                        this.label_list[i].content=res.data.Agrade[i]
                    }
                }
                for(var i in res.data.Bgrade){
                    for(var i in this.server_list){
                        this.server_list[i].title=res.data.Bgrade[i]
                    }
                }
            }
        })
    },
      //获取推送消息
  tification(){
      this.apiPost(this.khost+'/public/portal/Kf_api/notification',{shop_id:this.shop_id}).then((res)=>{
          if(res.code == 200){
              this.massage_title=res.data
          }
      })
  },
  },
  watch:{
          text_list:function(newval,oldval){
           if(this.text_list){
               this.layui_btn=false
           }else{
               this.layui_btn=true
           }
         }
    },
  created(){
        // this.navigator()
  },
  mounted(){
      RongIMLib.RongIMEmoji.init();
      this.listemoji = RongIMLib.RongIMEmoji.list;
      this.gettime();
        // if(this.GetRequest(1).shop_id){
        // localStorage.setItem('shop_id',this.GetRequest(1).shop_id)
        // }
        // if(this.GetRequest(1).shop_user_id){
        // localStorage.setItem('shop_user_id',this.GetRequest(1).user_id)
        // }
        // this.shop_id=this.GetRequest(1).shop_id
        // this.shop_user_id=this.GetRequest(1).user_id
        this.shop_id=localStorage.getItem('shop_id')
        this.shop_user_id=localStorage.getItem('shop_user_id')
         this.gettoken()

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
   mixins: [mixin, http, upload]
}
</script>
<style>
    .imgrel{
        position: relative!important;
    }
    .layui-badge-dot{
        position: absolute!important;
        top:10px;
        left:40px;
    }
    .layui-icon{
        margin: 0 5px;
    }
    .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
    }
    .layui-btn{
        background-color: #5FB878!important;
        height:32px!important;
        line-height:32px!important;
        margin-left:1%!important;
    }
    .mobile_footer{
        line-height:45px!important;
    }
</style>

<style>    
        .lhl_pc{
            width: 800px;
            height: 600px;
            margin-left:25%;
            margin-top:10%;
            position: relative;
             border:1px solid #D9D9D9;
    box-shadow:0px 0px  1px 1px #aaa;
        }
        .rt{
            float:right;
        }
        .lf{
            float:left
        }   
        .sidebar, .main {
            height: 100%;   
        }
        .sidebar {
            float: left;
            width: 200px;
            color: #f4f4f4;
            background-color: #2e3238;
        }
        .main {
            position: relative;
            overflow: hidden;   
            background-color: #eee;
        }
        .main .self{
            text-align: right;
        }
        .m-text {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
        }
        .rm-message {
            height:415px;
            padding-top:4rem;
        }
        .m-card {
            padding: 12px;
            border-bottom: solid 1px #24272C;
        }
        footer {
            margin-top: 10px;
        }
        .m-list{
            overflow-y: scroll;
            height:100%;
        }
        .m-list li {
            padding: 12px 15px;
            border-bottom: 1px solid #292C33;
            cursor: pointer;
            transition: background-color .1s;
        }
        .m-list li:hover{
             background-color: rgba(255, 255, 255, 0.03);
        }
        .avatar, .name {
            vertical-align: middle;
        }
        .avatar {
            border-radius: 2px;
        }
        .avatar_rt{
            border-radius: 2px;
            vertical-align: middle;
            margin: 0 0 0 10px;
            border-radius: 3px;
        }
        .text_rt, .text_img{
            display: inline-block;
            position: relative;
            padding: 10px 10px;
            max-width: calc(100% - 40px);
            min-height: 30px;
            line-height: 1.5;
            font-size: 10pt;
            text-align: left;
            word-break: break-all;
            background-color: #b2e281;
            border-radius: 4px;
        }
        .text_rt i {
            display: inline-block;
            width:0;
            height:0;
            border-top:5px solid transparent;
            border-bottom: 5px solid transparent;
            border-left: 5px solid #B2E281;
            position: absolute;
            right:-5px;
            top:10px;
            }
        .text, .textlf_img{
            display: inline-block;
            position: relative;
            padding: 0 10px;
            max-width: calc(100% - 40px);
            min-height: 30px;
            line-height: 2.5;
            font-size: 9pt;
            text-align: left;
            word-break: break-all;
            background-color: #fff;
            border-radius: 4px;
        }
        .textlf_img:before{
                content: " ";
                position: absolute;
                top: 9px;
                right: 100%;
                border: 6px solid transparent;
                border-right-color: #fff;
        }
        .text_img:before{
                content: " ";
                position: absolute;
                top: 9px;
                right: -10%;
                border: 6px solid transparent;
                border-left-color: #b2e281;
        }
        .name {
            display: inline-block;
            margin: 0 0 0 15px;
            font-size: 16px;
        }
        .search {
            padding: 0 10px;
            width: 100%;
            font-size: 12px;
            color: #fff;
            height: 30px;
            line-height: 30px;
            border: solid 1px #3a3a3a;
            border-radius: 4px;
            outline: none;
            background-color: #26292E;
        }
        .rm-message {
            /*padding: 30px 15px;*/
            overflow-y: scroll;
            position: absolute;
            width:100%;
        }
        .rm-message li {
            margin-bottom: 15px;
        }
        .rm-message .time {
            margin: 7px 0;
            text-align: center;
        }
        .rm-message .time > span {
                display: inline-block;
                padding: 0 18px;
                font-size: 12px;
                color: #fff;
                border-radius: 2px;
                background-color: #dcdcdc;
        }
        .rm-message  .avatar {
            /*float: left;*/
            margin: 0 10px 0 0;
            border-radius: 3px;
        }
        .rm-message .text {
            display: inline-block;
            position: relative;
            padding:10px;
            /*max-width: ~'calc(100% - 40px)';*/
            min-height: 30px;
            line-height: 1.5;
            font-size: 8pt;
            text-align: left;
            word-break: break-all;
            background-color: #fafafa;
            border-radius: 4px;
        }
        .text:before {
                content: " ";
                position: absolute;
                top: 9px;
                right: 100%;
                border: 6px solid transparent;
                border-right-color: #fafafa;
            }
        .m-text {
            height: 160px;
            border-top: solid 1px #ddd;
        }
        textarea {
            padding: 10px;
            height: 80%;
            width: 100%;
            border: none;
            outline: none;
            font-family: "Micrsofot Yahei";
            resize: none;
        }
        .lhlbtn{
            position:absolute;
            bottom:15px;right:30px;
            border:0;
            outline:none;
            border:1px solid #E5E5E5;
            width:70px;
            height:25px;
            background-color: #F5F5F5;
            cursor:pointer
        }
        .lhl_emoji_list{
            padding:15px;
            width:400px;
            z-index:1000;
            position:absolute;
            top:-225px;
            background-color:#fff
        }
        .lhl_emoji_list .bottom_jiantou{
             width: 0;
            height: 0;
            border-left: 7px solid transparent;
            border-right: 7px solid transparent;
            border-top: 11px solid #fff;
            position: absolute;
            bottom:-11px;
            left:38px;
        }
        .layui-icon:hover{
            color:#09BB07;
            cursor:pointer
        }
                                                       /*移动端*/
        .lhl_mobile{
            width:100%;
            height:100%;
            position: fixed;
        }
        .mobile_header{
            width:100%;
            /*height:10%;*/
            line-height:60px;
            background-color:#36373C;
            color:#fff;
            font-size:18px;
        }
        .mobile_header span:nth-child(1) span{
            width:14px;
            height:14px;
            display: inline-block;
            border-top:2px solid #fff;
            border-left:2px solid #fff;
            transform:rotate(-45deg);
            margin:0 30px;
        }
        .rmobile_main{
            width:100%;
            height:80%;
            background-color:#EEEEEE;
            position: absolute;
            overflow-y:scroll;
            padding-bottom:2.5rem
        }
        .lhl_mean{
            margin-bottom:1rem;
        }
        .lhl_mean>p, .lhl_you>p{
            width:20%;
            background-color:#DDDDDD;
            padding:4px 0;
            margin:1rem auto;
            text-align:center;
            color:#fff;
            border-radius:3px;
        }
        .mean_p{
            max-width:70%;
            margin:-10px 0 0 5rem;
            border-radius:3px;
            word-break: break-all;
            background-color:#fff;
            float:left;
            padding:10px 10px;
            clear:both
        }
        .mean_p:before{
             content:'';
            width: 0;
            height: 0;
            border-top: 15px solid #fff;
            border-left: 15px solid transparent;
            position:absolute;
            left:65px;
        }
        .lhl_you{
            position: relative;
        }
        .you_p i{
            display: inline-block;
            width: 0;
            height: 0;
            border-top: 15px solid #5FB878;
            border-right: 15px solid transparent;
            position:absolute;
            right:65px;
            top:95px
        }
        .you_p{
            padding:10px 10px;
            clear:both;
            clear:both;
            max-width:70%;
            margin:-10px 5rem 0 0;
            border-radius:3px;
            word-break: break-all;
            background-color:#5FB878;
            color:#fff;
        }
        .mobile_footer{
            width:100%;
            line-height:50px;
            background-color:#EEEEEE;
            position: absolute!important;
            bottom:0;
        }
        .pho_text{
            width:75%;
             outline:none;
             border:none!important;
            display:inline-block!important;
            border:1px solid #ddd;
            border-radius:5px;
            line-height:40px;
            height:40px;
            word-wrap: break-word;
            /*line-height:40px;*/
            vertical-align:middle!important;
            /*padding:3px;*/
        }
        .pc_model{
            position: absolute;
            top:-3px;
            left:-3px;
            right:0;
            bottom:0;
            z-index:10000!important;
            width:803px;
            height:603px;
            background-color:rgba(0,0,0,0.9);
        }
        .img_big{
            position: absolute;
            top:-3px;
            left:-3px;
            right:0;
            bottom:0;
            z-index:1000;
            width:803px;
            height:603px;
            background-color:rgba(0,0,0,0.9);
        }
        .phone_img_big{
            position: absolute;
            top:0;
            left:0;
            right:0;
            bottom:0;
            z-index:1000;
            width:100%;
            height:100%;
            background-color:rgba(0,0,0,0.9);
        }
        .pc_model_content{
            width:50%;
            height:80%;
            margin:4rem auto;
            background-color:#fff;
        }
        .phone_model{
            position: absolute;
            top:0;
            left:0;
            right:0;
            bottom:0;
            z-index:1000;
            width:100%;
            height:100%;
            background-color:rgba(0,0,0,0.9);
        }
        .phone_model_content{
            width:90%;
            height:80%;
            margin:4rem auto;
            background-color:#fff;
        }
        .close:hover{
            background-color:#e4393c;
            color:#fff
        }
        .bg_green{
            background-color:#6ABD81!important;
            color:#fff;
        }
        @media screen and (min-width: 414px){
            .feel_list{
                top:-220px!important;
            }
            .pho_text{
                width:80%!important;
            }
    }
     @media screen and (min-width:375px) and (max-width:413px){
         .pho_text{
                width:78%!important;
            }
     }
     @media screen and (max-width:374px){
         .pho_text{
                width:75%!important;
            }
     }
</style>

