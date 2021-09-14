<template>
  <list-item :key="`tier-${index}`">
    <img :src="`tiers/${image}`" alt="" />
    <h4>{{ name }}</h4>
    <div class="backers">
      <font-awesome-icon class="icon" :icon="['fas', 'user']" />

      <input type="number" step="1" min="0" :max="value.maxBackers" />
    </div>
    <div class="cost">
      <input
        class="cost"
        @click.stop
        :value="value.cost"
        type="number"
        step="0.1"
        min="0"
      />
      <span>$</span>
    </div>
  </list-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Tier from "../model/Tiers";
import ListItem from "./ListItem.vue";

export default defineComponent({
  components: { ListItem },
  name: "Tier",
  props: {
    image: String,
    name: String,
    value: {
      type: Tier,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
$border: 1px solid rgb(224, 224, 224);

img {
  display: block;
  flex: 0 0 40px;
  margin: 0 auto;
  height: 26px;
  width: 60px;
  object-fit: contain;
  padding: 10px;
  // background-color: rgb(247, 247, 247);
  border-right: $border;
}

.backers {
  position: relative;
  // display: flex;
  align-items: center;
  @include input();
  padding: 0;

  svg {
    position: absolute;
    left: 10px;
    color: $gray-70;
    top: 50%;
    transform: translateY(-50%);
  }

  input {
    margin: 0;
    border: none;
    width: 100%;
  }
}

input {
  padding-left: 40px;
  box-sizing: border-box;
}

.cost {
  position: relative;

  span {
    top: 50%;
    position: absolute;
    left: 10px;
    line-height: 0;
    font-weight: bold;
  }
}
</style>
