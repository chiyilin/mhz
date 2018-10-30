var App = getApp();
var common = require('../../../utils/common.js');
// pages/mhzindex/finish/finish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var baokao_id = options.baokao_id;
    var user_id = wx.getStorageSync('userinfo').user_id;
    wx.showLoading({
      title: '加载中',
    });
    common.PostMain('baoming/chenggong', {
      baokao_id:baokao_id,
      user_id:user_id,
    }, function (data) {
      that.setData({
        baokao: data.baokao,
        user: data.user,
      });
      console.log(data)
      wx.hideLoading();
    });
  },
  fanhui:function(){
    wx.navigateBack({
      delta:1,
    })
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

  }
})