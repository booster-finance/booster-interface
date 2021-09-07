<template>
  <List class="tier-list" :items="tiers" :max="9">
    <template v-slot:header>
      <h3>Tier List</h3>
    </template>

    <template v-slot:items>
      <Tier
        class="tier"
        v-for="(tier, index) of tiers"
        :key="`tier-${index}`"
        :value="tier"
        :image="getTierImage(index)"
        :name="getTierName(index)"
        @remove="() => $emit('remove', index)"
      />
    </template>
  </List>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TierModel from "../model/Tiers";
import Tier from "./Tier.vue";
import List from "./List.vue";

export default defineComponent({
  name: "TierList",
  components: { Tier, List },
  props: {
    tiers: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  methods: {
    getTierName: function (idx: number): string {
      return TierModel.getName(idx, this.tiers.length);
    },
    getTierImage: function (idx: number): string {
      return TierModel.getImage(idx, this.tiers.length);
    },
  },
});
</script>
