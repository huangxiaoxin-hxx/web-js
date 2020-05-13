<template>
  <div class="addaddress">
    <!-- 姓名 -->
    <div class="item">
      <input type="text" placeholder="姓名" v-model="userName">
    </div>
    <!-- 电话 -->
    <div class="item">
      <input type="text" placeholder="手机号码" v-model="telNumber">
    </div>
    <!-- 及联地址菜单 -->
    <div class="item">
      <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
        <input type="text" placeholder="身份、城市、区县" v-model="address">
      </picker>
    </div>
    <!-- 详细地址 -->
    <div class="item">
      <input type="text" placeholder="详细地址,如楼盘、楼盘号" v-model="detailaddress">
    </div>
    <!-- 默认地址，导入微信地址 -->
    <div class="item itemend">
      <checkbox-group @change="checkboxChange">
        <label class="checkbox">
          <checkbox class="box" value="true" :checked="checked" color="#b4282d"></checkbox>
          设置为默认地址
        </label>
      </checkbox-group>
      <div @click="wxaddress">一键导入微信</div>
    </div>
    <!-- 保存按钮 -->
    <div class="bottom" @click="saveAddress">保存</div>
  </div>
</template>

<script>
import {get, post, getStorageOpenid} from '../../utils'
export default {
  data () {
    return {
      id: '',  // 地址id
      userName: '', // 姓名
      telNumber: '', // 电话
      region: [],
      customItem: '全部',
      address: '', // 地址
      detailaddress: '', // 详细地址
      openId: '', // 微信Id
      res: '',
      checked: false, // 是否是默认地址
    }
  },
  methods: {
    checkboxChange(e) {
      console.log(e)
      this.checked = e.mp.detail.value[0]
    },
    bindRegionChange(e) {
      console.log(e)
      this.region = e.mp.detail.value
      this.address = `${this.region[0]} ${this.region[1]} ${this.region[2]}`
    },
    async saveAddress() {
      const data = await post('/address/saveAction', {
        userName: this.userName,
        telNumber: this.telNumber,
        address: this.address,
        detailaddress: this.detailaddress,
        checked: this.checked,
        openId: this.openId,
        addressId: this.id
      })
      // console.log(data)
      if (data.data) {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 1000,
          mask: true,
          success: (result) => {
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 2000)
          },
          fail: () => {},
          complete: () => {}
        });
          
      }
    },
    wxaddress () {
      wx.chooseAddress({
        success: (result) => {
          console.log(result)
          this.userName = result.userName
          this.telNumber = result.telNumber
          this.address = `${result.provinceName} ${result.cityName} ${result.countyName}`
          this.detailaddress = result.detailInfo
        },
        fail: () => {},
        complete: () => {}
      });
    },
    async getDetail() {
      const data = await get('/address/detailAction', {
        id: this.id
      })
      // console.log('======',data)
      let detail = data.data
      this.userName = detail.name
      this.telNumber = detail.mobile
      this.address = detail.address
      this.detailaddress = detail.address_detail
      this.checked = detail.is_default === 1 ? true : false
    }
  },
  mounted() {
    this.openId = getStorageOpenid()
    // console.log('123')
    if(this.$root.$mp.query.res) {
      this.res = JSON.parse(decodeURIComponent(this.$root.$mp.query.res))
      console.log(this.res ,'========')
      this.userName = this.res.userName,
      this.telNumber = this.res.telNumber,
      this.address = `${this.res.provinceName} ${this.res.cityName} ${this.res.countyName}`
      this.detailaddress = this.res.detailInfo
    }
    else if (this.$root.$mp.query.id) {
      // console.log('123')
      this.id = this.$root.$mp.query.id
      this.getDetail()
    } else {
      this.userName = '',
      this.telNumber = '',
      this.address = '',
      this.detailaddress = ''
    }
  }
}
</script>

<style lang="less" scoped>
@import './style.less';
</style>