<template>
  <div class="home">
    <spinner v-if="loading" />

    <p v-if="!loading && projects.length == 0">No projects were created yet</p>

    <!-- /**
     * Remove change status from ProjectPreview [T/1]
     *
     * This is just for debugging purposes in the finala app,
     * it will be read from the smart contract.
     */ -->
    <ProjectPreview
      v-if="!loading && projects.length > 0"
      :value="projects[0]"
      @changeStatus="changeStatus"
    />

    <project-preview :value="debugProject" @changeStatus="changeStatus" />

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
import { Project, ProjectPhase } from "@/model/Project";
import ProjectRaise from "@/web3/projectRaise";
import { ensureWeb3 } from "@/web3/utils";

const gaming: Project = {
  address: "0xTHIS_IS_A_DUMMY_ADDRESS",
  title: "Fred the Knight",
  status: ProjectPhase.Investment,
  link: "https://fred-the-game.com",
  fundingGoal: 3000,
  description:
    "It's the best point and click adventure ever made. Fred the Knight has to find his big love Princess Penelope.",
  tiers: [
    {
      backers: 75,
      maxBackers: 100,
      cost: 10,
    },
    {
      backers: 15,
      maxBackers: 50,
      cost: 50,
    },
    {
      backers: 3,
      maxBackers: 10,
      cost: 150,
    },
  ],
  milestones: [
    {
      releaseDate: Date.now(),
      releasePercentage: 10,
    },
    {
      releaseDate: Date.now() + 4000000000,
      releasePercentage: 20,
    },
    {
      releaseDate: Date.now() + 6000000000,
      releasePercentage: 50,
    },
    {
      releaseDate: Date.now() + 10000000000,
      releasePercentage: 30,
    },
  ],
};

export default defineComponent({
  name: "Home",
  components: { ProjectPreview, Spinner },
  data: function () {
    return {
      loading: true,
      debugProject: gaming,
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
  mounted: function () {
    this.loadProjects();
  },
  methods: {
    /**
     * Remove change status from ProjectPreview [T/1]
     *
     * This is just for debugging purposes in the finala app,
     * it will be read from the smart contract.
     */
    changeStatus: function () {
      let project = this.debugProject;
      project.status = (this.debugProject.status + 1) % 4;
      // this.projects.splice(0, 1, project);

      console.log("CHANGE STATUS", this.debugProject.status);
    },

    createProject: function () {
      this.$router.push({ name: "Create" });
    },
    loadProjects: async function () {
      console.log("Load projects ... ");
      if (this.network?.factoryContractAddress) {
        let projectAdresses = await ProjectFactory.getProjects(
          this.network.factoryContractAddress
        );

        const web3 = ensureWeb3();
        /**
         * When calling ProjectFactory.getProjects we should get back a list of addresses, right? How can I get the single project from the address? [Q/5]
         */

        // projectAdresses.forEach((address) => {
        //   const contract = await new web3.eth.Contract(
        //     ProjectRaiseABI as AbiItem[],
        //     address
        //   );
        // });

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
