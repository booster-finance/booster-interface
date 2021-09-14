<template>
  <list-item>
    <span>
      {{ name }}
    </span>
    <p>{{ (value.releasePercentage * 100).toFixed(2) || "-" }} %</p>
    <input
      type="number"
      value="value.releaseAlloc"
      step="1"
      min="0"
      @input="allocChanged"
    />
    <input
      type="date"
      value="value.releaseDate"
      name=""
      id=""
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
      this.$emit("allocChanged", parseInt(target.value));
    },
  },
});
</script>

<style lang="scss">
.list .body input {
  display: block;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 5px;
}
</style>

<style lang="scss" scoped>
$border: 1px solid rgb(224, 224, 224);

.input {
  display: flex;
  > input {
    flex: 1;
  }
}
</style>
