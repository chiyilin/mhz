var App = getApp();
var common = require('../../utils/common.js');
// pages/PromotionCenter/PromotionCenter.js
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user_id = wx.getStorageSync('userInfo').user_id
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    common.PostMain('user/tuiguang', {
      user_id: user_id
    }, function (data) {
      that.setData({
        userinfo: data,
        need: 0,
      });
      console.log(data)
      wx.hideLoading();
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
 money: function () {
    wx.navigateTo({
      url: "PutForward/PutForward",
    })
  },
 exchange: function () {
    wx.navigateTo({
      url: "Exchange/Exchange",
    })
  },
team: function () {
    wx.navigateTo({
      url: "../mine/MyTeam/MyTeam",
    })
  },
moneydan: function () {
    wx.navigateTo({
      url: "Bill/Bill",
    })
  },
jifendan: function () {
    wx.navigateTo({
      url: "IntegralDetail/IntegralDetail",
    })
  },
})