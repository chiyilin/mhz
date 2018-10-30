var App = getApp();
var common = require('../../../utils/common.js');
// pages/mhzindex/EnrolmentDetails/EnrolmentDetails.js
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
    var that = this;
    console.log(options)
    var list_id = options.list_id;
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    common.PostMain('baoming/xiangqing', {
      list_id: list_id
    }, function (data) {
      that.setData({
        list: data.list,
        zhi:0,
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
  gengduo: function(e){
    this.setData({
      zhi: 1,
    });
  }
})