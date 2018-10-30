var App = getApp();
var common = require('../../../utils/common.js');
// pages/mhzindex/mhzindex.js
// pages/mhzindex/PressReleases/PressReleases.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['全部', '文章', '理论', '咨询'],
    currentTab: 0,
    isShow: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(wx.getStorageInfoSync('userInfo'))
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    common.PostMain('article/index', {}, function(data) {
      for (var i = 0; i < data.length; i++) {
        data[i]['details'] = JSON.parse(data[i].article_details);
      }
      that.setData({
        article: data,
      });
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
  navbarTap: function(e) {
    var typeid = e.currentTarget.dataset.idx;
    var that = this;
    common.PostMain('article/index', {
      article_type: typeid
    }, function(data) {
      for (var i = 0; i < data.length; i++) {
        data[i]['details'] = JSON.parse(data[i].article_details);
      }
      that.setData({
        article: data,
        currentTab: e.currentTarget.dataset.idx
      });
    })
  },
  navbarTap1: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  xiangqing: function(e) {
    // console.log(e.currentTarget.dataset.id)
    // return null;
    wx.navigateTo({
      url: "article/article?id=" + e.currentTarget.dataset.id,
    })
  },
})