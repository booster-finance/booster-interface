<template>
  <div class="milestone-slider">
    <div class="milestone-slider-stones">
      <slider :notext="true" :value="process" :max="total" />
      <div
        v-for="(milestone, idx) of value"
        :key="`milestone-stone-${idx}`"
        class="stone"
        :class="{ completed: isMilestoneCompleted(milestone) }"
      >
        {{ idx + 1 }}

        <span class="time">
          {{ new Date(milestone.releaseDate).toLocaleDateString() }}
          {{ milestone.releasePercentage }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Milestone } from "@/model/Project";
import { defineComponent } from "@vue/runtime-core";
import { PropType } from "vue";
import Slider from "./Slider.vue";

export default defineComponent({
  components: { Slider },
  props: {
    value: Object as PropType<Milestone>,
  },
  data: function () {
    return {
      total: 100,
    };
  },
  computed: {
    process() {
      if (this.value.length <= 1) return this.total;
      let stepSize = this.total;
      if (this.value.length > 2) {
        stepSize = this.total / (this.value.length - 1);
      }

      let process = 0;
      let i = 0;
      const now = Date.now();
      console.log(stepSize);
      while (i < this.value.length && this.value[i].releaseDate < now) {
        console.log(this.value[i].releaseDate);
        process += stepSize;
        i++;
      }

      if (i < 1) process = 0;
      else if (i >= this.value.length - 1) process = this.total;
      else {
        console.log(this.value[i], this.value[i - 1], i);
        console.log(this.value[i].releaseDate, this.value[i - 1].releaseDate);

        let span = this.value[i].releaseDate - this.value[i - 1].releaseDate;
        let relative = now - this.value[i - 1].releaseDate;

        console.log((relative / span) * stepSize);
        process = (i - 1) * stepSize + (relative / span) * stepSize;
      }

      return process;
    },
  },
  methods: {
    isMilestoneCompleted(milestone) {
      return milestone.releaseDate - Date.now() <= 0;
    },
  },
});
</script>

<style lang="scss">
.milestone-slider {
  .slider {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    z-index: 1;
  }

  .stone {
    position: relative;
    z-index: 2;
  }
}
</style>

<style lang="scss" scoped>
$inactive-color: $gray-30;
$size: 32px;

.milestone-slider {
  position: relative;
  user-select: none;
  height: $size;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 60px;
  margin-top: 20px;
}

.time {
  position: absolute;
  top: 35px;
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

  &.completed {
    color: $white;
    background-color: $primary;

    .time {
      color: $primary;
    }
  }
}
</style>
