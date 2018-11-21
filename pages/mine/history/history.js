// pages/mine/history/history.js
var App = getApp();
var common = require('../../../utils/common.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    filepath: App.globalData.filepath
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    common.onLoad(options);
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
    var that = this;
    wx.showNavigationBarLoading();
    var playerHistoryId = wx.getStorageSync('playerHistory');
    common.PostMain('user/playerhistory', {
      idArr: playerHistoryId
    }, function(e) {
      that.setData({
        data: e
      });
      wx.hideNavigationBarLoading();
    });
  },
  /**
   * 跳转至详情页面
   */
  details: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/program/buy/buy?productid=' + id,
    })
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