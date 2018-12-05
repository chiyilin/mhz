// pages/PromotionCenter/product/product.js
var App = getApp();
var common = require('../../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // input默认是1 
    num: 1,
    // 使用data数据对象设置样式名 
    minusStatus: 'disabled'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    common.onLoad(options);
    var that = this;
    var jfproduct_id = options.jfproduct_id;
    var user_id = wx.getStorageSync('userInfo').user_id;
    wx.showLoading({
      title: '加载中',
    });
    common.PostMain('jfproduct/jfproduct', {
      jfproduct_id: jfproduct_id,
      user_id: user_id
    }, function(data) {
      that.setData({
        filepath: App.globalData.filepath,
        jfproduct: data.jfproduct,
        jifen: data.jfproduct.jfproduct_money,
        needjifen: data.jfproduct.jfproduct_money,
        user: data.user,
        user_name: data.user,
        needj: 0,
      });
      console.log(data)
      wx.hideLoading();
    });
  },
  showRule: function() {
    this.setData({
      isRuleTrue: true
    })
  },
  //关闭规则提示
  hideRule: function() {
    this.setData({
      isRuleTrue: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  chooseAddr: function() {
    wx.navigateTo({
      url: '/pages/address/address/address',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    common.PostMain('user/addrList', {
      user_id: wx.getStorageSync('userInfo').user_id
    }, function(e) {
      that.setData({
        userAddr: e,
        nowIndex: wx.getStorageSync('userAddrIndex') ? wx.getStorageSync('userAddrIndex') : 0
      });
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
  bindMinus: function() {
    var num = this.data.num;
    // 如果大于1时，才可以减 
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态 
    var minusStatus = num <= 1 ? 'disabled' : 'normal';

    // 将数值与状态写回 
    var jf = this.data.jifen;
    // 将数值与状态写回 
    this.setData({
      num: num,
      needjifen: jf * num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function() {
    var num = this.data.num;
    // 不作过多考虑自增1 
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态 
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回 
    var jf = this.data.jifen;
    // 将数值与状态写回 
    this.setData({
      num: num,
      needjifen: jf * num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function(e) {
    console.log(e)
    // return null;
    var jf = this.data.jifen;
    var num = e.detail.value;
    if (num == 0) {
      this.setData({
        minusStatus: 'disabled'
      });
      var num = 1;
    }
    // 将数值与状态写回 
    this.setData({
      num: num,
      needjifen: jf * num,
    });
  },
  duihuan: function(e) {
    console.log(e)
    var that = this;
    var user_id = wx.getStorageSync('userInfo').user_id;
    var needjifen = e.detail.target.dataset.need;
    var num = e.detail.target.dataset.num;
    var jfproduct_id = e.detail.target.dataset.jfproductid;
    var data = {
      user_id: user_id,
      jfproduct_id: jfproduct_id,
      needjifen: needjifen,
      num: num,
      address_id: that.data.userAddr[that.data.nowIndex].address_id,
      formid: e.detail.formId
    };
    console.log(data)
    wx.request({
      url: App.globalData.apiurl + 'usertuiguang/index',
      method: "POST",
      data: data,
      success: function(res) {
        wx.showToast({
          title: '兑换成功',
          icon: 'success',
        });
        that.setData({
          num: 1,
          needj: needjifen
        })
      },
    });
  },
})