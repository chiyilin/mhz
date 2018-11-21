var App = getApp();
var common = require('../../../utils/common.js');
// pages/mine/privilege/privilege.js
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
    var user_id = options.user_id;
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    common.PostMain('user/dizi', {
      user_id: user_id
    }, function(data) {
      console.log(data)
      that.setData({
        userdata: data
      })
    });
    wx.hideLoading();
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
  sub: function(e) {
    var user_id = e.currentTarget.dataset.userid;
    console.log(user_id)    
    wx.request({
      url: App.globalData.apiurl + 'user/dizibsq',
      method: "POST",
      data: {
        user_id: user_id,
      },
      success: function (res) {
        wx.showToast({
          title: '等待审核！',
          icon: 'success',
        })
      },
    });
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