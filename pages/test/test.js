// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messages: [],
    inputValue: '',
    welcome: '',
    client_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { welcome, client_id } = options;

    // 更新页面数据
    this.setData({
      welcome: welcome, // 解码传递过来的字符串
      client_id: client_id,
    });
    console.log(client_id);
    wx.request({
      url: `https://54b9-58-60-1-30.ngrok-free.app/start?client_id=${client_id}`,
      method: 'POST',
      header: {
        'ngrok-skip-browser-warning': '69420',
        'Content-Type': 'json', // 告诉服务器请求体是 JSON 格式
      },
      data: {
        client_id: client_id
      },
      success: (res) => {
        if (res.data && res.data.reply && res.data.client_id) {
          this.setData({
            messages: [...this.data.messages, { id: Date.now(), type: 'bot', content: res.data.reply }]
          });
        }
      },
      fail: (err) => {
        console.error('请求失败', err);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  onInput(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  sendMessage() {
    const { inputValue, messages } = this.data;
    if (!inputValue.trim()) return;

    // 添加用户消息到消息列表
    const newMessages = [...messages, { id: Date.now(), type: 'user', content: inputValue }];
    this.setData({
      messages: newMessages,
      inputValue: ''
    });

    // 调用后端接口获取机器人回复
    wx.request({
      url: `https://54b9-58-60-1-30.ngrok-free.app/chat?client_id=${this.data.client_id}`, 
      method: 'POST',
      data: { message: inputValue },
      success: (res) => {
        if (res.data && res.data.reply) {
          this.setData({
            messages: [...this.data.messages, { id: Date.now(), type: 'bot', content: res.data.reply }]
          });

          if (res.data.finish){
            wx.navigateTo({
              url: `../result/result?client_id=${this.data.client_id}`,
            });
          }
        }
      },
      fail: (err) => {
        console.error('请求失败', err);
      }
    });
  },

  autoScroll() {
    let that = this
    let query = wx.createSelectorQuery()
    // 通过class选择器定位到scorll-view
    query.select('.chat-content').boundingClientRect(res => {
        that.setData({
            // 由于res.height效果不明显，所以乘以100系数，这个系数可以根据实际效果调整
            scrollTop: res.height * 100
        })
    })
    query.exec(res => {})
  },
})
