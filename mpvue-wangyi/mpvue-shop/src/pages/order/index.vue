<template>
  <div class="order">
    <!-- 地址栏 -->
    <div class="address" @click="toAddressList" v-if="address.name">
      <div class="item">
        <div class="list">
          <div class="addresslist">
            <div>
              <span>{{address.name}}</span>
              <div class="moren">默认</div>
            </div>
            <div class="info">
              <p>{{address.mobile}}</p>
              <p>{{address.address+address.address_detail}}</p>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <div class="seladdress" @click="toAdd" v-else>请选择默认地址</div>
    <!-- 订单详情 -->
    <div class="orderbox">
      <div class="item">
        <div>商品合计</div>
        <div>¥{{allprice}}</div>
      </div>
      <div class="item">
        <div>运费</div>
        <div>免运费</div>
      </div>
      <div class="item">
        <div>优惠券</div>
        <div>暂无</div>
      </div>
    </div>
    <!-- 商品数据 -->
    <div class="cartlist">
      <div class="item" v-for="(item, index) in listData" :key="index">
        <div class="con">
          <div class="left">
            <div class="img">
              <img :src="item.list_pic_url" />
            </div>
            <div class="info">
              <p>{{item.goods_name}}</p>
              <p>{{item.retail_price}}</p>
            </div>
          </div>
          <div class="right">
            <div class="num">x{{item.number}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部支付 -->
    <div class="bottom">
      <div>实付: ¥{{allprice}}</div>
      <div class="pay" @click="pay">支付</div>
    </div>
  </div>
</template>

<script>
import { get, post, getStorageOpenid } from "../../utils";
export default {
  data() {
    return {
      address: {},
      allprice: "",
      openId: "",
      addressId: "",
      price:'',
      listData: []
    };
  },
  mounted() {
    if (wx.getStorageSync("addressId")) {
      this.addressId = wx.getStorageSync("addressId");
    }
    console.log('id',this.addressId)
    this.openId = getStorageOpenid();
    this.getDetail();
    this.allprice = ''
  },
  methods: {
    toAdd() {
      wx.navigateTo({ url: "/pages/addaddress/main" });
    },
    toAddressList() {
      wx.navigateTo({ url: "/pages/addressSelect/main" });
    },
    async getDetail() {
      const data = await get("/order/detailAction", {
        openId: this.openId,
        addressId: this.addressId
      });
      console.log(data)
      if(data) {
        // this.allprice = data.price
        this.listData = data.goodsList
        this.address = data.address
      }
      console.log(data)
      this.listData.map((item) => {
        this.allprice = Number(item.retail_price * item.number) + Number(this.allprice)
      })
    },
    pay() {
      wx.showToast({
        title: '支付尚未开发', //提示的内容,
        icon: 'none', //图标,
        duration: 1500, //延迟时间,
        mask: false, //显示透明蒙层，防止触摸穿透,
        success: res => {}
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "./style.less";
</style>