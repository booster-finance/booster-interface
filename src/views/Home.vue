<template>
  <div class="home"></div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ProjectPreview from "../components/ProjectPreview.vue";

@Options({
  components: { ProjectPreview },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
.home {
  padding: 50px 70px;
}

.home > .project-preview {
  max-width: 512px;
  margin: 20px;
  //   height: 720px;
}
</style>
