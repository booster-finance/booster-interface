<template>
  <div class="project-preview" :class="{ own: isCreator }">
    <div class="main">
      <div class="button" id="status" @click="changeStatus">
        Status: {{ value.status }}
      </div>

      <div class="button" id="update" @click="update">
        <font-awesome-icon class="icon" :icon="['fas', 'sync']" />
      </div>

      <header>
        <h2>{{ value.title }}</h2>
      </header>

      <div class="addresses">
        <p>
          <span>Contract:</span><br />
          {{ value.address }}
        </p>
        <p>
          <span>Creator:</span><br />
          {{ value.creator }}
        </p>
      </div>

      <p>{{ value.description || "This project has no description." }}</p>
      <a :href="value.link" target="_blank">{{ value.link }}</a>

      <h3>Milestones</h3>
      <MilestoneSlider :value="value.milestones" />
      <!-- TODO: Here we need some kind of ID for the project  -->
      <h3 v-if="funding">Tiers</h3>

      <div id="tier-list" v-if="funding && !tier">
        <div
          class="tier-select"
          v-for="(tier, index) of value.tiers"
          v-bind:key="`tier-${index}`"
          @click="fundTier(tier)"
        >
          <img :src="getTierImage(index)" alt="Image of tier." />
          <p>{{ getTierName(index) }}</p>
          <slider :max="tier.maxBackers" :value="tier.backers" />
          <p>{{ tier.cost }} $</p>
        </div>
      </div>
      <div id="contribute" v-if="funding">
        <span>Support Project Without Reward</span>
        <div class="row">
          <input v-model="customFunding" type="number" step="0.01" min="0" />
          <div class="button" @click="fund">Fund</div>
        </div>
      </div>

      <div class="errorous">
        {{ this.error }}
      </div>

      <h3 v-if="!completed">Funding</h3>
      <Slider
        v-if="!completed"
        :value="calculateCurrentFunding()"
        :max="value.fundingGoal"
      />

      <h4 v-if="working">Voting</h4>
      <div class="row" v-if="working">
        <div class="button" id="no" @click="voteNo">No</div>
        <div class="button" id="yes" @click="voteYes">Yes</div>
      </div>

      <slider v-if="working" :max="votesToCancel" :value="cancelVotes" />

      <div class="info" v-if="completed">
        <font-awesome-icon class="icon" :icon="['fas', 'info-circle']" />
        This project has been completed!
      </div>
    </div>

    <div id="withdraw" v-if="(tier && funding) || completed">
      <h3>Your contribution</h3>
      <div class="tier-select">
        <img :src="getTierImage(1)" alt="Image of tier." />
        <p>{{ getTierName(1) }}</p>
        <p>{{ value.tiers[1].cost }} $</p>
        <div class="button" @click="withdrawFunds">Withdraw Funds</div>
      </div>
    </div>

    <div id="get-funds" v-if="working && isCreator">
      <div class="button">Withdraw Milestone Funds</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Project } from "@/model/Project";
import { defineComponent, PropType } from "vue";
import Tier from "../model/Tiers";
import { Tier as TierInterface } from "../model/Project";
import Slider from "./Slider.vue";
import MilestoneSlider from "./MilestoneSlider.vue";
import ProjectRaise from "@/web3/projectRaise";

