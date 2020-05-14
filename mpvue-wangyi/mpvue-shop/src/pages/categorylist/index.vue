<template>
  <div class="categoryList">
    <scroll-view scroll-x class="head" @scroll-left="scrollLeft">
      <div v-for="(item, index) in navData" :key="index" :class="[nowIndex == index ? 'active':'']">{{item.name}}</div>
    </scroll-view>
    <div class="info">
      <p>{{currentNav.name}}</p>
      <p>{{currentNav.front_desc}}</p>
    </div>
    <div class="list">
      <div class="item">
        <p class="name">name</p>
        <p class="price">price</p>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "../../utils";
export default {
  data() {
    return {
      navData: [],
      categoryId: '',
      currentNav: {},
      nowIndex: 0,
    }
  },
  mounted() {
    // 获取页面传递的参数
    this.categoryId = this.$root.$mp.query.id
    this.getAllData()
  },
  methods: {
    async getAllData () {
      const data = await get('/category/categoryNav', {
        categoryId: this.categoryId || '1005000'
      })
      console.log(data)
      this.navData = data.navData
      this.currentNav = data.currentNav
      for (let i = 0; i < this.navData.length; i++) {
        const id = this.navData[i].id;
        if (id == this.currentNav.id) {
          this.nowIndex = i
        }
      }
      // 获取商品
      const listData = await get('/goods/goodsList', {
        categoryId: this.categoryId
      })
      console.log(listData)
    }
  }
};
</script>

<style lang="less" scoped>
@import "./style.less";
</style>