<template>
  <div class="create-project">
    <header>
      <h2>Create New Project</h2>
    </header>

    <h3>Title</h3>
    <input v-model="project.title" name="title" type="text" />
    <h3>Description</h3>
    <textarea
      name="description"
      id=""
      cols="30"
      rows="10"
      maxlength="768"
      v-model="project.description"
    ></textarea>
    <h3>Funding Goal</h3>
    <input type="number" v-model="project.fundingGoal" />
    <h3>Link</h3>
    <input v-model="project.link" name="link" type="text" />

    <!-- Tiers -->
    <tier-list
      :tiers="project.tiers"
      @changed="tierChanged"
      @add="addTier"
      @remove="removeTier"
    />

    <p class="errorous" :class="{ correct: fundedProperly }">
      Total Allocation: {{ totalFunding }} / {{ project.fundingGoal }}
    </p>

    <!-- Milestones -->
    <MilestoneList
      :milestones="project.milestones"
      :totalFunding="totalFunding"
      @add="addMilestone"
      @remove="removeMilestone"
      @allocChanged="allocChanged"
      @dateChanged="dateChanged"
    />

    <p class="errorous" :class="{ correct: allocationCorrect }">
      Total Allocation: {{ fullAlloc }}% / 100%
    </p>

    <error v-if="errors && errors.length > 0">
      <p v-for="(error, errorIdx) of errors" :key="'error-' + errorIdx">
        {{ error }}
      </p>
    </error>

    <div class="submit">
      <div
        id="validateBtn"
        class="button"
        :class="{ disabled: validateButtonDisabled }"
        @click="validate"
      >
        Validate
      </div>
      <div
        id="createBtn"
        :class="{ disabled: createButtonDisabled }"
        class="button"
        @click="create"
      >
        Create
      </div>
    </div>
    <div v-if="deploying">
      <p>Creating project. Don't leave the site!</p>

      <div>
        <pending-item
          v-for="(step, idx) of steps"
          :status="step.status"
          :key="'step-' + idx"
          :error="step.error"
          :info="step.info"
          >{{ step.name }}</pending-item
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Project, ProjectPhase } from "../model/Project";
import TierList from "../components/TierList.vue";
import MilestoneList from "@/components/MilestoneList.vue";
import Error from "@/components/Error.vue";
import ProjectFactory from "@/web3/projectFactory";
import { BigNumber } from "@ethersproject/bignumber";
import TierNFT from "@/web3/tierNFT";
import PendingItem from "@/components/PendingItem.vue";
import * as IPFS from "ipfs-core";
import ProjectRaise from "@/web3/projectRaise";

import Tier from "@/model/Tiers";

const gaming: Project = {
  address: "asdasdasdasd",
  creator: "0x3e0C626e174334455CF2fDf11C376331389885c2",
  title: "Booster Finance",
  status: ProjectPhase.Investment,
  fundingGoal: 200,
  totalFunding: 0,
  description: "A revolutionary way to raise funds for new projects.",
  link: "https://no-booster-website.yet",
  tiers: [
    {
      backers: 0,
      maxBackers: 20,
      cost: 110,
      address: "",
    },
    {
      backers: 0,
      maxBackers: 10,
      cost: 200,
      address: "",
    },
  ],
  milestones: [
    {
      releaseDate: Date.now() + 600000,
      releasePercentage: 50,
    },
    {
      releaseDate: Date.now() + 1200000,
      releasePercentage: 50,
    },
  ],
};

