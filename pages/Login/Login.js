// pages/Login/Login.js
var App = getApp();
var common = require('../../utils/common.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    rexian: '全国咨询热线：18511111926',
    fromData: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(wx.getStorageSync('userInfo'))
    if (wx.getStorageSync('userInfo').user_id) {
      if (common.updateUserInfo()) {
        common.showToast('用户已锁定');
      }
    }
  },
  //获取用户信息回调
  getUserInfo: function(e) {
    // console.log(this.data.fromData)
    // return null;
    if (!e.detail.userInfo) {
      wx.showToast({
        title: '请授权后操作!',
        icon: 'none',
      })
      return null;
    }
    App.globalData.userInfo = e.detail.userInfo;
    var param = {
      openid: App.globalData.openid,
      user_mobile: this.data.fromData.phone,
      staff_random: this.data.fromData.staff_random,
      face: App.globalData.userInfo.avatarUrl,
      nick_name: App.globalData.userInfo.nickName,
    };
    common.PostMain('login/register', param, function(data) {
      App.globalData.userInfo = data;
      wx.setStorageSync('userInfo', data)
      console.log(wx.getStorageSync('userInfo'))
      return null;
      wx.switchTab({
        url: "/pages/index/index",
      })
    });

  },
  bindFormSubmit: function(e) {
    this.data.fromData = e.detail.value
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

})