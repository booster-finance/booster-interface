<template>
  <list-item :key="`tier-${index}`">
    <template v-slot:header>
      <img :src="`tiers/${image}`" alt="" />
      <h4>{{ name }}</h4>
      <input @click.stop :value="value.cost" type="number" step="0.1" min="0" />
    </template>

    <template v-slot:body>
      <ul>
        <li v-for="(reward, rindex) of value.rewards" :key="`tier-${rindex}`">
          <b>{{ reward.title }}:</b> {{ reward.description }}
        </li>
      </ul>

      <input
        style="width: 100%; box-sizing: border-box"
        placeholder="Add reward ..."
      />
    </template>
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
  flex: 0;
  margin: 0 auto;
  height: 26px;
  width: 40px;
  object-fit: contain;
  padding: 10px;
  // background-color: rgb(247, 247, 247);
  border-right: $border;
}
</style>
