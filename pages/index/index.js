// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Component({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },
  methods: {
    // 事件处理函数
    bindViewTap() {
      wx.navigateTo({
        url: '../logs/logs'
      })
    },
    onChooseAvatar(e) {
      const { avatarUrl } = e.detail
      const { nickName } = this.data.userInfo
      this.setData({
        "userInfo.avatarUrl": avatarUrl,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },
    onInputChange(e) {
      const nickName = e.detail.value
      const { avatarUrl } = this.data.userInfo
      this.setData({
        "userInfo.nickName": nickName,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },
    getUserProfile(e) {
      wx.getUserProfile({
        desc: '展示用户信息',
        success: (res) => {
          console.log(res)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    },
    click() {
      wx.request({
        url: 'https://54b9-58-60-1-30.ngrok-free.app/hello', 
        method: 'POST',
        header: {
          'ngrok-skip-browser-warning': '69420',
          'Content-Type': 'json', // 告诉服务器请求体是 JSON 格式
        },
        success: (res) => {
          if (res.data && res.data.reply) {
            // 请求成功后，跳转到目标页面并传递数据
            wx.navigateTo({
              url: `../test/test?welcome=${res.data.reply}&client_id=${res.data.client_id}`,
            });
          }
          console.log(res.data);
        },
        fail: (err) => {
          console.error('请求失败', err);
        }
      });
    },
    // 新增的跳转函数
    navigateToLogs() {
      wx.navigateTo({
        url: '../logs/logs'
      })
    }
  },
})
