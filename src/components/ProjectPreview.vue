<template>
  <div class="project-preview" :class="{ own: isCreator }">
    <div class="main">

      <div class="button" id="update" @click="update">
        <font-awesome-icon class="icon" :icon="['fas', 'sync']" />
      </div>

      <div class="button" id="mc" @click="milestoneCheck">
        <font-awesome-icon class="icon" :icon="['fas', 'sync']" />
        2
      </div>

      <div
        v-if="isCreator"
        class="button"
        id="cancel-btn"
        @click="cancelProject"
      >
        <font-awesome-icon class="icon" :icon="['fas', 'ban']" />
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
      <h3 v-if="started">Tiers</h3>

      <div id="tier-list" v-if="started && !tier">
        <div
          class="tier-select"
          :class="{ pending: tier.pending }"
          v-for="(tier, index) of value.tiers"
          v-bind:key="`tier-${index}`"
          @click="fundTier(tier)"
        >
          <img :src="getTierImage(index)" alt="Image of tier." />
          <p>{{ getTierName(index) }}</p>
          <!-- <slider :max="tier.maxBackers" :value="tier.backers" /> -->
          <p>{{ displayDecimal(tier.cost) }} $</p>
        </div>
      </div>
      <div id="contribute" v-if="started">
        <span>Support Project Without Reward</span>
        <div class="row">
          <input v-model="customFunding" type="number" step="0.01" min="0" />
          <div class="button" @click="customFund">Fund</div>
        </div>
      </div>

      <div class="errorous">
        {{ this.error }}
      </div>

      <div class="funding" v-if="!finished">
        <h3>Funding</h3>
        <Slider :value="totalFunding" :max="fundingGoal" />
      </div>

      <div v-if="funded && tier">
        <h4>Voting</h4>
        <div v-if="tier" class="tier-select">
          <p>{{ displayDecimal(tier.cost) }} $</p>
        </div>
        <div class="row" v-if="funded">
          <div v-if="!cancelVote" class="button" id="no" @click="voteNo">
            No
          </div>
          <div v-else>You already voted</div>
          <!-- <div class="button" id="yes" @click="voteYes">Yes</div> -->
        </div>
      </div>

      <slider
        v-if="funded"
        :max="votesToCancel"
        :value="displayDecimal(votes)"
      />

      <div class="info" v-if="finished">
        <font-awesome-icon class="icon" :icon="['fas', 'info-circle']" />
        This project has been completed!
      </div>
    </div>

    <div id="withdraw" v-if="tier && (started || cancelled)">
      <h3>Your contribution</h3>
      <div class="tier-select">
        <p>{{ displayDecimal(tier.cost) }} $</p>
        <div class="button" @click="withdrawInvestment">Withdraw Funds</div>
      </div>
    </div>

    <div id="get-funds" v-if="!started && isCreator">
      <div class="button" @click="withdrawFunds">
        Withdraw Milestone Funds ({{ displayDecimal(this.withdrawableFunds) }}$)
      </div>
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
import { BigNumber } from "@ethersproject/bignumber";

export default defineComponent({
  name: "ProjectPreview",
  props: {
    value: Object as PropType<Project>,
    tier: Object,
  },
  data: function () {
    return {
      error: "",
      cancelVote: false,
      votes: 0,
      customFunding: 10,
      withdrawableFunds: "UNSET",
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
      const totalFunding = this.value.totalFunding;
      return this.displayDecimal(Math.ceil(totalFunding) / 2 + 1);
    },
    totalFunding: function () {
      return this.displayDecimal(this.value.totalFunding);
    },
    fundingGoal: function () {
      return this.displayDecimal(this.value.fundingGoal);
    },
    started: function () {
      return this.value?.status == 0;
    },
    funded: function () {
      return this.value?.status == 1;
    },
    finished: function () {
      return this.value?.status == 2;
    },
    cancelled: function () {
      return this.value?.status == 3;
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
    displayDecimal(val: number) {
      const decimals = this.$store.state.network.ustDecimals;
      const div = Math.pow(10, decimals);
      return Math.floor(val / div);
    },
    update: async function () {
      await ProjectRaise.checkFundingSuccess(this.value.address);
      this.updateProject();
    },
    milestoneCheck: async function () {
      await ProjectRaise.milestoneCheck(this.value.address);
      this.updateProject();
    },
    cancelProject: async function () {
      await ProjectRaise.cancelProject(this.value.address);
      this.updateProject();
    },
    withdrawInvestment: async function () {
      try {
        await ProjectRaise.withdrawRefund(this.value.address);
        window.location.reload();
      } catch (e) {
        console.error(e);
        this.error = e.toString();
      }
    },
    async getWithdrawAbleFunds() {
      let withdrawableFunds = "UNDEFINED";
      try {
        withdrawableFunds = await ProjectRaise.getWithdrawAbleFundAmount(
          this.value.address
        );
      } catch (e) {
        console.error(e);
        this.error = e.toString();
      }

      return withdrawableFunds;
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
      if (this.$store.state.network) {
        this.cancelVote = await ProjectRaise.getCancelVote(
          this.value.address,
          this.$store.state.account
        );

        this.withdrawableFunds = await this.getWithdrawAbleFunds();
        this.votes = await ProjectRaise.getVotesCount(this.value.address);
      }
    },
    getTierImage: function (index: number) {
      if (this.value) {
        let img = Tier.getImage(index, this.value.tiers.length);

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
    async fundTier(tier) {
      tier.pending = true;
      await this.fund(tier.cost);
      tier.pending = false;
    },
    customFund: async function () {
      const decimals = this.$store.state.network.ustDecimals;
      this.fund(
        BigNumber.from(this.customFunding).mul(String(Math.pow(10, decimals)))
      );
    },
    fund: async function (amount) {
      try {
        await ProjectRaise.allow(
          this.$store.state.account,
          this.value.address,
          amount
        );

        await ProjectRaise.acceptBacker(this.value.address, amount);

        this.updateProject();
      } catch (e) {
        this.error = e.message.toString();
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
        this.updateProject();
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
  justify-content: space-between;
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

  // p {
  //   width: 100px;
  //   text-align: left;
  // }
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

#no {
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
    padding: 3px 20px;
    color: $primary;
    font-weight: bold;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    position: absolute;
    top: 0;
    right: 10px;
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

#cancel-btn,
#mc,
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

#mc {
  right: 100px;
}

#cancel-btn {
  right: 175px;
}

.funding {
  margin: 5em 0;
}

.pending {
  animation: pend 1s infinite alternate;
}

@keyframes pend {
  0% {
    background-color: transparent;
    color: $gray-70;
  }
  100% {
    background-color: $primary;
    color: $white;
  }
}
</style>
