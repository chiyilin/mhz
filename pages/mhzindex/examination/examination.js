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
    userInfo: wx.getStorageSync('userInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //初次加载的时候选择报名还是报考
    var index = options.index;
    var title = index == 0 ? '线上报名' : '取证报考';
    wx.setNavigationBarTitle({
      title: title
    })
    that.data.state = Number(index) + 1;
    wx.showLoading({
      title: '加载中',
    });
    common.PostMain('baoming/index', {
      state: that.data.state
    }, function(data) {
      that.setData({
        currentTab: index,
        baoming: data.baoming,
        selectData: data.baoming,
      });
      wx.hideLoading();
    });
  },
  /**
   * 展开、隐藏下拉菜单
   */
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  bindchange: function(e) {
    console.log(e)
    var that = this;
    wx.showNavigationBarLoading();
    var info = that.data.selectData[e.detail.value];
    // return null;
    common.PostMain('baoming/baoming', {
      baomingid: info.baokao_id,
      state: that.data.state,
      user_id: that.data.userInfo.user_id
    }, function(data) {
      that.setData({
        selectIndex: e.detail.value,
        show: !that.data.show,
        name: info.baokao_name,
        baomings: data.baomings,
        user: data.user,
      });
      wx.hideNavigationBarLoading();
    });
  },
  // 点击下拉列表
  optionTap(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    var state = e.currentTarget.dataset.state;
    var name = e.currentTarget.dataset.name;
    var user_id = wx.getStorageSync('userinfo').user_id;
    //获取点击的下拉列表的下标
    let selectIndex = e.currentTarget.dataset.index;
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
        selectIndex: selectIndex,
        show: !that.data.show,
        name: name,
        baomings: data.baomings,
        user: data.user,
      });
      wx.hideLoading();
    });
  },
  /**
   * 线上报名、取证报考选项卡切换
   */
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
          show: false,
          baomings: data.baoming,
          name: '',
          baoming: data.baoming,
          selectData: data.baoming,
          currentTab: e.target.dataset.current,
        });
        wx.hideLoading();
      });
    }
  },
  /**
   * 支付报名
   */
  baom: function(e) {
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    var index = that.data.selectIndex;
    var data = that.data.selectData[index]
    common.PostMain('baoming/applyPay', {
      baokao_id: data.baokao_id,
      user_id: userInfo.user_id,
    }, function(res) {
      wx.requestPayment({
        timeStamp: res.timeStamp,
        nonceStr: res.nonce_str,
        package: 'prepay_id=' + res.prepay_id,
        signType: 'MD5',
        paySign: res.sign,
        success: function() {
          //跳转至报名成功通知页面
          wx.navigateTo({
            url: '../finish/finish?list_id=' + res.list_id
          })
        }
      })
      wx.hideLoading();
    });
    return null;
    var baokao_id = e.currentTarget.dataset.baokaoid;

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
  onShareAppMessage: function() {

  },
})