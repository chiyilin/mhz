// pages/redPacket/redPacket.js
var App = getApp();
var common = require('../../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,
    userInfo: wx.getStorageSync('userInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.data.id = options.id
    common.PostMain('message/redPacket', {
      user_id: that.data.userInfo.user_id,
      id: that.data.id
    }, function(res) {
      var param = res;
      param.hidden = res.message_status == 2 ? true : false;
      that.setData(param)
    });
    wx.hideShareMenu();
  },
  //点击红包
  hidden: function(e) {
    var that = this;
    common.PostMain('message/redPacketdo', {
      user_id: that.data.userInfo.user_id,
      id: that.data.id
    }, function(res) {
      that.setData({
        hidden: true
      })
    });

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(e) {

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

  }
})