<template>
  <div @click="clear" style="position:relative" >
      <!--pc页面-->
    <div class="lhl_pc" v-show="pc_show_status" >
        <div class="main">
            <div class="main_top" style="">
                <span style="width:10%;text-align:center;line-height:60px;margin-left:1rem">
                    <img  width="40" height="40" :src="kf_pic">
                    <!--<span v-if="!youheadpic" style="background-color:#009688;margin-top:10px;width:40px;height:40px;display:inline-block;line-height:40px;border-radius:50%;">
                        <i style="color:#fff;font-size:26px"  class="iconfont icon-kefu"></i>
                    </span>-->
                    <p class="name" style="font-weight:bold">{{kf_name}}</p>
                </span>
                <span @click="pc_model" class="close rt" style="width:5%;text-align:center;line-height:30px;cursor:pointer">X</span>
            </div>
            <div class="m-message" id="d1" style="margin-top:60px;">
                <!--消息推送-->
                <div style="width:50%;margin:1rem auto;word-break: break-all;text-align:center" v-html="data_list">
                    
                </div>
                <ul>
                    <li v-for="(item,i) in tell_list" :key="i">
                        <div v-show="item.youtell.youstatus">
                            <p class="time"><span>{{item.youtell.youtime}}</span></p>
                            <div class="main">
                                <img class="avatar lf" width="30" height="30" style="margin-left:10px;" :src="kf_pic" />
                                <div class="text" v-if="!item.youtell.youlink" v-html="item.youtell.youtext"></div>
                                <div class="text" v-if="item.youtell.youlink"> 
                                    <img style="max-width:300px;max-height:100px;" @click.stop="get_url(item.youtell.youlink)" :src="item.youtell.youlink" alt="">
                                </div>
                            </div>
                        </div>
                        <div v-show="item.meantell.meanstatus">
                            <p class="time"><span>{{item.meantell.meantime}}</span></p>
                            <div class="main self">
                                <img class="avatar_rt rt" width="30" height="30" :src="rong_pic?rong_pic:headpic" />
                                <div class="text_rt" v-if="!item.meantell.meanlink" v-html="item.meantell.meantext"><i></i></div>
                                 <div class="text_rt" v-if="item.meantell.meanlink"><i></i>
                                    <img @click.stop="get_url(item.meantell.meanlink)" class="rt" style="max-width:300px;max-height:100px;" :src="item.meantell.meanlink" alt="">
                                 </div>
                            </div>                            
                        </div>    
                    </li>       
                </ul>
            </div> 
            <div class="m-text">
                <div  ></div>
                <div style="background:#fff;width:100%;">
                    <div style="width:100%;margin:0 auto;padding-top:10px;">
                        <!--<i id="face1" class="layui-icon face" @click.stop="face" style="font-size: 20px;">&#xe60c;</i>
                        <i class="layui-icon" @click.stop="pc_addfile" style="font-size: 20px;">&#xe64a;</i>-->
                        <img id="face1" src="../assets/face.png"  @click.stop="face" style="width:25px;margin:0 20px" alt="">
                        <img src="../assets/wenjian.png"  @click.stop="pc_addfile" style="width:25px;" alt="">
                        <input id="d2"  type="file" @change="getimg($event)" style="display:none" name="" > 
                    </div>
                </div>
                <textarea id="content1" v-model="text_list" placeholder="" @keyup.enter="enter"></textarea>
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
                <p style="width:90%;margin:0.5rem auto;text-align:center">{{grade}}</p>
                <div style="width:90%;margin:1rem auto;text-align:center">
                    <label for="d1" v-for="(item,i) in label_list" :key="i">
                       <input name="d1" type="radio"  @click="choice_radio(i)">{{item.content}} 
                    </label>    
                </div>
                <div style="width:80%;margin:0 auto;">
                    <span
                     style="display:inline-block;width:40%;border:1px solid #E6E6E6;text-align:center;margin:0.5rem 2.5% 0.5rem 6%;padding:3px;cursor:pointer"
                      v-for="(item,i) in server_list" :key="i" :class="stutes==i?'bg_green':''" @click="choose(i)">{{item.title}}</span>
                </div>
                <div style="width:70%;height:100px;margin:1rem auto;">
                    <textarea  v-model="agrent_content" style="width:100%;height:100px;border:1px solid #A9A9A9;margin:1rem auto;"></textarea>
                </div>
                <div style="width:70%;margin:1rem auto;text-align:center">
                     <button @click="gradeSubmit" style="width:30%;margin:1rem auto;" class="layui-btn layui-btn-sm">提交评价</button>
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
            <span @click="goback" style="width:20%;height: 60px;display: inline-block;">
                <span></span>
            </span>   
            <span>{{kf_name}}</span>
        </div>
        <div class="mobile_main"  id="d1" ref="xavier">
            <div style="width:80%;margin:1rem auto;word-break: break-all;text-align:center" v-html="data_list"></div>
            <ul>
                <li v-for="(item,i) in tell_list" :key="i">                   
                    <div class="lhl_mean lf" style="clear:both;width:100%;"  v-show="item.youtell.youstatus">
                        <p>{{item.youtell.youtime}}</p>
                        <div >
                            <img class="lf" style="clear:both;margin:0 20px 0 20px;border-radius:50%;" width="40" height="40px" :src="kf_pic" alt="">
                            <span>{{kf_name}}</span> 
                             <p  class="mean_p" v-html="item.youtell.youtext" v-if="!item.youtell.youlink"></p>
                             <p class="mean_p" v-if="item.youtell.youlink">
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
                            <p class="you_p rt" v-html="item.meantell.meantext" v-if="!item.meantell.meanlink" style="">
                                <i></i>
                            </p>
                            <p class="you_p rt" v-if="item.meantell.meanlink">
                                <img @click.stop="get_url(item.meantell.meanlink)" style="max-width:300px;max-height:100px;" :src="item.meantell.meanlink" alt="">
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="mobile_footer layui-container">
            <div id="facebox" v-show="face_show" @click="choose_face($event)"></div>
            <div class="layui-row">
                <textarea id="content1" v-model="text_list" class=" pho_text"></textarea>
                <button v-show="layui_btn" class="layui-btn layui-col-md3" 
                style="height:40px!important;line-height:40px!important;padding: 0 20px!important;margin-left:4px!important;background-color:#D2D2D2!important">发送</button>
                <button @click="send_msg" v-show="!layui_btn" class="layui-btn layui-col-md3" style="height:40px!important;line-height:40px!important;padding: 0 20px!important;margin-left:4px!important">发送</button>
            </div>
           <div style="background:#EEEEEE;width:100%;">
                    <div style="width:95%;height:38px;line-height:38px;margin-top:3px">
                        <!--<i id="face1" class="layui-icon"  @click.stop="make_face" style="font-size: 25px;">&#xe60c;</i>
                        <i class="layui-icon" @click.stop="addFile" style="font-size: 25px;">&#xe64a;</i>-->
                         <img src="../assets/face.png"  @click.stop="make_face" style="width:25px;margin:0 20px" alt="">
                        <!-- <img src="../assets/wenjian.png"  click.stop="addFile" style="width:25px;" alt=""> -->
                        <img src="../assets/wenjian.png"  @touchend="addPic" style="width:25px;" alt="">
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
                <p style="width:100%;margin:0.5rem auto;text-align:center">{{grade}}</p>
                <div style="width:90%;margin:1rem auto;text-align:center">
                    <label for="" v-for="(item,i) in label_list" :key="i">
                       <input name="d1" @click="choice_radio(i)" type="radio">{{item.content}} 
                    </label>
        
                </div>
                <div style="width:80%;margin:0 auto;">
                    <span style="display:inline-block;width:40%;border:1px solid #E6E6E6;text-align:center;margin:0.5rem 2.5% 0.5rem 6%;padding:3px;"
                     :class="stutes==i?'bg_green':''" @click="choose(i)" v-for="(item,i) in server_list" :key="i">{{item.title}}</span>
                </div>
                <div style="width:70%;height:100px;margin:1rem auto;">
                    <textarea  v-model="agrent_content" style="width:100%;height:100px;border:1px solid #A9A9A9;margin:1rem auto;"></textarea>
                </div>
                <div style="width:70%;margin:1rem auto;text-align:center">
                     <button style="width:30%;margin:1rem auto;" @click="gradeSubmit"  class="layui-btn layui-btn-sm">提交评价</button>
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
import { setTimeout } from 'timers';
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
          mobile_emoji:false,//mobile
          pc_show_status:false,//判断是pc还是移动
          mobile_show_status:false,//判断是pc还是移动
          pc_model_status:false,//pc评价
          phone_model_status:false,//移动评价
          text_list:'',//测试
          face_show:false,
          time:'',
          name:"",
          kf_name:'',
          layui_btn:true,
          list: ['微笑', '撇嘴', '色', '发呆', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问','嘘' ,'晕', '折磨', '衰', '敲打', '再见', '擦汗', '抠鼻', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了','阴险', '亲亲', '吓', '可怜', '抱抱','月亮','太阳','炸弹','骷髅','菜刀', '猪','西瓜', '咖啡', '饭', '爱心',  '强','弱', '握手', '胜利', '抱拳', '勾引','OK','差劲', '玫瑰', '凋谢', '嘴唇', '亲亲', '飞吻'],
          youheadpic:'',
          headpic:require('../assets/a3.jpg'),
          meanlink:'',//发送图片的链接
          youlink:'',//接收图片的链接
          meanstatus:true,
          youstatus:true,
          grade:'',
          stutes:-1,
          big_url:'',//放大图片的路经
          show_big_img:false,
          kf_pic:'',
          shop_id:'',
          shop_user_id:'',
          emoji_img:'',
          youname:'',
          rong_pic:'',
          referrer:'',
          data_list:'',
          agrent_content:'',
          radio_content:'',
          bgrade_content:'',
          URLRexExp:'',
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
      choose_face(e){
          if(e.target.nodeName=="IMG"){
            var choice=e.target;
            // choice.alt
            var cEle = choice.cloneNode(true); //深度复制，复制节点下面所有的子节点 ，直接将整个表情的IMG标签复制，并添加到发布框的<p></p>里面
            this.text_list+=this.list[choice.alt-1]
            this.emoji_img += `<img src="${cEle.currentSrc}"/>`
        }
      },
      make_face:function(){
          this.face_show=true
        $("div#facebox").show();         //显示表情容器
        if($("div#facebox>img").length==0){     //动态生成表情，如果现在没有表情则生成
        for(var i=1;i<=75;i++){      //根据表情文件数量决定循环次数，这里为75个表情
            $("div#facebox").append('<img  src="http://chat.huileyi.com/public/static/qqEmoji/face/'+i+'.gif" border="0" alt="'+i+'"/>'); //为表情容器里添加IMG标签，并赋予src值，路径为表情文件所在路径
            }
        }
    },// 选择表情并插入到输入框
      view(id){
           this.text_list=$('#content1').val()
            this.text_list = this.text_list.replace(/\</g,'&lt;');
            this.text_list = this.text_list.replace(/\>/g,'&gt;');
            this.text_list = this.text_list.replace(/\n/g,'<br/>');
            this.text_list = this.text_list.replace(/\[\/表情([0-9]*)\]/g,'<img  src="http://chat.huileyi.com/public/static/qqEmoji/face/$1.gif" border="0" />');
        },
      face(){
        this.$nextTick(function(){
             $('#face1').qqFace({
            id : 'facebox1', //表情盒子的ID
            assign:'content1', //给那个控件赋值
            path:this.khost+'/public/static/qqEmoji/face/'	//表情存放的路径
         });
        })
      },
      goback(){
        this.phone_model_status=true
        this.pc_model()
      },
      clear(){
          this.show_big_img=false
          this.emoji=false
          this.mobile_emoji=false
          this.face_show=false
      },
      choose(i){
          this.stutes=i
          this.bgrade_content=i
      },
    //   发送信息
    send_msg(){
        var vm = this;
        if(!this.emoji_img){
            this.view('content1')
            
            if (!vm.text_list){
                this.$vux.toast.show({
                    text:"不能发送空白消息",
                    type:'text',position:'middle'
                })
                return;
            } 
            this.gettime();
            this.onSubmit()
            this.tell_list.push({
                meantell:{meantime:this.time,meantext:this.text_list,meanstatus: true },
                youtell:{youstatus: false }
            })
            vm.navigator(); 
            this.text_list=''
        }

        if(this.emoji_img){
             if (!vm.text_list){
                this.$vux.toast.show({
                    text:"不能发送空白消息",
                    type:'text',position:'middle'
                })
                return;
            } 
            this.gettime();
            this.onSubmit_mobile()
            vm.text_list=vm.emoji_img
            this.tell_list.push({
            meantell:{meantime:this.time,meantext:vm.text_list,meanstatus: true },
            youtell:{youstatus: false }
        }) 
        vm.text_list=''
        vm.emoji_img=""
        vm.navigator();
           
        }

    },
    // 回车发送信息
    enter: function enter() {
      this.view('content1')
      var vm = this;
        if (!vm.text_list){
            this.$vux.toast.show({
                text:"不能发送空白消息",
                type:'text',position:'middle'
            })
            return;
        } 
        this.gettime();
        this.onSubmit()
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
     //移动表情
     phone_emoji(){
         this.mobile_emoji = !this.mobile_emoji
     },
          choice_radio(i){
         this.radio_content=i
     },
    //  提交评价
     gradeSubmit(){
         if(!String(this.radio_content) || !String(this.bgrade_content) || !this.agrent_content){
             this.$vux.toast.show({ 
                 text:'请填写评价信息',
                 type:'text',
                 position:'middle'
             })
             return false;
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
                this.pc_model_status=false
             }
         })
     },
     //pc评价页面
     pc_model(){
         this.pc_model_status=true
         this.apiPost(this.khost+'/public/portal/kf_api/kfGradeSetGet',{shop_id:this.shop_id}).then((res)=>{
             if(res.code == 200){
                 this.grade=res.data.title
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
    //  取消评价弹框
     pc_cancel(){
         this.pc_model_status=false
     },
     phone_cancel(){
         this.phone_model_status=false
     },
    //  移动端
    addPic (){
      var vm = this;
      $('#d3').click()
    },
     //pc选择图片
     pc_addfile (){
      var vm = this;
      window.setTimeout("$('#d2').click()",200)
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
            vm.text_list = res.url;
            vm.onSubmit_img()
            vm.gettime();
            vm.tell_list.push({
                meantell:{meanlink: res.url,meantime:vm.time,meanstatus: true },
                youtell:{youstatus: false }
            })
            vm.text_list=''
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
          vm.gettime();
          vm.onSubmit_img()
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
    work_connect(){
        // 连接服务端
        let vm=this
            //建立WebSocket通讯
            window.socket = new WebSocket("ws://chat.huileyi.com:7272");
            //连接成功时触发
            socket.onopen = function(){
                // 登录
                var login_data = JSON.stringify({
                    type: 'client_login',
                    id:localStorage.getItem('userId'),
                    username: vm.name,
                    avatar: '',
                    sign: '我的个性签名',
                    pic: localStorage.getItem('pic'),
                    shop_id:vm.shop_id
                });
                socket.send( login_data );
                //console.log( login_data );
                console.log("websocket握手成功!");
            };
            // 当有消息时根据消息类型显示不同信息
            //监听收到的消息

            socket.onmessage = function(res){
                var data = eval("("+res.data+")");
                switch(data['type']){
                        // 服务端ping客户端
                    case 'ping':
                        socket.send('{"type":"ping"}');
                        break;
                        // 登录 更新用户列表
                    case 'init':
                        console.log(data['content']+"登录成功");
                        vm.data_list=data['content']
                        //layim.getMessage(res.data); //res.data即你发送消息传递的数据（阅读：监听发送的消息）
                        break;
                    case 'say':
                        if(data.content_type == 1){
                          vm.tell_list.push({
                            youtell:{youtime:data.time,youtext:data.content,from_client_name:data.from_client_name,youstatus: true },
                            meantell:{meanstatus: false }
                         })
                            vm.navigator();
                        }
                        if(data.content_type == 2){
                            vm.tell_list.push({
                            youtell:{youlink:data.content,youtime:data.time,youstatus: true },
                            meantell:{meanstatus: false }
                         })
                            vm.navigator();
                        }
                        // console.log(data.content)
                        console.log('接收成功')
                        break;
                        // 检测聊天数据
                    case 'chatMessage':
                        //console.log(data.data);
                        layim.getMessage(data.data);
                        break;
                        // 离线消息推送
                    case 'logMessage':
                        setTimeout(function(){layim.getMessage(data.data)}, 1000);
                        break;
                        // 用户退出 更新用户列表
                    case 'logout':
                        break;
                        //聊天还有不在线
                    case 'ctUserOutline':
                        //layer.msg('好友不在线', {'time' : 1000});
                        break;

                }
            };

            socket.onclose = function () {
                layer.msg('ws连接关闭，定时重连');
                console.log("连接关闭，定时重连");
                this.work_connect();
            };
            socket.onerror = function () {
                console.log("出现错误");
            };
        
    },
    // 提交对话
     onSubmit() {
         let vm=this
        var socket, name, service_id, service_name, client_id, client_name;
         window.socket.send(JSON.stringify({
            type: 'say',
            from_client_id: localStorage.getItem('userId'),
            from_client_name: localStorage.getItem('user_name'),
            to_client_id: localStorage.getItem('kf_id'),
            to_client_name: vm.name,
            content_type:1,//文字
            content: vm.text_list
        })
        );

        // var now = (new Date).format('yyyy-MM-dd hh:mm:ss');
//        say(client_id, client_name, content, now);
    },
        // 提交对话
     onSubmit_img() {
         let vm=this
        var socket, name, service_id, service_name, client_id, client_name;
         window.socket.send(JSON.stringify({
            type: 'say',
            from_client_id: localStorage.getItem('userId'),
            from_client_name: localStorage.getItem('user_name'),
            to_client_id: localStorage.getItem('kf_id'),
            to_client_name: vm.name,
            content_type:2,//图片
            content: vm.text_list
        })
        );
        // var now = (new Date).format('yyyy-MM-dd hh:mm:ss');
//        say(client_id, client_name, content, now);
    },
            onSubmit_mobile(){
                let vm=this
            var socket, name, service_id, service_name, client_id, client_name;
            window.socket.send(JSON.stringify({
                type: 'say',
                from_client_id: localStorage.getItem('userId'),
                from_client_name: localStorage.getItem('user_name'),
                to_client_id: localStorage.getItem('kf_id'),
                to_client_name: vm.name,
                content_type:1,//图片
                content: vm.emoji_img
            })
            );
        },
    // Emoji 转名称
    emojiname: function emojiname() {
      var vm = this;
      var message = vm.said;
      // 将 message 中的原生 Emoji 转化为对应名称
      vm.said = RongIMLib.RongIMEmoji.emojiToSymbol(message);
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
      var content = document.querySelector('#d1');
      content.scrollTop = content.scrollHeight;
    // content.scrollTop = 9999+"px";
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
          window.close()
      },
      kefu_referrer(){
          window.close()
         this.phone_model_status=false
         
     },
    
    //获取token
    gettoken: function gettoken() {
      let vm=this
      if(!vm.shop_user_id) vm.shop_user_id=''
       this.apiPost(this.khost+'/public/portal/Kf_api/getWorkerToken',{ shop_id:vm.shop_id,shop_user_id:vm.shop_user_id}).then((res)=>{
         if(res.code == 200){
                        localStorage.setItem('userId',res.data.user_id)
                        localStorage.setItem('token',res.data.user_token)
                        localStorage.setItem('kf_id',res.data.kf_id)
                        localStorage.setItem('user_name',res.data.user_name)
                        vm.kf_name=res.data.kf_name
                        vm.name=res.data.user_name
                        vm.kf_pic=res.data.kf_pic
                          this.getclientadd()//上传信息
                          this.work_connect()//链接融云服务器
                }
                if(res.code == 203){
                        localStorage.setItem('userId',res.data.user_id)
                        localStorage.setItem('token',res.data.user_token)
                          this.getclientadd()//上传信息
                       this.$router.push('/workerman_offline')
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
        shop_id: vm.shop_id,
        win_os: win_os, //获取客户端操作系统类型 
        resolution: screen.width + '*' + screen.height, //分辨率
        browser: vm.userAgent, // 浏览器信息
        netinfo: vm.network //移动端网络信息
      };
      this.apiPost(this.khost+'/public/portal/Kf_api/clientAdd', data).then(function (res) {
        if(res.code == 200){
          vm.rong_pic=res.data.rong_pic
          localStorage.setItem('pic',res.data.rong_pic)
          vm.name=res.data.name
          vm.id=res.data.id
          localStorage.setItem('id',res.data.id)
        }
      });
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
      this.face()
  },
  mounted(){
      this.gettime();
      this.face()
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
        .m-message {
            height:415px;
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
        .text_rt:before{
            content:'';
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
        .main_top{
            height:60px;
            width:100%;
            background-color:#EEEEEE;
            border-bottom:1px solid #ddd;
            position:absolute;
        }
        .name {
            display: inline-block;
            margin:0 0 0 15px;
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
        .m-message {
            padding-bottom:100px;
            overflow-y: scroll;
        }
        .m-message li {
            margin-bottom: 15px;
        }
        .m-message .time {
            margin: 7px 0;
            text-align: center;
        }
        .m-message .time > span {
                display: inline-block;
                padding: 0 18px;
                font-size: 12px;
                color: #fff;
                border-radius: 2px;
                background-color: #dcdcdc;
        }
        .m-message  .avatar {
            /*float: left;*/
            margin: 0 10px 0 0;
            border-radius: 3px;
        }
        .m-message .text {
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
        .mobile_main{
            width:100%;
            height:80%;
            background-color:#EEEEEE;
            position: absolute;
            overflow-y:scroll;
            padding-bottom:150px
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
        .you_p:before{
            content:'';
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
            z-index:1000;
            width:804px;
            height:602px;
            background-color:rgba(0,0,0,0.9);
        }
        .img_big{
            position: absolute;
            top: -3px;
            left: -3px;
            right: 0;
            bottom: 0;
            z-index: 1000;
            width: 804px;
            height: 602px;
            background-color: rgba(0,0,0,0.9);
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
        #facebox1{
            position: absolute;
            z-index: 1000;
            top: 464px!important;
            left: 480px!important;
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

