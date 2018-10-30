var App = getApp();
var common = require('../../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: true,
    interval: 3000,
    duration: 1000,
    currentTab: 0,
    isShow: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var id = options.id;
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    common.PostMain('courses/index', {
      id: id
    }, function (data) {
      that.setData({
        filepath: getApp().globalData.filepath,
        product: data.product,
        category: data.category,
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
  navbarTap: function (e) {
    var category_ids = e.currentTarget.dataset.ids;
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    common.PostMain('courses/product2', {
      category_ids: category_ids
    }, function (data) {
      that.setData({
        filepath: getApp().globalData.filepath,
        product: data.product,
        currentTab: e.currentTarget.dataset.idx
      });
      wx.hideLoading();
    });
  },
  xiangqing: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../../program/buy/buy?productid=" + id,
    })
  },
})