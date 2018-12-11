// pages/PromotionCenter/PromotionCenter.js
var App = getApp();
var common = require('../../utils/common.js');
var WxParse = require('../../wxParse/wxParse.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  hideRule: function() {
    this.setData({
      isRuleTrue: false
    })
  },
  showRule: function() {
    var that = this;
    if (that.data.rule) {
      that.setData({
        isRuleTrue: true,
      })
    } else {
      wx.showNavigationBarLoading();
      common.PostMain('user/state', {
        id: 2
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
    var user_id = wx.getStorageSync('userInfo').user_id
    wx.showNavigationBarLoading();
    var that = this;
    common.PostMain('user/tuiguang', {
      user_id: user_id
    }, function(data) {
      wx.setStorageSync('userInfo', data.res);
      that.setData({
        userInfo: data.res,
        fxs: data.fxs,
        need: 0,
      });
      wx.hideNavigationBarLoading();
    });
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
  money: function() {
    wx.navigateTo({
      url: "PutForward/PutForward",
    })
  },
  exchange: function() {
    wx.navigateTo({
      url: "Exchange/Exchange",
    })
  },
  team: function() {
    wx.navigateTo({
      url: "../mine/MyTeam/MyTeam",
    })
  },
  moneydan: function() {
    wx.navigateTo({
      url: "Bill/Bill",
    })
  },
  jifendan: function() {
    wx.navigateTo({
      url: "IntegralDetail/IntegralDetail",
    })
  },

  /**
   * 分享按钮
   */
  share: function() {
    wx.showNavigationBarLoading();
    var userInfo = wx.getStorageSync('userInfo');
    var that = this;
    var data = {
      flag: true,
    };
    // if (!that.data.shareImage) {
    if (!userInfo.share_image) {
      common.PostMain('share/getwxacodeunlimit', {
        user_id: userInfo.user_id
      }, function(resData) {
        wx.setStorageSync('userInfo', resData.userInfo);
        data['shareImage'] = resData.userInfo.share_image
        that.setData(data)
      });
    }
    data['shareImage'] = userInfo.share_image;
    that.setData(data);
    wx.hideNavigationBarLoading();
  },
  // 遮罩层隐藏
  conceal: function() {
    this.setData({
      flag: false
    })
  },
  /**
   * 保存二维码
   */
  saveShareImage: function() {
    var that = this;
    wx.showActionSheet({
      itemList: ['保存至相册'],
      success: function(res) {
        wx.downloadFile({
          url: that.data.shareImage,
          success: function(res) {
            if (res.statusCode == 200) {
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function() {
                  wx.showToast({
                    title: '已保存到相册！',
                  })
                }
              })
            }
          }
        })
      }
    })
    return null;

  },
})