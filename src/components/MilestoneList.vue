<template>
  <List class="milestone-list" :items="milestones" :max="100">
    <template v-slot:header>
      <h3>Milestone List</h3>
    </template>

    <template v-slot:items>
      <Milestone
        class="milestone"
        v-for="(milestone, index) of milestones"
        :key="`milestone-${index}`"
        :value="milestone"
        @remove="() => $emit('remove', index)"
        @addObjective="() => $emit('addObjective', index)"
        @removeObjective="
          (objectiveIndex) => $emit('removeObjective', index, objectiveIndex)
        "
      />
    </template>
  </List>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Milestone from "./Milestone.vue";
import List from "./List.vue";

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
});
</script>
