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
    filepath: App.globalData.filepath,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var index = options.index;
    console.log(index)
    that.data.index = index;
    if (index == 0) {
      var title = '热门课程';
    } else if (index == 1) {
      var title = '推荐课程';
    } else {
      var title = '最新课程';
    }
    wx.setNavigationBarTitle({
      title: title,
    })
    wx.showLoading({
      title: '加载中',
    });
    common.PostMain('courses/index', {
      index: index
    }, function(data) {
      that.setData({
        productList: data.productList,
        category: data.category,
      });
      console.log(data)
      wx.hideLoading();
    });
  },
  /**
   * 选项卡切换
   */
  navbarTap: function(e) {
    var that = this;
    var category_id = e.currentTarget.dataset.category_id;
    wx.showLoading({
      title: '加载中',
    });
    common.PostMain('courses/product', {
      index: that.data.index,
      category_id: category_id
    }, function(data) {
      that.setData({
        productList: data.productList,
        currentTab: category_id
      });
      wx.hideLoading();
    });
  },
  /**
   * 跳转至产品详情
   */
  xiangqing: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../../program/buy/buy?productid=" + id,
    })
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