// pages/PromotionCenter/product/product.js
var App = getApp();
var common = require('../../../utils/common.js');
var WxParse = require('../../../wxParse/wxParse.js');
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
  chooseAddr: function() {
    wx.navigateTo({
      url: '/pages/address/ChooseAddress/ChooseAddress',
    })
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
      WxParse.emojisInit('[]', "/wxParse/emojis/", {
        "00": "00.gif",
        "01": "01.gif",
        "02": "02.gif",
        "03": "03.gif",
        "04": "04.gif",
        "05": "05.gif",
        "06": "06.gif",
        "07": "07.gif",
        "08": "08.gif",
        "09": "09.gif",
        "09": "09.gif",
        "10": "10.gif",
        "11": "11.gif",
        "12": "12.gif",
        "13": "13.gif",
        "14": "14.gif",
        "15": "15.gif",
        "16": "16.gif",
        "17": "17.gif",
        "18": "18.gif",
        "19": "19.gif",
      });
      that.setData({
        filepath: App.globalData.filepath,
        jfproduct: data.jfproduct,
        jifen: data.jfproduct.jfproduct_money,
        needjifen: data.jfproduct.jfproduct_money,
        user: data.user,
        user_name: data.user,
        needj: 0,
      });
      WxParse.wxParse('details', 'html', data.jfproduct.jfproduct_introduce, that, 5);
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
    // return null;
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