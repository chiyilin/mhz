//app.js
App({
  onLaunch: function() {
    wx.getSetting({
      success: function(e) {
        console.log(e)
        //检测本地授权状态
        if (!e.authSetting['scope.userInfo'] || !wx.getStorageSync('userInfo').user_id) {
          // 登录
          wx.login({
            success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              // console.log(res.code)
              wx.request({
                url: getApp().globalData.apiurl + 'login/login',
                method: 'post',
                data: {
                  code: res.code
                },
                success: function(data) {
                  console.log(JSON.parse(data.data.data))
                  getApp().globalData.openid = JSON.parse(data.data.data).openid;
                  wx.setStorageSync('openid', JSON.parse(data.data.data).openid);
                  // console.log(getApp().globalData.openid)
                  wx.request({
                    url: getApp().globalData.apiurl + 'login/authcheck',
                    data: {
                      openid: wx.getStorageSync('openid')
                    },
                    success: function(data) {
                      // console.log(data.data.data)
                      if (data.data.code == 200) {

                        if (data.data.data.user_is_lock == 1) {
                          wx.setStorageSync('userInfo', data.data.data);
                          // wx.switchTab({
                          //   url: '/pages/mhzindex/mhzindex',
                          // })
                        } else {

                        }
                      } else {
                        wx.navigateTo({
                          url: '/pages/Login/Login',
                        })
                      }
                    }
                  })
                }
              });
            }
          })
        }
      }
    })
    if (!wx.getStorageSync('userInfo')) {

    }
  },
  globalData: {
    apiurl: 'https://class.chdmhz.com/api/',
    filepath: 'https://class.chdmhz.com/',
    userInfo: null,
    openid: null,
  }
})