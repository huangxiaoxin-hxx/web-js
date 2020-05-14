<template>
  <div class="topic">
    <div class="list">
      <li v-for="(item, index) in topicList" :key="index" @click="topicDetail(item.id)">
        <div class="t-img">
          <img :src="item.scene_pic_url" alt="">
        </div>
        <div class="info">
          <p>{{item.title}}</p>
          <p>{{item.subtitle}}</p>
          <p>{{item.price_info}}元起</p>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
import {get} from '../../utils'
export default {
  data () {
    return {
      page: 1,
      topicList: [],
      total: ''
    }
  },
  // 下拉刷新
  onPullDownRefresh () {  // 下拉刷新上拉加载的功能默认是被关闭的，需要开启
    // this.page = 1
    this.getListData()
    wx.stopPullDownRefresh()
  },
  onReachBottom () {
    this.page = this.page + 1
    if (this.page > this.total) {
      return false
    }
    this.getListData()
  },
  mounted () {
    this.getListData(true)
  },
  methods: {
    async getListData (first) {
      const data = await get ('/topic/listaction', {
        page: this.page
      })
      console.log(data)
      this.total = data.total
      if (first) {
        this.topicList = data.data
      } else {
        this.topicList = this.topicList.concat(data.data)
      }
    },
    topicDetail(id) {
      wx.navigateTo({ url: '/pages/topicdetail/main?id=' + id });
    }
  }
}
</script>

<style lang="less" scoped>
@import './style.less';
</style>