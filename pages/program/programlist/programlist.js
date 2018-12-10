var App = getApp();
var common = require('../../../utils/common.js');
// pages/program/programlist/programlist.js
var request = function(that) {
  common.PostMain('category/search', {
    category_id: that.data.category_id,
    content: that.data.content,
    jiageStatus: that.data.jiageStatus,
    renqiStatus: that.data.renqiStatus,
    tuijianStatus: that.data.tuijianStatus,
  }, function(data) {
    console.log(data)
    that.setData({
      data: data.data,
      config: data.config,
      filepath: App.globalData.filepath,
    });
  });
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: null,
    jiageStatus: 1,
    renqiStatus: 1,
    tuijianStatus: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    common.onLoad(options);
    var that = this;
    that.data.category_id = options.category_id;
    if (options.content){
      wx.setNavigationBarTitle({
        title: '"' + options.content+'"的搜索结果',
      })
    }
    that.data.content = options.content;
    request(that);
    return null;
    wx.showLoading({
      title: '加载中',
    });
    common.PostMain('category/product', {
      category_id: category_id
    }, function(data) {
      that.setData({
        data: data.data,
        config: data.config,
        filepath: getApp().globalData.filepath,
        cateid: category_id,
        xuanzhong: 1,
      });
      wx.hideLoading();
    });
  },
  //获取焦点
  activeFocus: function(event) {
    var that = this;
    that.setData({
      autoFocus: true
    });
  },
  //失去焦点
  resignFocus: function(e) {
    var that = this;
    //焦点开关
    that.setData({
      autoFocus: false
    });
    that.data.content = e.detail.value;
    //公共请求！
    request(that);
  },
  SwitchTab: function(options) {
    var that = this;
    var param = options.currentTarget.dataset;
    switch (param.tab) {
      //推荐变换
      case 1:
        var tuijianStatus = param.tuijianstatus;
        if (tuijianStatus != 2) {
          tuijianStatus++
        } else {
          var tuijianStatus = 1;
        }
        that.setData({
          tuijianStatus: tuijianStatus,
          jiageStatus: 1,
          renqiStatus: 1,
        })
        break;
        //价格变换
      case 2:
        var jiageStatus = param.jiagestatus;
        if (jiageStatus != 3) {
          jiageStatus++
        } else {
          var jiageStatus = 1;
        }
        that.setData({
          jiageStatus: jiageStatus,
          renqiStatus: 1,
          tuijianStatus: 1,
        })
        break;
        //人气变换
      case 3:
        var renqiStatus = param.renqistatus;
        if (renqiStatus != 3) {
          renqiStatus++
        } else {
          var renqiStatus = 1;
        }
        that.setData({
          renqiStatus: renqiStatus,
          jiageStatus: 1,
          tuijianStatus: 1,
        })
        break;

    }
    request(that);
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
    return common.share();
  },
  xiangqing: function(e) {
    if (e.currentTarget.dataset.taocid) {
      var taocid = e.currentTarget.dataset.taocid;
      wx.navigateTo({
        url: '../buy/buy?taocid=' + taocid,
      })
    } else {
      var productid = e.currentTarget.dataset.productid;
      wx.navigateTo({
        url: '../buy/buy?productid=' + productid,
      })
    }
  },
})