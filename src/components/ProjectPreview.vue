<template>
  <div class="project-preview">
    <header>
      <h1>Role Playing Game</h1>
    </header>
    <div class="main">
      <div class="grid grid-2">
        <div><img src="timelapse.png" /> 3 years</div>
        <div><img src="chart-line-variant.png" alt="" /> 100%</div>
        <div>min 100,000$</div>
        <div>max 350,000$</div>
      </div>

      <p>
        Esse id pariatur ipsum laboris commodo nulla laboris voluptate dolor
        ipsum. Id ea aliqua id sint ad laboris enim dolor. Id et exercitation
        anim ullamco esse ipsum ea sit veniam elit est adipisicing ad.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  components: {},
})
export default class ProjectPreview extends Vue {}
</script>

<style lang="scss">

.project-preview {
  
}

.grid {
  display: grid;
  text-align: center;
  gap: 20px;
  margin: 30px 0;

  > * {
    display: flex;
    justify-content: center;

  }
}

.grid-2 {
  grid-template-columns: 1fr 1fr;
}
</style>
