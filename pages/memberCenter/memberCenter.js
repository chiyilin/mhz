// pages/memberCenter/memberCenter.js
var App = getApp();
var common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  showRule: function() {
    this.setData({
      isRuleTrue: true
    })
  },
  //关闭规则提示
  hideRule: function() {
    this.setData({
      isRuleTrue: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function() {
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    common.PostMain('memberprice/index', {
      user_id: userInfo.user_id
    }, function(data) {
      that.setData({
        data: data.MemberPriceModel,
        userInfo: userInfo,
        config: data.config
      })
    });
  },
  choose: function(e) {
    this.setData({
      current: e.currentTarget.dataset.index
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

  }
})