<template>
  <list-item>
    <div class="text">
      {{ name }}
    </div>
    <div class="text">
      {{
        totalFunding
          ? ((totalFunding * value.releasePercentage) / 100).toFixed(2)
          : 0
      }}
      $
    </div>
    <div class="milestone-alloc">
      <input
        type="number"
        :value="value.releasePercentage"
        step="1"
        min="0"
        @input="allocChanged"
      />
    </div>
    <input
      type="datetime-local"
      :value="new Date(value.releaseDate).toJSON().slice(0,19)"
      @input="dateChanged"
    />
  </list-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Milestone } from "../model/Project";
import ListItem from "./ListItem.vue";

export default defineComponent({
  components: { ListItem },
  name: "Milestone",
  props: {
    name: String,
    totalFunding: Number,
    value: {
      type: Object as PropType<Milestone>,
      required: true,
    },
  },
  methods: {
    allocChanged: function (event: InputEvent) {
      let target = event.target as HTMLInputElement;
      this.$emit("allocChanged", parseInt(target.value));
    },
    dateChanged: function (event: InputEvent) {
      let target = event.target as HTMLInputElement;
      this.$emit("dateChanged", Date.parse(target.value));
    },
  },
});
</script>


<style lang="scss" scoped>
$border: 1px solid rgb(224, 224, 224);

.text {
  display: flex;
  align-items: center;
  flex: 1;
}

.list-item {
  padding: 5px;

  > * {
    height: 37px;
    box-sizing: border-box;
  }

  > *:not(:last-child) {
    margin-right: 5px;
  }
}

input {
  width: 75px;
}

input[type="datetime-local"] {
  width: 210px;
  padding-right: 0;
}

.input {
  display: flex;
  > input {
    flex: 1;
  }
}

.milestone-alloc {
  position: relative;
  &::before {
    position: absolute;
    top: 45%;
    right: 30px;
    line-height: 0;
    z-index: 1;
    content: "%";
    font-weight: bold;
  }
}
</style>
