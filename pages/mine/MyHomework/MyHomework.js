// pages/mine/MyHomework/MyHomework.js
var App = getApp();
var common = require('../../../utils/common.js');
var initData = function(that) {
  wx.showNavigationBarLoading();
  common.PostMain('userhomework/index', {
    user_id: that.data.user_id,
    // homework_status: Number(that.data.currentTab) + 1,
  }, function(res) {
    that.setData({
      data: res
    })
    wx.hideNavigationBarLoading();
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['未完成', '已提交', '已完成'],
    currentTab: 0,
    user_id: wx.getStorageSync('userInfo').user_id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    common.onLoad(options);
  },
  /**
   * 作业详情
   */
  homeworkdetails: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/mine/UpHomework/UpHomework?id=' + id,
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
    initData(this);
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
  },
  /**
   * 选项卡切换
   */
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  }
})