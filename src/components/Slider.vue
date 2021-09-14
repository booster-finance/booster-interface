<template>
  <div id="slider" class="slider">
    <div class="slider-fill" :style="getWidth()"></div>
    <span class="slider-label"
      >{{ text }} {{ value }} / {{ max }} ({{ this.getPercentageText() }})</span
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    max: {
      type: Number,
      default: 1,
    },
    value: {
      type: Number,
      default: 0,
    },
    text: String,
  },
  methods: {
    getWidth() {
      return `width: ${this.getPercentageText()} !important;`;
    },
    getPercentageText() {
      return `${this.getRatio() * 100}%`;
    },
    getRatio(): number {
      let pct = this.value / this.max;
      pct = pct > 1 ? 1 : pct < 0 ? 0 : pct;
      return pct;
    },
  },
});
</script>

<style lang="scss" scoped>
.slider {
  position: relative;
  user-select: none;
  height: 100px;
}

#slider {
  display: block;
  height: 20px;
  width: 100%;
  background-color: whitesmoke;
  border-radius: 10px;
  box-shadow: inset 1px 1px 3px rgba(#333, 0.1);
  //   overflow: hidden;
}

.slider-fill {
  background: rgb(174, 181, 184);
  height: 100%;
  width: 50%;
  box-shadow: 0 0 3px rgba(#333, 0.1);
  border-radius: 10px;
}

.slider-label {
  //   position: absolute;
  //   left: 50%;
  //   top: 50%;
  //   color: white;
  font-size: 0.75em;
  font-weight: bold;
  transform: translate(-50%, -55%);
  //   text-shadow: 1px 1px 5px rgba(#333, 0.8);
}
</style>
