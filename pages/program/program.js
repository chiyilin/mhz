// pages/program/program.js
var App = getApp();
var common = require('../../utils/common.js');
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
    wx.showNavigationBarLoading();
    var that = this;
    common.PostMain('category/index', {}, function(data) {
      that.setData({
        filepath: getApp().globalData.filepath,
        showView: (options.showView == "true" ? true : false),
        data: data
      });
      console.log(data)
      wx.hideNavigationBarLoading();
    });
  },
  /**
   * 跳转至小分类
   */
  navigate_min_category: function(e) {
    var category_id = e.currentTarget.dataset.categoryid;
    wx.navigateTo({
      url: 'programlist/programlist?category_id=' + category_id,
    });
  },
  /*
   * 失焦搜索
   */
  resignFocus: function(e) {
    var value = e.detail.value;
    console.log(value)
    wx.navigateTo({
      url: '/pages/program/programlist/programlist?content=' + value,
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
  onChangeShowState: function() {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
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
    return common.share();
  },

})