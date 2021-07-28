<template>
  <div class="card" :style="{ width: width + 'px' }">
    <div class="card-anim">
      <div
        class="card-anim-pf"
        v-for="i in 6"
        :key="i"
        :style="{ 'animation-delay': 0.2 * i + 's' }"
      ></div>
    </div>
    <img :src="require('@/assets/img/card_top.png')" />
    <span class="card-title">{{ title }}</span>
    <div class="card-tab">
      <template v-for="(i, index) in tab">
        <span
          :key="index"
          v-if="tab.length > 0"
          :class="tabIndex === index ? 'card-tab-active' : ''"
          @click="tabIndex = index"
          >{{ i }}</span
        >
      </template>
    </div>
    <div class="card-body">
      <div class="card-body-inner" :style="{ height: height + 'px' }">
        <div class="card-body-inner-bg"></div>
        <div class="card-body-inner-ctx">
          <template v-for="(i, index) in tab">
            <slot
              :key="index"
              :name="index"
              v-if="tab.length > 0 && tabIndex === index"
            ></slot>
          </template>
          <slot></slot>
        </div>
      </div>
    </div>
    <img :src="require('@/assets/img/card_bottom.png')" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabIndex: 0
    }
  },
  components: {},
  props: {
    width: {
      type: Number,
      default: 854
    },
    height: {
      type: Number,
      default: 300
    },
    tab: {
      type: Array,
      default: () => {
        return []
      }
    },
    title: {
      type: String,
      default: '生活配套'
    }
  }
}
</script>

<style scoped lang="less">
@keyframes streamer {
  0% {
    opacity: 0.1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.1;
  }
}
.card-anim {
  position: absolute;
  right: 64px;
  top: 0;
  &-pf {
    margin: 0 5px;
    display: inline-block;
    height: 28px;
    width: 25px;
    transform: skewX(45deg);
    background-color: #03a9ff;
    animation: streamer 3s ease infinite;
  }
}
.card-tab-active {
  box-shadow: inset 0px 0px 70px 0px rgb(13, 85, 196, 0.54) !important;
}
.card {
  position: relative;
  font-size: 0;
  img {
    width: 100%;
  }
  &-tab {
    position: absolute;
    top: 10px;
    left: 198px;
    span {
      cursor: pointer;
      text-align: center;
      display: inline-block;
      line-height: 40px;
      padding: 0 10px;
      height: 40px;
      box-shadow: inset 0px 0px 16px 0px rgb(13, 85, 196, 0.54);
      border: solid 1px #68d8fe;
      font-size: 18px;
      color: #ffffff;
    }
  }
  &-title {
    position: absolute;
    left: 10px;
    top: 10px;
    font-size: 30px;
    color: #68d8fe;
    font-weight: 400;
    font-style: italic;
  }
  &-body {
    max-height: 100% !important;
    margin-left: 2px;
    width: calc(100% - 4px);
    overflow: hidden;
    &-inner {
      margin-top: -16px;
      margin-bottom: -16px;
      box-shadow: inset 0px 0px 4px 0px rgba(0, 132, 255, 0.8),
        inset 0px 0px 16px 0px rgba(0, 156, 255, 0.31);
      &-bg {
        width: 100%;
        height: 100%;
        opacity: 0.24;
        background-image: linear-gradient(
          270deg,
          #085f94 0%,
          #09416c 50%,
          #092749 100%
        );
      }
      &-ctx {
        width: 100%;
        height: calc(100% - 80px);
        position: absolute;
        top: 60px;
        font-size: 18px;
      }
    }
  }
}
</style>
