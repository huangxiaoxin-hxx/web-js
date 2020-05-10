<template>
  <div class="mappage">
    <div class="section">
      <input type="text" placeholder="搜索" focus="true" v-model="keywords" @input="bindInput">
    </div>
    <scroll-view :scroll-y="true" class="addcont" style="height: 500rpx;">
      <div class="result" @touchstart="bindSearch(item.name)" v-for="(item, index) in tips" :key="index">
        {{item.name}}
      </div>
    </scroll-view>

    <div class="map_container">
      <div class="title">显示当前位置:</div>
      <map id="map" class="map" :longitude="longitude" :latitude="latitude" scale="16"   :markers="markers"></map>
    </div>
  </div>
</template>

<script>
import amapFile from '../../utils/amap-wx.js'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      tips: [],
      longitude: 0,
      latitude: 0,
      markers: [],
      keywords: ''
    }
  },
  mounted() {
    this.getMapaddress()
  },
  methods: {
    ...mapMutations(['update']),
    getMapaddress() {
      let _this = this
      var myAmapFun = new amapFile.AMapWX({key:'58c9b3e07ecfe5ad74d18a227b6a09c2'});
      myAmapFun.getRegeo({
        iconPath:"/static/images/marker.png",
        iconWidth: 22,
        iconHeight: 32,
        success: function (data) {
          // 成功回调
          console.log(data)
          let markers = [
            {
              id: data[0].id,
              latitude: data[0].latitude,
              longitude: data[0].longitude,
              width: data[0].width,
              // height: height[0].height
            }
          ]
          _this.markers = markers
          _this.longitude = data[0].longitude
          _this.latitude = data[0].latitude
        },
        fail: function (info) {
          // 失败回调
          console.log(info,"error")
          _this.cityName = "北京"
        }
      })
    },
    bindInput(e) {
      // console.log(e.target.value)
      let _this = this
      let keywords = _this.keywords
      var myAmapFun = new amapFile.AMapWX({key:'58c9b3e07ecfe5ad74d18a227b6a09c2'})
      myAmapFun.getInputtips({
        keywords: keywords,
        loaction: '',
        success: function(data) {
          // console.log(data)
          if(data && data.tips) {
            _this.tips = data.tips
          }
        }
      })
    },
    bindSearch(cityName) {
      this.update({cityName: cityName})
      wx.navigateBack({
        delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "./style";
</style>