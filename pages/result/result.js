// pages/result/result.js
Page({
  data: {
    image: '',
    resultText: '',
    client_id: '',
  },

  onLoad(options) {
    const { client_id } = options;
    this.setData({
      client_id: client_id,
    });
    wx.request({
      url: `https://54b9-58-60-1-30.ngrok-free.app/result?client_id=${client_id}`,
      method: 'POST',
      header: {
        'ngrok-skip-browser-warning': '69420',
        'Content-Type': 'application/json', // 确保请求头正确
      },
      data: {
        client_id: client_id
      },
      success: (res) => {
        if (res.data && res.data.image && res.data.text) {
          // 将 Base64 编码的图像数据转换为可以显示的格式
          const base64Image = `data:image/png;base64,${res.data.image}`;
          this.setData({
            image: base64Image,
            resultText: res.data.text
          });
        }
      },
      fail: (err) => {
        console.error('请求失败', err);
      }
    });
  }
});