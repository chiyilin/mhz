// pages/program/CurriculaVariable/ CurriculaVariable.js
Page({
  data: {
    sex: 0,
    radios: [{
      label: '订购单节',
      value: '订购单节',
      first:'课程内容:什么是梅花针',
      time:'课程时长：21：30',
      money:'课程费用：',
      mon:'￥50.00',
      picture:'/imgs/hui.jpg'
    }, 
    {
      label: '订购套餐',
      value: '订购套餐',
      first: '课程内容：针灸课程全集',
      time:'课程节数：12节',
      money:'课程费用：',
      mon: '￥500.00',
      picture: '/imgs/hui.jpg'
    }, ]
  },
  check(e) {
    console.log(e) 
    var that = this;
    var sex = e.currentTarget.dataset.index 
    that.setData({
      sex: sex
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return common.share();
  }
})