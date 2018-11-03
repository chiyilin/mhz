//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    wx.getSetting({
      success: function(e) {
        if (!e.authSetting['scope.userInfo']) {
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
                  // console.log(getApp().globalData.openid)
                  wx.request({
                    url: getApp().globalData.apiurl + 'login/authcheck',
                    data: {
                      openid: getApp().globalData.openid
                    },
                    success: function(data) {
                      // console.log(data.data.data)
                      if (data.data.code == 200) {
                        if (data.data.data.user_is_lock == 1) {
                          console.log('power')
                          wx.setStorageSync('userInfo', data.data.data);
                          wx.switchTab({
                            url: '/pages/mhzindex/mhzindex',
                          })
                          
                        } else {

                        }
                        // wx.redirectTo({
                        //   url: '/pages/Login/Login',
                        // })

                      }else{
                        wx.navigateTo({
                          url: '/pages/Login/againLogin/againLogin',
                        })
                      }
                    }
                  })
                }
              });
            }
          })
        } else {
          console.log('授权过')
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