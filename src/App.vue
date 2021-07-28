<template>
  <div class="appmain">
    <head-nav class="head-nav"></head-nav>
    <div class="app-container">
      <router-view v-slot="{ Component }">
        <transition name="slideInRight">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <v-map class="vmap" ref="vmap" @mapInited="mapInitedHook" :center="center" :zoom="zoom"></v-map>
  </div>
</template>
<script>
import Nav from '@/components/nav'
import VMap from '@/components/v-map'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      center: [120.811621, 30.807957],
      zoom: 15
    }
  },
  created () {},
  mounted () {
    this.$nextTick(() => {
    })
  },
  // 系统退出前销毁store中的map实例
  onBeforeUnmount () {
    this.setMapInstance(null)
  },
  methods: {
    ...mapMutations('map', ['setMapInstance']),
    // 当地图初始化完毕后，将地图实例设置到全局中
    mapInitedHook () {
      this.setMapInstance(this.$refs.vmap)
    }
  },
  components: {
    'head-nav': Nav,
    'v-map': VMap
  }
}
</script>
<style lang="less">
@import './style/common.less';
::-webkit-scrollbar {
  width: 8px;
  height: 16px;
  background-color: #344146;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(10, 26, 37, 0.4);
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.7);
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  -webkit-box-shadow: inset 0 0 6px rgba(10, 26, 37, 0.4);
  background-color: #344146;
}
html,
body {
  margin: 0;
  padding: 0;
}
body {
  width: 100%;
  min-width: 2880px;
  height: 1080px;
  overflow-y: hidden;
  overflow-x: auto;
  color: #fff;
}
#app {
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: "Microsoft YaHei";
}
.appmain {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 12px 32px 30px 32px;
}
.router_fade-enter-active,
.router_fade-leave-active {
  transition: all 0.2s ease;
}
.router_fade-enter,
.router_fade-leave-to {
  opacity: 0;
}
.slideInRight-enter-active,
.slideInRight-leave-active {
  transition: all 0.2s;
  transform: translate3d(110%, 0, 0);
}
.slideInRight-enter,
.slideInRight-leave-to {
  transform: translate3d(0, 0, 0);
}
.head-nav {
  position: relative;
  z-index: 20;
}
.app-container {
  position: relative;
  width: 100%;
  height: calc(100% - 88px);
  z-index: 20;
  pointer-events: none;
}
</style>
<style lang="less" scoped>
.vmap {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 18;
}
</style>
