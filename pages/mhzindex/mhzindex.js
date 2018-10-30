var App = getApp();
var common = require('../../utils/common.js');
// pages/mhzindex/mhzindex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: true,
    interval: 3000,
    duration: 1000,
    currentTab: 0,
    currentTab1: 0,
    currentTab2: 0,
    isShow: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    common.PostMain('index/index', {}, function(data) {
      that.setData({
        imgUrls: data.banner,
        filepath: App.globalData.filepath,
        product: data.product,
        num: data.num,
        products: data.products,
        nums: data.nums,
        productss: data.productss,
        numss: data.numss,
        categorys: data.categorys,
        baoming: data.baoming,
        baokao: data.baokao,
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
    var ids = e.currentTarget.dataset.idx;
    var that = this;
    common.PostMain('index/product', {
      ids: ids
    }, function(data) {
      that.setData({
        filepath: getApp().globalData.filepath,
        product: data.product,
        num: data.num,
        currentTab: e.currentTarget.dataset.idx,
      })
    })
  },
  navbarTap1: function(e) {
    var ids = e.currentTarget.dataset.idx;
    var that = this;
    common.PostMain('index/product', {
      ids: ids
    }, function(data) {
      that.setData({
        filepath: getApp().globalData.filepath,
        products: data.products,
        nums: data.nums,
        currentTab1: e.currentTarget.dataset.idx,
      })
    })
  },
  navbarTap2: function(e) {
    var ids = e.currentTarget.dataset.idx;
    var that = this;
    common.PostMain('index/product', {
      ids: ids
    }, function(data) {
      that.setData({
        filepath: getApp().globalData.filepath,
        productss: data.productss,
        numss: data.numss,
        currentTab2: e.currentTarget.dataset.idx,
      })
    })
  },
  swichNav: function(e) {
    if (this.data.currentTabs === e.target.dataset.currents) {
      return false;
    } else {
      var showMode = e.target.dataset.currents == 0;
      this.setData({
        currentTabs: e.target.dataset.currents,
        isShow: showMode
      })
    }
  },
  xiangqing: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../program/buy/buy?productid=" + id,
    })
  },
  hotke: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "HotCourses/HotCourses?id=" + id,
    })
  },
  newke: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "NewCourses/NewCourses?id=" + id,
    })
  },
  tuike: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'TuiCourses/TuiCourses?id=' + id,
    })
  }
})