//app.js
App({
  data:{
    state:1
  },
  onLaunch: function () {
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  }
})
// function LoadSegmentedControl(fromData) {
//   let pages = getCurrentPages()
//   let curPage = pages[pages.length - 1]
//   Object.assign(curPage, SegmentedControl.methods);

//   curPage.setData({ [__outcomp__]: SegmentedControl.data });

//   console.log(curPage.data[__outcomp__])
//   return this;
// }
// module.exports = {
//   LoadSegmentedControl
// };