export default defineComponent({
  name: "ProjectPreview",
  props: {
    value: Object as PropType<Project>,
  },
  data: function () {
    return {
      tier: null,
      error: "",
      cancelVotes: 100,
      customFunding: 10,
    };
  },
  watch: {
    network() {
      this.updateProject();
    },
    account() {
      this.updateProject();
    },
  },
  mounted: function () {
    this.updateProject();
  },
  components: { Slider, MilestoneSlider },
  computed: {
    network: function () {
      return this.$store.state.network;
    },
    account: function () {
      return this.$store.state.account;
    },
    votesToCancel: function () {
      let totalFunding = 0;
      this.value.tiers.forEach((tier) => {
        totalFunding += tier.cost * tier.backers;
      });

      return Math.ceil(totalFunding) / 2 + 1;
    },
    funding: function () {
      return this.value?.status == 0;
    },
    working: function () {
      return this.value?.status == 1;
    },
    completed: function () {
      return this.value?.status == 2;
    },
    isCreator: function () {
      if (this.$store.state.account)
        return (
          this.$store.state.account.toLowerCase() ===
          this.value.creator.toLowerCase()
        );
      else return false;
    },
  },
  methods: {
    update: async function () {
      let project = await ProjectRaise.getProject(this.value.address);
      console.log(project);
    },
    withdrawFunds: async function () {
      try {
        await ProjectRaise.withdrawFunds(this.value.address);
      } catch (e) {
        console.error(e);
        this.error = e.toString();
      }
    },
    updateProject: async function () {
      if (this.$store.network) {
        this.cancelVotes = await ProjectRaise.getCancelVote(
          this.value.address,
          this.$store.account
        );
      }
    },
    getTierImage: function (index: number) {
      if (this.value) {
        let img = Tier.getImage(index, this.value.tiers.length);
        console.log(img);

        return `/tiers/${img}`;
      } else return "";
    },
    getTierName: function (index: number) {
      if (this.value) {
        return Tier.getName(index, this.value.tiers.length);
      }
    },
    getSliderFill(tier: TierInterface) {
      return `width: ${((tier.backers / tier.maxBackers) * 100).toFixed(2)}%`;
    },
    calculateCurrentFunding() {
      if (this.value) {
        return this.value.tiers.reduce(
          (acc, current) => (acc += current.backers * current.cost),
          0
        );
      } else return 0;
    },
    /**
     * Remove change status from ProjectPreview [T/1]
     *
     * This is just for debugging purposes in the finala app,
     * it will be read from the smart contract.
     */
    changeStatus() {
      this.$emit("changeStatus", this.value);
    },
    async fundTier(tier) {
      this.fund(tier.cost);
    },
    customFund: async function () {
      this.fund(this.customFunding);
    },
    fund: async function (amount) {
      try {
        await ProjectRaise.acceptBacker(this.value.address, amount);
      } catch (e) {
        this.error = e.toString();
      }
    },
    voteNo: async function () {
      this.vote(true);
    },
    voteYes: async function () {
      this.vote(false);
    },
    vote: async function (cancel) {
      try {
        await ProjectRaise.vote(this.value.address, cancel);
      } catch (e) {
        console.error(e);
        this.error = e.toString();
      }
    },
  },
});
</script>

<style lang="scss">
.main > * {
  margin-bottom: 10px;
}

header {
  position: relative;
}

header > .button {
  position: absolute;
  top: 0;
  right: 0;
  // transform: translateY(-50%);
  margin: 0;
  box-sizing: border-box;
}

h2 {
  margin-top: 0;
  padding-bottom: 1rem;
  border-bottom: $border;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 1rem;
  font-weight: bold;
}

h3 {
  font-size: 1rem;
  margin-top: 2rem;
  margin-bottom: 0;
}

#tier-list > *:not(:last-child) {
  margin-bottom: 10px;
}

.tier-select {
  position: relative;
  display: flex;

  @include interactive();

  border: $border;
  border-radius: 10px;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
  overflow: hidden;

  > *:not(:last-child) {
    margin-right: 20px;
  }

  &:hover {
    background-color: whitesmoke;
  }

  img {
    height: 32px;
    width: 42px;
    object-fit: contain;
  }

  p {
    width: 100px;
    text-align: left;
  }
}

#contribute {
  position: relative;
  border: $border;
  padding: 10px;
  border-radius: 10px;

  .button {
    max-width: 100px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: none;
  }

  span {
    cursor: pointer;
    user-select: none;
    // text-decoration: underline;
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
  }

  input {
    width: 100%;
    display: block;
    box-sizing: border-box;

    ::after {
      content: "$";
      position: absolute;
      left: 5px;
      line-height: 0;
      color: blue;
    }
  }
}

#yes {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: none;
  background-color: $green;
}

#no {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background-color: $red;
}

#get-funds,
#withdraw {
  margin-top: 40px;
}

.errorous {
  color: $red;
  font-weight: bold;
}

.own {
  border-color: $primary;
  border-width: 3px;
  &:before {
    content: "owner";
    background-color: $primary;
    padding: 3px 20px;
    color: $white;
    font-weight: bold;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    position: absolute;
    top: 0;
    transform: translateY(-100%);
  }
}

#status {
  position: absolute;
  top: 0;
  right: 30px;
  transform: translateY(-100%);
  box-sizing: border-box;
  border: none;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.addresses {
  display: flex;
  font-size: 0.75rem;

  span {
    font-weight: bold;
  }

  > * {
    flex: 1;
  }
}

#update {
  position: absolute;
  top: 35px;
  right: 30px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  box-sizing: border-box;
  z-index: 1;
  cursor: pointer;

  .icon {
    transition: transform 0.3s;
  }

  &:active .icon {
    transform: rotate(-30deg);
  }
}
</style>
