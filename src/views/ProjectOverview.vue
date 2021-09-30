<template>
  <div class="project-overview">
    <spinner class="spinner" v-if="loading" />

    <p v-if="!loading && projects.length == 0">No projects were created yet</p>

    <!-- <project-preview :value="debugProject" @changeStatus="changeStatus" /> -->

    <!-- /**
     * Remove change status from ProjectPreview [T/1]
     *
     * This is just for debugging purposes in the finala app,
     * it will be read from the smart contract.
     */ -->
    <div class="projects" v-if="!loading">
      <ProjectPreview
        v-for="project of filteredProjects"
        :key="`project-addr-${project.address}`"
        :value="project"
        :tier="getTier(project.address)"
      />
    </div>

    <!-- <div v-if="projects.length == 0" class="button" @click="update">
      Refresh
    </div> -->

    <div class="error">{{ this.error }}</div>

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
  creator: "0x3e0C626e174334455CF2fDf11C376331389885c2",
  title: "Fred the Knight",
  status: ProjectPhase.Investment,
  link: "https://fred-the-game.com",
  fundingGoal: 3000,
  totalFunding: 0,
  description:
    "It's the best point and click adventure ever made. Fred the Knight has to find his big love Princess Penelope.",
  tiers: [
    {
      backers: 75,
      maxBackers: 100,
      cost: 10,
      address: "",
    },
    {
      backers: 15,
      maxBackers: 50,
      cost: 50,
      address: "",
    },
    {
      backers: 3,
      maxBackers: 10,
      cost: 150,
      address: "",
    },
  ],
  milestones: [
    {
      releaseDate: Date.now() - 100000000000,
      releasePercentage: 10,
    },
    {
      releaseDate: Date.now() - 9000000000,
      releasePercentage: 20,
    },
    {
      releaseDate: Date.now() - 7000000000,
      releasePercentage: 50,
    },
    {
      releaseDate: Date.now() + 10000000000,
      releasePercentage: 30,
    },
  ],
};

export default defineComponent({
  name: "ProjectOverview",
  components: { ProjectPreview, Spinner },
  data: function () {
    return {
      loading: true,
      error: "",
      debugProject: gaming,
      projects: [],
      tiermap: {},
    };
  },
  computed: {
    network: function () {
      return this.$store.state.network;
    },
    filteredProjects: function () {
      let routeMapping = {
        "/funding": 0,
        "/active": 1,
        "/completed": 2,
        "/cancelled": 3,
      };

      return this.projects.filter((project) => {
        const routeStatus = routeMapping[this.$route.path];
        return routeStatus == project.status;
      });
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
      project.status = (this.debugProject.status + 1) % 3;
      // this.projects.splice(0, 1, project);

      console.log("CHANGE STATUS", this.debugProject.status);
    },

    createProject: function () {
      this.$router.push({ name: "Create" });
    },

    getTier: function (address) {
      console.log(this.tiermap, address, this.tiermap[address]);
      return this.tiermap[address];
    },
    loadProjects: async function () {
      console.log("Load projects ... ");
      try {
        if (this.network?.factoryContractAddress) {
          let projectAdresses = await ProjectFactory.getProjects();

          let projects = [];
          for (let address of projectAdresses) {
            let project = await ProjectRaise.getProject(address);

            let reward = await ProjectRaise.getBackerRewards(
              address,
              this.$store.state.account
            );

            let backing = await ProjectRaise.getAddressBacking(
              address,
              this.$store.state.account
            );
            console.log({ backing });
            if (reward.length > 0)
              this.tiermap[address] = { cost: reward[0].tierAmount, address };

            projects.push(project);
          }

          this.projects = projects;

          this.loading = false;
          console.log("Projects loaded ", this.projects);
        }
      } catch (e) {
        console.error(e);
        this.error = e;
      }
    },
  },
});
</script>


<style lang="scss" scoped>
#createProject {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 74px;
  height: 74px;
  border-radius: 37px;
  box-sizing: border-box;
}

.spinner {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.projects > * {
  margin: 20px 0;
}

.button-group {
  display: flex;
  > * {
    flex: 1;
    border-radius: 0;

    $border-size: 10px;
    &:first-child {
      border-top-left-radius: $border-size;
      border-bottom-left-radius: $border-size;
    }

    &:last-child {
      border-top-right-radius: $border-size;
      border-bottom-right-radius: $border-size;
    }
  }
}
</style>
