var url = 'http://j.diankuai.com'

var _req = {
  url:'',
  data:{},
  success: function(res){
    // success
  },
  fail: function() {
    // fail
  },
}

//GET请求
function get(req) {
  request('GET',req)
}
//POST请求
function post(req) {
  request('POST',req)
}

function request(method,req) {
  let header = req.header || {}
  wx.request({
    url: url+req.url,
    data: req.data,
    method: method,
    header: header, // 设置请求的 header
    success: function(res){
      //注意：可以对参数解密等处理
      req.success(res.data)
    },
    fail: function(e) {
      req.fail()
    },
    complete: function(e) {
      // complete
    }
  })
}

module.exports = {
  get: get,
  post: post
}
