<template>
    <div class="map-overlay-switches">
        <div v-for="(index,name) in  configs" :key="index" class="mapAction" @click="toggleMapAction(name)" :class="{active:state[name]}">
            {{name}}
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 按钮状态数组
      state: {}
    }
  },
  props: {
    // 按钮文件配置
    configs: {
      type: Object
    }
  },
  created () {
    this.initStateMap()
  },
  methods: {
    // 初始化状态数组
    initStateMap () {
      this.state = JSON.parse(JSON.stringify(this.configs))
    },
    // 点击按钮，改变按钮状态
    toggleMapAction (name) {
      this.state[name] = !this.state[name]
      this.$emit('toggleLayer', {
        name: name,
        state: this.state[name]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.map-overlay-switches{
    display: inline-flex;
    flex-direction: column;
    .mapAction{
        width: 124px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url("~@/assets/img/map-action-normal.png") no-repeat;
        margin-bottom: 12px;
        cursor: pointer;
        &.active,&:hover{
            background: url("~@/assets/img/map-action-highlight.png") no-repeat;
        }
    }
}
</style>
