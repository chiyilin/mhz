var App = getApp();
var common = require('../../../utils/common.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    index: 0, //选择的下拉列表下标
    filepath: getApp().globalData.filepath,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var index = options.index;
    console.log(options)
    var state = index + 1;
    wx.showLoading({
      title: '加载中',
    });
    common.PostMain('baoming/index', {
      state: state
    }, function(data) {
      that.setData({
        currentTab:index,
        baoming: data.baoming,
        selectData: data.baoming,
      });
      wx.hideLoading();
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    var id = e.currentTarget.dataset.id;
    var state = e.currentTarget.dataset.state;
    var name = e.currentTarget.dataset.name;
    var user_id = wx.getStorageSync('userinfo').user_id;
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    common.PostMain('baoming/baoming', {
      baomingid: id,
      state: state,
      user_id: user_id
    }, function(data) {
      that.setData({
        index: Index,
        show: !that.data.show,
        name: name,
        baomings: data.baomings,
        user: data.user,
      });
      wx.hideLoading();
    });
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
  onShareAppMessage: function() {

  },
  swichNav: function(e) {
    var that = this;
    var state = e.currentTarget.dataset.state;
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var showMode = e.target.dataset.current == 0;
      wx.showLoading({
        title: '加载中',
      });
      common.PostMain('baoming/index', {
        state: state,
      }, function(data) {
        that.setData({
          baoming: data.baoming,
          selectData: data.baoming,
          currentTab: e.target.dataset.current,
        });
        wx.hideLoading();
      });
    }
  },
  baom: function(e) {
    var baokao_id = e.currentTarget.dataset.baokaoid;
    wx.navigateTo({
      url: '../finish/finish?baokao_id=' + baokao_id,
    })
  },
})