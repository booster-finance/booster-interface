<template>
  <div class="home">
    <spinner v-if="loading" />

    <p v-if="!loading && projects.length == 0">No projects were created yet</p>
    <ProjectPreview
      v-if="!loading && projects.length > 0"
      :value="projects[0]"
      @changeStatus="changeStatus"
    />

    <div class="button" id="createProject" @click="createProject">
      <font-awesome-icon class="icon" :icon="['fas', 'plus']" />
    </div>
  </div>
</template>

<script lang="ts">
import ProjectPreview from "../components/ProjectPreview.vue";

import { defineComponent } from "vue";
import ProjectFactory from "@/web3/projectFactory";
import Spinner from "@/components/Spinner.vue";

export default defineComponent({
  name: "Home",
  components: { ProjectPreview, Spinner },
  data: function () {
    return {
      loading: true,
      projects: [],
    };
  },
  computed: {
    network: function () {
      return this.$store.state.network;
    },
  },
  watch: {
    network() {
      this.loadProjects();
    },
  },
  mounted: function(){
    this.loadProjects()
  },
  methods: {
    changeStatus: function () {
      let project = this.projects[0];
      project.status = (this.projects[0].status + 1) % 4;
      this.projects.splice(0, 1, project);

      console.log("CHANGE STATUS", this.projects[0].status);
    },

    createProject: function () {
      this.$router.push({ name: "Create" });
    },
    loadProjects: async function () {
      console.log("Load projects ... ");
      if (this.network?.factoryContractAddress) {
        this.projects = await ProjectFactory.getProjects(
          this.network.factoryContractAddress
        );

        this.loading = false;
        console.log("Projects loaded ", this.projects);
      }
    },
  },
});
</script>


<style lang="scss" scoped>
#createProject {
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 74px;
  height: 74px;
  border-radius: 37px;
  box-sizing: border-box;
}
</style>