export default defineComponent({
  components: { TierList, MilestoneList, Error, PendingItem },

  data: function () {
    return {
      project: gaming,
      validated: false,
      created: false,
      deploying: false,
      errors: [],
      steps: [
        {
          status: 0,
          name: "Create Metadata",
          error: "",
          action: this.uploadMetaDataToIPFS,
          info: "",
        },
        {
          status: 0,
          name: "Deploy Project Contract",
          error: "",
          action: this.deployProjectContract,
          info: "",
        },
        {
          status: 0,
          name: "Create Tier NFTs",
          error: "",
          action: this.deployTierNFTs,
          info: "",
        },
        {
          status: 0,
          name: "Assign Tiers",
          error: "",
          action: this.assignTierNFTs,
          info: "",
        },
      ],
    };
  },
  watch: {
    project: {
      handler() {
        this.validated = false;
      },
      deep: true,
    },
  },
  computed: {
    validateButtonDisabled() {
      return !(!this.deploying && !this.validated);
    },
    createButtonDisabled() {
      return !(!this.deploying && this.validated);
    },
    milestoneReleaseDates: function () {
      console.log(this.project.milestones);
      return this.project.milestones.map((milestone) => milestone.releaseDate);
    },
    milestoneReleasePercents: function () {
      console.log(this.project.milestones);
      return this.project.milestones.map(
        (milestone) => milestone.releasePercentage
      );
    },
    tierCosts: function () {
      return this.project.tiers.map((tier) => tier.cost);
    },
    tierBackers: function () {
      return this.project.tiers.map((tier) => tier.backers);
    },
    tierMaxBackers: function () {
      return this.project.tiers.map((tier) => tier.maxBackers);
    },
    fundedProperly: function () {
      return this.totalFunding >= this.project.fundingGoal;
    },
    allocationCorrect: function () {
      return this.fullAlloc == 100;
    },
    totalFunding: function () {
      return this.project.tiers.reduce((prev, tier) => {
        return prev + tier.maxBackers * tier.cost;
      }, 0);
    },
    fullAlloc() {
      if (this.project.milestones.length == 0) return 0;
      return this.project.milestones.reduce((prev, current) => {
        return prev + current.releasePercentage;
      }, 0);
    },
  },
  methods: {
    timeout: async function () {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    },
    validate() {
      this.errors = [];
      if (!this.fundedProperly) {
        this.errors.push(
          "Tiers must provide higher funding than the funding goal!"
        );
      }

      if (!this.allocationCorrect) {
        this.errors.push("Make sure the allocation sums up to 100%!");
      }

      this.project.tiers.forEach((tier, idx) => {
        if (tier.maxBackers <= 0) {
          this.errors.push(
            `Tier must have at least 1 backer (${Tier.getName(
              idx,
              this.project.tiers.length
            )})`
          );
        }
      });

      this.project.tiers.forEach((tier, idx) => {
        if (tier.cost <= 0) {
          this.errors.push(
            `Tier cost must be greater than 0$ (${Tier.getName(
              idx,
              this.project.tiers.length
            )})`
          );
        }
      });

      const milestones = this.project.milestones;
      milestones.forEach((milestone, idx) => {
        if (milestone.releasePercentage <= 0) {
          this.errors.push(
            `Milestone allocation must be greater than 0 of (Milestone #${
              idx + 1
            })`
          );
        }
      });

      milestones.forEach((milestone, idx) => {
        if (milestone.releaseDate - Date.now() <= 0) {
          this.errors.push(
            `Milestone release date must be in the future (Milestone #${
              idx + 1
            })`
          );
        }
      });

      for (let i = 0; i < milestones.length - 1; i++) {
        if (milestones[i].releaseDate > milestones[i + 1].releaseDate) {
          this.errors.push(
            `Milestone release date of Milestone #${
              i + 1
            } must be earlier, than of Milestone #${i + 2}`
          );
        }
      }

      if (this.errors.length == 0) this.validated = true;

      return this.errors.length == 0;
    },
    async create() {
      if (this.validate()) {
        this.deploying = true;

        /**
         * Create Metadata and upload to IPFS
         */

        let data = {
          metadata: null,
          projectRaiseContractAddress: null,
          tierNFTContractAddresses: [],
        };

        let failed = false;
        for (let i = 0; i < this.steps.length; i++) {
          if (failed) break;
          this.steps[i].status = 1;
          try {
            let result = await this.steps[i].action(data, this.steps[i]);
            Object.assign(data, result);
          } catch (e) {
            this.steps[i].error = e.toString();
            failed = true;
            break;
          }
          this.steps[i].status = 2;
        }
      } else {
        this.validated = false;
        this.deploying = false;
      }
    },
    uploadMetaDataToIPFS: async function (_, step) {
      const node = await IPFS.create();
      const result = await node.add(
        JSON.stringify({
          title: this.project.title,
          description: this.project.description,
          link: this.project.link,
        })
      );
      await node.stop();
      step.info = `IPFS Hash: ${result.path}`;
      return { metadata: result.path };
    },
    deployProjectContract: async function (data, step) {
      const decimals = this.$store.state.network.ustDecimals;
      await ProjectFactory.createProjectRaise(
        BigNumber.from(this.project.fundingGoal).mul(
          String(Math.pow(10, decimals))
        ),
        BigNumber.from((Date.now() / 1000) | 0).add(BigNumber.from(100)),
        data.metadata,
        this.milestoneReleaseDates,
        this.milestoneReleasePercents
      );
      let projectRaiseContractAddresses = await ProjectFactory.getProjects();
      let projectRaiseContractAddress =
        projectRaiseContractAddresses[projectRaiseContractAddresses.length - 1];
      data.projectRaiseContractAddress = projectRaiseContractAddress;
      step.info = `Contract: ${projectRaiseContractAddress}`;
      return { projectRaiseContractAddress };
    },
    deployTierNFTs: async function (data, step) {
      let tierNFTContractAddresses = [];
      /**
       * [Q/4] Do I need to create multiple TierNFT contracts.
       */
      for (let i = 0; i < this.project.tiers.length; i++) {
        step.info = `Deploy (${i + 1}/${this.project.tiers.length})`;
        let tierNftContract = await TierNFT.createContract(
          data.projectRaiseContractAddress
        );
        tierNFTContractAddresses.push(tierNftContract.options.address);
      }

      step.info = `Deployed (${this.project.tiers.length}/${
        this.project.tiers.length
      }): ${tierNFTContractAddresses.toString()}`;

      return { tierNFTContractAddresses };
    },
    assignTierNFTs: async function (data) {
      const decimals = this.$store.state.network.ustDecimals;

      await ProjectRaise.assignTiers(
        data.projectRaiseContractAddress,
        this.tierCosts.map((val) =>
          BigNumber.from(val).mul(String(Math.pow(10, decimals)))
        ),
        data.tierNFTContractAddresses,
        this.tierMaxBackers
      );
    },
    addTier() {
      this.$data.project.tiers.push({
        backers: 0,
        maxBackers: 10,
        cost: 100,
        // rewards: [],
      });
    },
    removeTier(index: number) {
      this.$data.project.tiers.splice(index, 1);
    },
    addMilestone() {
      this.$data.project.milestones.push({
        releaseDate: -1,
        releasePercentage: 0,
      });
    },
    removeMilestone(index: number) {
      this.$data.project.milestones.splice(index, 1);
    },
    allocChanged(index: number, alloc: number) {
      // console.log(index, alloc)
      let milestone = this.project.milestones[index];
      milestone.releasePercentage = alloc;
      this.project.milestones.splice(index, 1, milestone);
    },
    dateChanged(index: number, date: number) {
      let milestone = this.project.milestones[index];
      milestone.releaseDate = date;
      this.project.milestones.splice(index, 1, milestone);
    },
    tierChanged(index: number, tier: Tier) {
      this.project.tiers.splice(index, 1, tier);
    },
  },
});
</script>

<style lang="scss" scoped>
.create-project {
  display: flex;
  background-color: $white;
  flex-direction: column;
  margin-bottom: 50vh;

  border: $border;
  border-radius: 10px;

  > * {
    flex: 1;
  }

  button {
    margin-top: 50px;
  }
}

.submit {
  display: flex;
  margin-top: 30px;

  > * {
    flex: 1;
  }

  > *:not(:last-child) {
    margin-right: 10px;
  }
}

.errorous {
  color: $red;
  font-weight: bold;
  &.correct {
    color: $green;
  }
}

#validateBtn,
#createBtn {
  padding: 10px;
}

textarea {
  resize: none;
}
</style>
