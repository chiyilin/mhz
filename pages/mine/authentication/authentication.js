var App = getApp();
var common = require('../../../utils/common.js');
// pages/mine/authentication/authentication.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var user_id = wx.getStorageSync('userInfo').user_id;
    this.setData({
      user_id: user_id,
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
  chooseImage: function(e) {
    var that = this
    //判断是正面还是反面
    var index = e.currentTarget.dataset.index
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.data.tempFilePaths[index] = res.tempFilePaths[0]
        console.log(that.data.tempFilePaths)
        // that.data.tempFilePaths.push(res.tempFilePaths[0])
        that.setData({
          tempFilePaths: that.data.tempFilePaths
        })
      }
    })
  },

  previewImage: function(res) {
    var that = this;
    wx.previewImage({
      urls: that.data.tempFilePaths,
      current: that.data.tempFilePaths[res.currentTarget.dataset.index]
    })
  },

  /**
   * 实名认证 表单提交
   */
  formSubmit: function(e) {
    var that = this;
    console.log(e)
    var user_id = e.detail.value.hidden;
    var smrz_name = e.detail.value.smrz_name;
    var smrz_code = e.detail.value.smrz_code;
    var tempFilePaths = that.data.tempFilePaths
    if (smrz_name.length == 0 || smrz_code.length == 0 || tempFilePaths.length != 2) {
      wx.showToast({
        title: '请填写完整！',
        icon: 'none'
      })
      return null;
    }
    //已经上传完成的数组
    var uploadfiledone = [];
    //身份证正反面数组
    var idcard = {};
    for (var i = 0; i < tempFilePaths.length; i++) {
      var uploadFile = wx.uploadFile({
        url: App.globalData.apiurl + 'usersmrz/imgupload',
        filePath: tempFilePaths[i],
        name: 'image',
        formData: {
          //正反面标识
          sign: i + 1,
        },
        success: function(e) {
          var data = JSON.parse(e.data)
          if (data.data[1]) {
            idcard.front = data.data[1]
          } else if (data.data[2]) {
            idcard.side = data.data[2]
          } else {

          }
          if (idcard.front && idcard.side) {
            common.PostMain('usersmrz/addsmrz', {
              user_id: user_id,
              smrz_name: smrz_name,
              smrz_code: smrz_code,
              front: idcard.front,
              side: idcard.side
            }, function(e) {
              wx.showToast({
                title: '已提交，等待审核！',
                icon: 'none',
                success: function() {
                  console.log(idcard)
                  setTimeout(function() {
                    wx.navigateBack({
                      delta:1
                    })
                  }, 1500)
                }
              })
            })
          }
        }
      });
      uploadFile.onProgressUpdate((res) => {
        wx.showLoading({
          title: res.progress + '%',
        });
        if (res.progress == 100) {
          uploadfiledone.push(1);
          if (uploadfiledone.length == tempFilePaths.length) {

          }
        }
      })
    }
  },
})