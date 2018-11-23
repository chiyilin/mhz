// pages/mail/mail.js
var common = require('../../../utils/common.js');
var app = getApp();
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
    wx.hideShareMenu();
  },
  choose: function(e) {
    var that = this;
    that.setData({
      nowIndex: e.currentTarget.dataset.index
    })
    wx.setStorageSync('userAddr', that.data.data[e.currentTarget.dataset.index])
    wx.setStorageSync('userAddrIndex', e.currentTarget.dataset.index)
    wx.navigateBack({
      delta:-1
    })
  },
  /**
   * 新增
   */
  creatAddr: function() {
    wx.navigateTo({
      url: '/pages/address/add/add',
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
    var that = this;

    common.PostMain('user/addrList', {
      user_id: wx.getStorageSync('userInfo').user_id
    }, function(e) {
      console.log(e)
      that.setData({
        data: e,
        nowIndex: wx.getStorageSync('userAddrIndex') ? wx.getStorageSync('userAddrIndex') : 0
      })
    });
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