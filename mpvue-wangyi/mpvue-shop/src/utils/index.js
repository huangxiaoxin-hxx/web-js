function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

// 请求数据的封装

const host = "http://localhost:3000/wy"
export { host }

function request (url, method, data, header = {}) {
  wx.showLoading({
    title: '加载中', //提示的内容
  });
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url, //开发者服务器接口地址",
      data: data, //请求的参数",
      method: method,
      dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
      header: {
        "content-type": "application/json"
      },
      success(res) {
        wx.hideLoading();
        resolve(res.data)
      },
      fail(error) {
        wx.hideLoading();
        reject(error)
      },
      complete() {
        wx.hideLoading();
      }
    });
  })
}

export function get (url, data) {
  return request(url, 'GET', data)
}

export function post (url, data) {
  return request(url, 'POST', data)
}
// 获取用户id
export function getStorageOpenid() {
  const openId = wx.getStorageSync('openId');
  if(openId) return openId
  else return ''
}
// 判断用户是否登录了小程序
export function login() {
  const userInfo = wx.getStorageSync('userInfo');
  if (userInfo) {
    return userInfo
  }
}

export function toLogin () {
  const userInfo = wx.getStorageSync('userInfo');
  if (!userInfo) {
    return wx.navigateTo({ url: '/pages/login/main' });
  } else {
    return true
  }
}

export default {
  formatNumber,
  formatTime
}
