// pages/memberCenter/memberCenter.js
var App = getApp();
var common = require('../../utils/common.js');
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 权益说明
   */
  showRule: function() {
    var that = this;
    if (that.data.rule) {
      that.setData({
        isRuleTrue: true,
      })
    } else {
      wx.showNavigationBarLoading();
      common.PostMain('user/state', {
        id: 1
      }, function(e) {
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
        WxParse.wxParse('details', 'html', e.content, that, 5);
        that.setData({
          rule: e,
          isRuleTrue: true,
        })
        wx.hideNavigationBarLoading();
      });
    }
  },
  //关闭规则提示
  hideRule: function() {
    this.setData({
      isRuleTrue: false
    })
  },
  submit: function() {
    var that = this;
    var param = {
      id: that.data.data[that.data.current].id,
      user_id: wx.getStorageSync('userInfo').user_id
    };
    console.log(param)
    common.PostMain('memberprice/goumai', param, function(data) {
      wx.requestPayment({
        timeStamp: data.timeStamp,
        nonceStr: data.nonce_str,
        package: 'prepay_id=' + data.prepay_id,
        signType: 'MD5',
        paySign: data.sign,
        success: function() {
          wx.showToast({
            title: '开通成功！',
            success: function() {
              setTimeout(function() {
                wx.navigateBack({
                  delta: -1
                })
              }, 1500);
            }
          })
        },
        complete: function(e) {
          if (e.errMsg == "requestPayment:fail cancel") {
            wx.showModal({
              title: '放弃支付？',
              content: '您确定要放弃支付吗？',
              confirmText: '继续支付',
              success: function(resmodal) {
                if (resmodal.confirm) {
                  that.submit();
                }
              }
            });
          }
        }
      })
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function() {
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    common.PostMain('memberprice/index', {
      user_id: userInfo.user_id
    }, function(data) {
      that.setData({
        data: data.MemberPriceModel,
        userInfo: userInfo,
        config: data.config
      })
    });
  },
  choose: function(e) {
    this.setData({
      current: e.currentTarget.dataset.index
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

  }
})