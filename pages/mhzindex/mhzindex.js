// pages/mhzindex/mhzindex.js
var App = getApp();
var common = require('../../utils/common.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    autoplay: true,
    interval: 3000,
    duration: 1000,
    currentTab: [0, 0, 0],
    //默认展示报名还是报考
    defaultTab:0,
    filepath: App.globalData.filepath
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
      console.log(data)
      that.setData({
        apiData: data
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
  /**
   * 课程选项卡切换
   */
  navbarTap: function(e) {
    var that = this;
    //分类ID
    var category_id = e.currentTarget.dataset.category_id;
    //大的索引
    var index = e.currentTarget.dataset.index;
    //小分类的索引
    var indexitem = e.currentTarget.dataset.indexitem
    that.data.currentTab[index] = indexitem
    common.PostMain('index/product', {
      category_id: category_id,
      index: index
    }, function(data) {
      var temp = that.data.currentTab;
      var apiData = that.data.apiData;
      if (index == 0) {
        apiData.popularCourses = data;
      } else if (index == 1) {
        apiData.recommendCourses = data;
      } else if (index == 2) {
        apiData.newCourses = data;
      }
      that.setData({
        //小分类的选项卡改变
        currentTab: temp,
        apiData: apiData
      })
    })
  },
  /**
   * 报名报考选项卡切换
   */
  swichNav: function(e) {
    this.setData({
      defaultTab: e.target.dataset.currents,
    })
  },
  /**
   * 课程详情
   */
  coursesDetails: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../program/buy/buy?productid=" + id,
    })
  },
  /**
   * 查看更多课程
   */
  coursesList: function(e) {
    var index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: "coursesList/coursesList?index=" + index,
    });
  },
  /**
   * 跳转至报名报考页面
   */
  navigate_sign:function(e){
    var index=e.currentTarget.dataset.index;
    wx.navigateTo({
      url: 'examination/examination?index=' + index,
    })
  }
})