var App = getApp();
var common = require('../../../utils/common.js');
// pages/mine/MySubject/MySubject.js
var request = function(that) {
  wx.showLoading({
    title: '加载中',
  });
  common.PostMain('user/kecheng', {
    user_id: wx.getStorageSync('userInfo').user_id
  }, function(data) {
    var countProd = [];
    var countProdT = [];

    for (var i = 0; i < data.length; i++) {
      if (data[i].product) {
        countProd.push(1)
      }
      if (data[i].producttaoc) {
        countProdT.push(1)
      }
    }
    console.log(countProd)
    // return null;
    that.setData({
      kecheng: data,
      countProd: countProd,
      countProdT: countProdT,

    });
    console.log(data)
    wx.hideLoading();
  });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    currentTab: 0,
    filepath: App.globalData.filepath,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    common.onLoad(options);
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
    request(this)
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
  swichNav: function(e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var showMode = e.target.dataset.current == 0;
      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
    }
  },
  pingjia: function(e) {
    var listid = e.currentTarget.dataset.listid;
    wx.navigateTo({
      url: '../../comment/comment?list_id=' + listid,
    })
  },
  xiangqing: function(e) {
    var id = e.currentTarget.dataset.productid;
    wx.navigateTo({
      url: "../../program/buy/buy?productid=" + id,
    })
  },
  taocan: function(e) {
    var id = e.currentTarget.dataset.taocid;
    wx.navigateTo({
      url: '../../program/buy/buy?taocid=' + id,
    })
  },
})