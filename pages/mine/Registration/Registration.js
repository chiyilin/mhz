var App = getApp();
var common = require('../../../utils/common.js');
// pages/mine/Registration/Registration.js
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
    common.onLoad(options);
    var user_id = options.user_id;
    console.log(user_id)
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    common.PostMain('baoming/guanli', {
      user_id: user_id
    }, function (data) {
      that.setData({
        baoming: data,
      });
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
    return common.share();
  },
  xiangqing: function(e){
    var list_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../mhzindex/EnrolmentDetails/EnrolmentDetails?list_id=' + list_id,
    })
  },
})