<template>
  <div class="goods">
    <!-- 轮播图 -->
    <div class="swiper">
      <!-- 轮播图 -->
      <swiper
        class="swiper-container"
        interval="3000"
        duration="1000"
        indicator-dots
        autoplay
        circular
      >
        <block v-for="(item, index) in gallery" :key="index">
          <swiper-item class="swiper-item">
            <img :src="item.img_url" class="slide-image"/>
          </swiper-item>
        </block>
      </swiper>
      <!-- 分享按钮 open-type="share" 此属性设定该按钮为分享按钮 -->
      <button class="share" hover-class="none" open-type="share" value="">分享商品</button>
    </div>
    <!-- 轮播图底部 -->
    <div class="swiper-b">
      <div class="item">30天无忧退货</div>
      <div class="item">48小时快速退款</div>
      <div class="item">满88免邮费</div>
    </div>
    <!-- 商品信息 -->
    <div class="goods-info">
      <div class="c">
        <p>{{info.name}}</p>
        <p>{{info.goods_brief}}</p>
        <p>¥{{info.retail_price}}</p>
        <div class="brand" v-if="brand.name">
          <p>{{brand.name}}</p>
        </div>
      </div>
    </div>
    <!-- 选择数量按钮 -->
    <div class="section-nav" @click="showType">
      <div>请选择规格数量</div>
      <div></div>
    </div>
    <!-- 商品参数 -->
    <div class="attribute">
      <div class="head">
        商品参数
      </div>
      <div class="item" v-for="(item, index) in attribute" :key="index">
        <div>{{item.name}}</div>
        <div>{{item.value}}</div>
      </div>
    </div>
    <!-- 图片展示 -->
    <div class="detail" v-if="goods_desc">
      <!-- 展示 -->
      <div class="title">商品展示</div>
      <wxParse :content="goods_desc"/>
    </div>

    <!-- 选择规格的弹出层 -->
    <div class="pop" v-show="showpop" @click="showType"></div>
    <div class="attr-pop" :class="[showpop ? 'fadeup' : 'fadedown']">
      <div class="top">
        <div class="left">
          <img :src="info.primary_pic_url" alt="">
        </div>
        <div class="right">
          <div>
            <p>价格¥{{info.retail_price}}</p>
            <p>请选择数量</p>
          </div>
        </div>
        <div class="close" @click="showType">✖️</div>
      </div>
      <div class="b">
        <p>数量</p>
        <div class="count">
          <div class="cut" @click="reduce">-</div>
          <input type="text" v-model="number" class="number" disabled="false">
          <div class="add" @click="add">+</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "../../utils";
import wxParse from 'mpvue-wxparse'; // 适用于 Mpvue 的微信小程序富文本解析自定义组件，支持HTML及markdown解析
export default {
  data() {
    return {
      gallery: [], // banner
      id: "",
      openId: "",
      info: {},
      brand: {},
      showpop: false,
      number: 1,
      attribute: [],
      goods_desc: ''
    };
  },
  components: {  // mpvue引入组件，若小程序则要去到页面中的 index.json 中引入组件
    wxParse
  },
  // 商品分享 小程序的方法
  onShareAppMessage() {
      console.log(this.info.name)
      return {
        title: this.info.name, // 标题
        path: '/pages/goods/main?id' + this.info.id,  // 别人点击分享要进入到的页面
        imageUrl: this.gallery[0].img_url
      }
  },
  mounted() {
    this.openId = wx.getStorageSync('openId') || '';
    this.goodsDetail()
  },
  methods: {
    async goodsDetail () {
      const data = await get('/goods/detailaction', {
        id: 1009024,
        openId: this.openId
      })
      // console.log(data)
      this.info = data.info
      this.gallery = data.gallery
      this.attribute = data.attribute
      this.goods_desc = data.info.goods_desc
      console.log(data)
    },
    showType () {
      this.showpop = !this.showpop
    },
    add() {
      this.number += 1
    },
    reduce() {
      if(this.number > 1) {
        this.number -= 1
      } else {
        return
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url('~mpvue-wxparse/src/wxParse.css');
@import './style.less';
</style>