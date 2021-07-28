<template>
    <nav class="header">
        <ul class="route-block header_left_entry">
          <li :class="{active:item.name===currentRouteName}" @click="redirect(item)" v-for="(item,index) in routes.left" :key="index" >{{item.meta.title}}</li>
        </ul>
        <ul class="route-block header_right_entry">
            <li :class="{active:item.name===currentRouteName}" @click="redirect(item)" v-for="(item,index) in routes.right" :key="index">{{item.meta.title}}</li>
        </ul>
    </nav>
</template>

<script>
import { routes } from '../router/index'
import _ from 'lodash'
export default {
  data () {
    return {
      // 当前路由名称
      currentRouteName: '',
      // 导航栏数组,分为左右两侧
      routes: {
        left: [],
        right: []
      }
    }
  },
  created () {
    this.groupRoutes()
  },
  watch: {
    $route: {
      immediate: true,
      handler (val) {
        this.currentRouteName = val.name
      }
    }
  },
  methods: {
    // 将路由分为左右两组
    groupRoutes () {
      const copyRoutes = _.cloneDeep(routes)
      const groupedRoutes = _.groupBy(copyRoutes, (item) => {
        return item.meta.navlayout
      })
      this.routes = groupedRoutes
    },
    // 点击导航栏跳转到对应的页面中
    redirect ({ path }) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="less" scoped>
.header{
  width: 2820px;
  height: 88px;
  position: relative;
  background: url("~@/assets/img/nav.png") no-repeat;
  .route-block{
    display: flex;
    position: absolute;
    top: 22px;
    font-size: 24px;
    li{
      margin-right: 90px;
      padding:8px;
      cursor: pointer;
      &:hover,&.active{
        color:#00b4ff ;
      }
    }
    &.header_left_entry{
      left: 428px;
    }
    &.header_right_entry{
      right: 300px;
    }
  }
}
</style>
