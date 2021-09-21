<template>
  <div class="milestone-slider">
    <div class="milestone-slider-stones">
      <div
        v-for="(milestone, idx) of value"
        :key="`milestone-stone-${idx}`"
        class="stone"
      >
        {{ idx + 1 }}

        <span class="time">
          {{ new Date(milestone.releaseDate).toLocaleDateString() }}
        </span>
      </div>
    </div>

    <div class="milestone-line"></div>
  </div>
</template>

<script lang="ts">
import { Milestone } from "@/model/Project";
import { defineComponent } from "@vue/runtime-core";
import { PropType } from "vue";

export default defineComponent({
  props: {
    value: Object as PropType<Milestone>,
  },
});
</script>

<style lang="scss" scoped>
$inactive-color: $gray-30;
$size: 32px;

.milestone-slider {
  position: relative;
  user-select: none;
  height: $size;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 40px;
  margin-top: 20px;


}

.time {
  position: absolute;
  top: 35px
}

.milestone-line {
  position: absolute;
  background-color: $inactive-color;
  height: 6px;
  width: calc(100% - #{$size});
  left: $size/2;
  top: 50%;
  transform: translateY(-50%);
  z-index: -1;
}

.milestone-slider-stones {
  display: flex;
  justify-content: space-between;
}

.stone {
  width: $size;
  height: $size;
  background-color: $inactive-color;
  border-radius: $size / 2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
</style>
