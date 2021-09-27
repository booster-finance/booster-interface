<template>
  <div @click="log">THIS IS A TEST</div>
</template>


<script lang="ts">
import { Vue, Options } from "vue-class-component";
Options({
  components: {},
});

export default {
  methods: {
    log() {
      console.log("LASODASD");
    },
  },
};
</script>
