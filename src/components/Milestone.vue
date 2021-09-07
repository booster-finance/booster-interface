<template>
  <list-item>
    <template v-slot:header>
      <h4>{{ value.title }}</h4>
    </template>

    <template v-slot:body>
      <h4>Title</h4>
      <input type="text" :value="value.title" />
      <h4>Objectives</h4>
      <list @add="addObjective" :items="value.objectives">
        <template v-slot:items>
          <div
            class="input"
            v-for="(str, objIndex) of value.objectives"
            v-bind:key="`objective-${objIndex}`"
          >
            <input :value="str" />
            <button
              @click="
                () => {
                  $emit('removeObjective', objIndex);
                }
              "
            >
              Delete
            </button>
          </div>
        </template>
      </list>
    </template>
  </list-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Milestone from "../model/Project";
import List from "./List.vue";
import ListItem from "./ListItem.vue";

export default defineComponent({
  components: { List, ListItem },
  name: "Milestone",
  props: {
    value: {
      type: Object as PropType<Milestone>,
      required: true,
    },
  },
  methods: {
    addObjective() {
      this.$emit("addObjective");
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
