// pages/mine/UpHomework/UpHomework.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.data.tempFilePaths = tempFilePaths;
        that.setData({
          tempFilePaths: tempFilePaths
        })
      }
    })
  },
  /**
   * 删除图片
   */
  closeimg: function (res) {
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
  previewImage: function (res) {
    var that = this;
    wx.previewImage({
      urls: that.data.tempFilePaths,
      current: that.data.tempFilePaths[res.currentTarget.dataset.index]
    })
  },

  /**
   * 表单提交
   */
  bindFormSubmit: function (e) {

    var userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo)
    var data = {
      agent_id: userInfo.agent_id,
      user_id: userInfo.user_id,
      list_comment_content: e.detail.value.textarea,
      list_comment_star: this.data.star,
    };
    var that = this;
    common.PostMain('ProdListComment/addcomment', data, function (data) {
      var tempFilePaths = that.data.tempFilePaths;
      //循环上传图片
      for (var i = 0; i < tempFilePaths.length; i++) {
        if (tempFilePaths[i]) {
          wx.uploadFile({
            url: app.globalData.apiurl + 'ProdListComment/imgupload',
            filePath: tempFilePaths[i],
            name: 'image',
            formData: {
              'list_comment_id': data.list_comment_id,
              'agent_id': userInfo.agent_id,
              'user_id': userInfo.user_id,
            },
            success(res) {
              const data = res.data
              //do something
            }
          })
        }
      }
    });

  },
})