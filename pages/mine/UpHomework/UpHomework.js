// pages/mine/UpHomework/UpHomework.js
var App = getApp();
var common = require('../../../utils/common.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: [],
    userInfo: wx.getStorageSync('userInfo'),
    canChoose: true,
    filepath: App.globalData.filepath,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    common.onLoad(options);
    wx.hideShareMenu();
    let that = this;
    that.data.id = options.id;
    common.PostMain('userhomework/details', {
      user_id: that.data.userInfo.user_id,
      id: that.data.id
    }, function(res) {
      let param = {
        data: res
      };
      if (res.image.length != 0) {
        for (var i = 0; i < res.image.length; i++) {
          res.image[i] = that.data.filepath + res.image[i].url
        }
        param.tempFilePaths = res.image;
        param.canChoose = false;
      }
      that.setData(param)
    });
  },
  submit: function(e) {
    var that = this;
    var homework_reply = e.detail.value.homework_reply;
    common.PostMain('userhomework/create', {
      homework_reply: homework_reply,
      id: that.data.id,
      user_id: that.data.userInfo.user_id
    }, function(result) {
      var uploadfiledone = [];
      var tempFilePaths = that.data.tempFilePaths;
      if (tempFilePaths.length) {
        //循环上传图片
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (tempFilePaths[i]) {
            var uploadFile = wx.uploadFile({
              url: App.globalData.apiurl + 'userhomework/imageUpload',
              filePath: tempFilePaths[i],
              name: 'image',
              formData: {
                id: that.data.id,
                sort: i + 1,
              },
              success(res) {
                const data = res.data
                //do something
              }
            });
            uploadFile.onProgressUpdate((res) => {
              console.log('上传进度', res.progress)
              wx.showLoading({
                title: res.progress + '%',
              });
              if (res.progress == 100) {
                uploadfiledone.push(1);
                if (uploadfiledone.length == tempFilePaths.length) {
                  that.successTips();
                }
              }
            })
          }
        }
      } else {
        that.successTips();
      }
    });
  },
  successTips: function() {
    wx.showToast({
      title: '提交成功！',
      success: function() {
        setTimeout(function() {
          wx.navigateTo({
            url: '/pages/mine/MyHomework/MyHomework',
          })
        }, 2000)
      }
    })
  },
  chooseImage: function() {
    var that = this
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        var oldTempFilePaths = that.data.tempFilePaths;
        var newTempFilePaths = oldTempFilePaths.concat(tempFilePaths).splice(0, 9);
        console.log(newTempFilePaths)
        that.data.tempFilePaths = newTempFilePaths;
        that.setData({
          tempFilePaths: newTempFilePaths,
        })
      }
    })
  },
  /**
   * 删除图片
   */
  closeimg: function(res) {
    var index = res.currentTarget.dataset.index;
    var tempFilePaths = this.data.tempFilePaths
    tempFilePaths.splice(index, 1);
    console.log(this.data.tempFilePaths)
    this.setData({
      tempFilePaths: tempFilePaths
    })
  },
  /**
   * 预览已经上传的图片
   */
  previewImage: function(res) {
    var that = this;
    wx.previewImage({
      urls: that.data.tempFilePaths,
      current: that.data.tempFilePaths[res.currentTarget.dataset.index]
    })
  },
})