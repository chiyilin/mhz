var App = getApp();
var common = require('../../../utils/common.js');
// pages/PromotionCenter/Exchange/Exchange.js
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
    var user_id = wx.getStorageSync('userinfo').user_id;
    wx.showLoading({
      title: '加载中',
    });
    common.PostMain('jfproduct/index', {
      user_id: user_id,
    }, function(data) {
      that.setData({
        filepath: App.globalData.filepath,
        jfproduct: data.jfproduct,
        user: data.user,
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
  duihuan: function(e) {
    var jfproductid = e.currentTarget.dataset.jfproductid;
    wx.navigateTo({
      url: "../product/product?jfproduct_id=" + jfproductid,
    })
  },
})