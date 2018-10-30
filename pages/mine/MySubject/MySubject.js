var App = getApp();
var common = require('../../../utils/common.js');
// pages/mine/MySubject/MySubject.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    currentTab: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var user_id = wx.getStorageSync('userinfo').user_id;
    wx.showLoading({
      title: '加载中',
    });
    common.PostMain('user/kecheng', {
      user_id: user_id
    }, function(data) {
      that.setData({
        filepath: App.globalData.filepath,
        kecheng: data,
      });
      console.log(data)
      wx.hideLoading();
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

  },
  onShareAppMessage: function() {

  },
  swichNav: function(e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var showMode = e.target.dataset.current == 0;
      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
    }
  },
  pingjia: function(e) {
    var listid = e.currentTarget.dataset.listid;
    wx.navigateTo({
      url: '../../comment/comment?list_id=' + listid,
    })
  },
  xiangqing: function(e) {
    var id = e.currentTarget.dataset.productid;
    wx.navigateTo({
      url: "../../program/buy/buy?productid=" + id,
    })
  },
  taocan: function(e) {
    var id = e.currentTarget.dataset.taocid;
    wx.navigateTo({
      url: '../../program/buy/buy?taocid=' + id,
    })
  },
})