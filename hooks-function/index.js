// 回调函数
// 异步请求

let getInfo = function (keywords, callback) {  // 他就叫高阶函数
  $.ajax({
    url: 'http://musicapi.leanapp.cn/search',
    data: {
      keywords
    },
    success: function(res) {
      console.log(res)
      callback && callback(res.result.songs)
    }
  })
}

let render = function (data) {
  let template = '';
  let set = new Set(data); // 去重
  data = [...set]
  for (let i = 0; i < 10; i++) {
    let item = data[i]
    let name = item.name
    let singer = item.artists[0].name
    let pic = item.album.picUrl
    let time = item.albun.publishTime
  }
}
getInfo('周杰伦',render)