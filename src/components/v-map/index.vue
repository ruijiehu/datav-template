<template>
    <div id="Vmap"></div>
</template>

<script>
import OverlayGroup from './overlay-group'
import AMap from 'AMap'
export default {
  data () {
    return {
      map: null,
      overlayGroup: null,
      // 交通路况
      traffic: null
    }
  },
  mounted () {
    this.initMap()
  },
  props: {
    // 中心点
    center: {
      type: Array,
      default: () => {
        return [120, 30]
      }
    },
    zoom: {
      type: Number,
      default: 13
    }
  },
  watch: {
    // 监听中心点，设置地图中心
    center: {
      deep: true,
      handler (nv, ov) {
        this.setMapCenterAndZoom(nv)
      }
    },
    // 监听地图层级，实时设置地图层级
    zoom (nv, ov) {
      this.setMapCenterAndZoom(null, nv)
    }
  },
  methods: {
    // 初始化地图
    initMap () {
      const _this = this
      this.map = new AMap.Map('Vmap', {
        resizeEnable: true,
        center: _this.center,
        mapStyle: 'amap://styles/a0d892fd17ff5ee09fc4316b3281800b',
        zoom: _this.zoom
      })
      this.overlayGroup = new OverlayGroup(this.map)
      this.$emit('mapInited')
    },
    // 添加覆盖物
    addOverlays (key, overlays = []) {
      this.overlayGroup.addOverlays(key, overlays)
    },
    // 移除覆盖物
    removeOverlay (key) {
      this.overlayGroup.remove(key)
    },
    // 移除所覆盖物
    removeAllOverlay () {
      this.overlayGroup.removeAll()
      this.traffic.hide()
    },
    // 设置地图的级别和中心点
    setMapCenterAndZoom (position, number) {
      position = position || this.center
      number = number || this.zoom
      this.map.setZoomAndCenter(number, position)
    },
    // 将地图层级放到合适的位置
    setFitView (avoid = [0, 0, 0, 0]) {
      this.map.setFitView(this.overlayGroup.getFlatOverlayArrs(), true, avoid)
    },
    // 开启路况
    showTraffic () {
      if (!this.traffic) {
        this.traffic = new AMap.TileLayer.Traffic({
          autoRefresh: true, // 是否自动刷新
          interval: 180 // 刷新间隔，默认180s
        })
        this.traffic.setMap(this.map)
      }
      this.traffic.show()
    },
    // 隐藏路况
    hideTraffic () {
      this.traffic.hide()
    }
  }
}
</script>

<style lang="less" scoped>
#Vmap{
  width: 100%;
  height: 100%;
}
</style>
<style>
  #app .main-content #Vmap .amap-overlay-text-container{
    padding:12px 20px;
    box-shadow: -3px 2px 7px 0px rgba(153, 153, 153, 0.45);;
    border-radius: 3px;
    border:none;
  }
</style>
