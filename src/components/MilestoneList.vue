<template>
  <List class="milestone-list" :items="milestones" :max="100">
    <template v-slot:header>
      <h3>Milestones</h3>
    </template>

    <template v-slot:items>
      <Milestone
        class="milestone"
        v-for="(milestone, index) of milestones"
        :key="`milestone-${index}`"
        :value="milestone"
        :name="getName(index, milestone.length)"
        @remove="() => $emit('remove', index)"
        @allocChanged="(value) => $emit('allocChanged', index, value)"
        @dateChanged="(value) => $emit('dateChanged', index, value)"
      />
    </template>
  </List>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Milestone from "./Milestone.vue";
import List from "./List.vue";

import MilestoneModel from "../model/Milestone";
export default defineComponent({
  name: "MilestoneList",
  components: { Milestone, List },
  props: {
    milestones: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  methods: {
    getName: function (index: number, length: number): string {
      return MilestoneModel.getName(index, length);
    },
  },
});
</script>
