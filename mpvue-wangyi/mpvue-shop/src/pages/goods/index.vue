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
            <img :src="item.img_url" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
      <!-- 分享按钮 open-type="share" 此属性设定该按钮为分享按钮 -->
      <button class="share" hover-class="none" open-type="share" value>分享商品</button>
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
      <div class="head">商品参数</div>
      <div class="item" v-for="(item, index) in attribute" :key="index">
        <div>{{item.name}}</div>
        <div>{{item.value}}</div>
      </div>
    </div>
    <!-- 图片展示 -->
    <div class="detail" v-if="goods_desc">
      <!-- 展示 -->
      <div class="title">商品展示</div>
      <wxParse :content="goods_desc" />
    </div>
    <!-- 常见问题 -->
    <div class="common-problem">
      <div class="h">
        <text class="title">常见问题</text>
      </div>
      <div class="b">
        <div class="item" v-for="(item, index) in issueList" :key="index">
          <div class="question-box">
            <text class="spot"></text>
            <text class="question">{{item.question}}</text>
          </div>
          <div class="answer">{{item.answer}}</div>
        </div>
      </div>
    </div>
    <!-- 大家都在看 -->
    <div class="common-problem">
      <div class="h">
        <text class="title">大家都在看</text>
      </div>
      <div class="sublist">
        <div @click="modifyGood(subitem.id)" v-for="(subitem, index) in productList" :key="index" >
          <img :src="subitem.list_pic_url" alt />
          <p>{{subitem.name}}</p>
          <p>¥{{subitem.retail_price}}</p>
        </div>
      </div>
    </div>
    <!-- 底部收藏购买购物车 -->
    <div class="bottom-fixed">
      <div class="collect-box" @click="collect">
        <div class="collect" :class="[collectFlag ? 'active' : '']"></div>
      </div>
      <div class="car-box" @click="toCart">
        <div class="car">
          <span>{{allnumber}}</span>
          <img src="/static/images/ic_menu_shoping_nor.png" alt />
        </div>
      </div>
      <div @click="buy">立即购买</div>
      <div @click="addCart">加入购物车</div>
    </div>

    <!-- 选择规格的弹出层 -->
    <div class="pop" v-show="showpop" @click="showType"></div>
    <div class="attr-pop" :class="[showpop ? 'fadeup' : 'fadedown']">
      <div class="top">
        <div class="left">
          <img :src="info.primary_pic_url" alt />
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
          <input type="text" v-model="number" class="number" disabled="false" />
          <div class="add" @click="add">+</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post } from "../../utils";
import wxParse from "mpvue-wxparse"; // 适用于 Mpvue 的微信小程序富文本解析自定义组件，支持HTML及markdown解析
export default {
  data() {
    return {
      gallery: [], // 轮播图
      id: "",
      openId: "",
      info: {}, // 商品信息
      brand: {},
      showpop: false, // 控制弹出层
      number: 0,
      attribute: [],
      goods_desc: "",
      issueList: [], //常见问题
      productList: [], // 大家都在看
      collectFlag: false,
      goodsId: "",
      allnumber: 0,
      allPrice: ''
    };
  },
  components: {
    // mpvue引入组件，若小程序则要去到页面中的 index.json 中引入组件
    wxParse
  },
  // 商品分享 小程序的方法
  onShareAppMessage() {
    console.log(this.info.name);
    return {
      title: this.info.name, // 标题
      path: "/pages/goods/main?id" + this.info.id, // 别人点击分享要进入到的页面
      imageUrl: this.gallery[0].img_url
    };
  },
  mounted() {
    this.goodsId = this.$root.$mp.query.id;
    this.openId = wx.getStorageSync("openId") || "";
    this.goodsDetail();
    console.log(this.goodsId, this.allnumber);
  },
  methods: {
    async goodsDetail() {
      console.log(this.goodsId)
      const data = await get("/goods/detailaction", {
        // id: 1009024, // 测试数据
        id: this.goodsId,
        openId: this.openId
      });
      // console.log(data)
      this.info = data.info;
      this.gallery = data.gallery;
      this.attribute = data.attribute;
      this.goods_desc = data.info.goods_desc;
      this.issueList = data.issue;
      this.productList = data.productList;
      this.collectFlag = data.collected;
      this.allnumber = data.allnumber;
      this.allPrice = data.info.retail_price
      console.log('productlist',this.productList);
    },
    showType() {
      this.showpop = !this.showpop;
    },
    add() {
      this.number += 1;
    },
    reduce() {
      if (this.number > 1) {
        this.number -= 1;
      } else {
        return;
      }
    },
    async collect() {
      this.collectFlag = !this.collectFlag;
      const data = await post("/collect/addcollect", {
        openId: this.openId,
        goodsId: this.goodsId
        // goodsId: 1009024 // 测试数据
      });
      console.log(data);
    },
    toCart() {
      // 跳去导航页面不可以用navigate，要用switchTab
      wx.switchTab({ url: '/pages/cart/main' });
    },
    modifyGood(id) {
      // this.goodsId = id
      // console.log(id)
      // this.goodsDetail()
      wx.redirectTo({ url: '/pages/goods/main?id=' + id });
    },
    async buy() {
      if (this.showpop) {
        if(this.number === 0) {
          wx.showToast({
            title: '请选择商品数量', //提示的内容,
            icon: 'none', //图标,
            duration: 2000, //延迟时间,
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: res => {}
          });
          return false
        }
        const data = await post('/order/submitAction', {
          // goodsId: 1009024, // 测试数据
          goodsId: this.goodsId,
          openId: this.openId,
          allPrice: this.allPrice
        })
        // console.log(data)
        if(data) {
          wx.navigateTo({ url: '/pages/order/main' });
        } else {

        }
      } else {
        this.showpop = true
      }
    },
    async addCart () {
      if (this.showpop) {
        if(this.number === 0) {
          wx.showToast({
            title: '请选择商品数量', //提示的内容,
            icon: 'none', //图标,
            duration: 2000, //延迟时间,
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: res => {}
          });
          return false
        }
        const data = await post('/cart/addCart', {
          openId: this.openId,
          goodsId: this.goodsId,
          // goodsId: 1009024,
          number: this.number
        })
        console.log(data)
        if(data) {
          this.allnumber = this.allnumber + this.number
          wx.showToast({
            title: '请选择商品数量', //提示的内容,
            icon: 'success', //图标,
            duration: 1500, //延迟时间,
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: res => {}
          });
        }
      } else {
        this.showpop = true
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
@import "./style.less";
</style>