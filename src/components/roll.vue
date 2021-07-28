<template>
  <div class="roll">
    <ul :class="{ 'roll-content': true, sliding: sliding }" ref="list">
      <li
        class="roll-list"
        v-for="(item, index) in data"
        :key="index"
        :style="liStyle"
      >
        <slot :item="item" :index="index"> </slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    itemHeight: {
      type: Number,
      default: 24
    },
    rollNum: {
      type: Number,
      default: 1
    },
    time: {
      type: Number,
      default: 4000
    },
    showNum: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      liStyle: '',
      interval: false,
      sliding: false
    }
  },
  watch: {
    itemHeight () {
      this.initStyle()
    },
    data: {
      deep: true,
      handler (val, oldval) {
        if (oldval.length === 0 && val.length > this.showNum) {
          this.goRoll()
        }
      }
    }
  },
  destroyed () {
    clearInterval(this.interval)
  },
  mounted () {
    this.initStyle()
    this.data.length > this.showNum && this.goRoll()
  },
  methods: {
    initStyle () {
      this.liStyle = `height: ${this.itemHeight}px;`
    },
    goRoll () {
      this.interval = setInterval(() => {
        const list = this.$refs.list
        this.sliding = true
        list.style.marginTop = `-${this.itemHeight * this.rollNum}px`
        setTimeout(() => {
          for (var i = 0; i < this.rollNum; i++) {
            const first = this.data.shift()
            this.data.push(first)
          }
          this.sliding = false
          list.style.marginTop = '0px'
        }, 1500)
      }, this.time)
    },
    stopRoll () {
      clearInterval(this.interval)
    }
  }
}
</script>

<style lang="less" scoped>
.roll {
  color: #fff;
  height: 100%;
  overflow: hidden;
  .sliding {
    transition: all 1.5s;
  }
  .roll-list {
    font-size: 16px;
    overflow: hidden;
  }
}
</style>
