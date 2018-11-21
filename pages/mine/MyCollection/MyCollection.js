var App = getApp();
var common = require('../../../utils/common.js');
// pages/mine/MyCollection/MyCollection.js
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
    common.onLoad(options);
    var user_id = wx.getStorageSync('userInfo').user_id;
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    common.PostMain('user/shoucang', {
      user_id: user_id
    }, function(data) {
      console.log(data)
      that.setData({
        filepath: getApp().globalData.filepath,
        userinfo: data,
      });
      wx.hideLoading();
    });
  },
  details: function(e) {
    wx.navigateTo({
      url: '/pages/program/buy/buy?productid=' + e.currentTarget.dataset.id,
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