import { BigNumber } from "@ethersproject/bignumber";
import { ensureWeb3 } from "./utils";

import ProjectRaiseABI from "../../contracts/projectRaise.json";
import { AbiItem } from "web3-utils";
import { Project } from "@/model/Project";
import * as IPFS from "ipfs-core";
import store from "../store";

import * as ERC20ABI from "../../contracts/erc20.json";

class ProjectRaise {
  // static fromBigNumber(num: number): number {
  //   const decimals = store.state.network.ustDecimals;
  //   return num / Math.pow(10, decimals);
  // }

  // static toBigNumber(num: number): number {
  //   const decimals = store.state.network.ustDecimals;
  //   return num * Math.pow(10, decimals);
  // }

  static async allow(
    account: string,
    spender: string,
    amount: number
  ): Promise<void> {
    const web3 = await ensureWeb3();

    const stablecoinContract = await new web3.eth.Contract(
      ERC20ABI.abi as AbiItem[],
      store.state.network.ustContractAddress
    );

    const allowance = await stablecoinContract.methods
      .allowance(account, spender)
      .call();

    if (allowance < amount)
      await stablecoinContract.methods
        .approve(
          spender,
          "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        )
        .send({ from: account });
  }

  static getProject = async function (address: string): Promise<Project> {
    const web3 = await ensureWeb3();

    const contract = await new web3.eth.Contract(
      ProjectRaiseABI as AbiItem[],
      address
    );

    const tokenURI = await contract.methods.tokenURI().call();

    const { title, description, link } = await this.getIPFS(tokenURI, address);

    /**
     * How to convert the properties received from the ProjectRaise contract? [Q/6]
     */

    const totalFunding = await contract.methods.totalBackingAmount().call();
    const fundingGoal = await contract.methods.fundingGoal().call();

    const status = await contract.methods.currentStatus().call();
    const creator = await contract.methods.creator().call();

    let milestones = await contract.methods.getMilestones().call();
    milestones = milestones.map((milestone) => {
      return {
        releaseDate: parseInt(milestone[0]) * 1000,
        releasePercentage: parseInt(milestone[1]),
      };
    });

    let tiers = await contract.methods.getFundingTiers().call();
    console.log(tiers);
    tiers = tiers[0].map((tier, idx) => {
      return {
        address: tier.reward,
        cost: tiers[1][idx],
        backers: parseInt(tier.currentBackers),
        maxBackers: parseInt(tier.maxBackers),
      };
    });

    /**
     * How to get the Tier List back? [Q/7]
     */

    return {
      address,
      creator,
      /**
       * MetaData
       */
      title,
      description,
      link,
      /**
       * Contract Info
       */
      status,
      fundingGoal,
      totalFunding,
      tiers,
      milestones,
    };
  };

  static async getIPFS(tokenURI, address) {
    const timeout = setTimeout(() => {
      throw new Error("Could not get IPFS token " + tokenURI);
    }, 1000);

    let title, description, link;

    if (tokenURI && tokenURI !== "0") {
      const node = await IPFS.create();

      const source = node.cat(tokenURI);
      const decoder = new TextDecoder();
      let dataString = "";
      for await (const chunk of source) {
        dataString += decoder.decode(chunk);
      }
      await node.stop();
      ({ title, description, link } = JSON.parse(dataString));
      console.log({ title, description, link });
    } else {
      console.error(`Could not find metadata for: ${address}`);
      title = "-";
      description = "-";
      link = "";
    }

    clearTimeout(timeout);
    return { title, description, link };
  }

  static withdrawFunds = async function (address: string) {
    // TODO: Connect to current web3 provider (harmony)
    const web3 = await ensureWeb3();

    const contract = await new web3.eth.Contract(
      ProjectRaiseABI as AbiItem[],
      address
    );
    await contract.methods.withdrawFunds().send({ from: store.state.account });
  };

  static getWithdrawAbleFundAmount = async function (address: string) {
    const web3 = await ensureWeb3();

    const contract = await new web3.eth.Contract(
      ProjectRaiseABI as AbiItem[],
      address
    );
    return await contract.methods.withdrawableFunds().call();
  };

  static cancelProject = async function (address: string): Promise<string> {
    // TODO: Connect to current web3 provider (harmony)
    const web3 = await ensureWeb3();

    let error: string;
    try {
      const contract = await new web3.eth.Contract(
        ProjectRaiseABI as AbiItem[],
        address
      );
      await contract.methods
        .cancelProject()
        .send({ from: store.state.account });
    } catch (e: any) {
      error = e.message;
    }

    return error;
  };

  static assignTiers = async function (
    address: string,
    tierAmounts: [],
    tierRewards: [],
    maxBackers: []
  ): Promise<void> {
    // TODO: Connect to current web3 provider (harmony)
    const web3 = await ensureWeb3();

    const contract = await new web3.eth.Contract(
      ProjectRaiseABI as AbiItem[],
      address
    );

    // TODO: Make sure to convert values to correct decimal place
    await contract.methods
      .assignTiers(tierAmounts, tierRewards, maxBackers)
      .send({ from: store.state.account });
  };

  static checkFundingSuccess = async function (
    address: string
  ): Promise<string> {
    // TODO: Connect to current web3 provider (harmony)
    const web3 = await ensureWeb3();

    let error: string;
    try {
      const contract = await new web3.eth.Contract(
        ProjectRaiseABI as AbiItem[],
        address
      );
      await contract.methods
        .checkFundingSuccess()
        .send({ from: store.state.account });
    } catch (e: any) {
      error = e.message;
    }

    return error;
  };

  static acceptBacker = async function (
    address: string,
    amount: BigNumber
  ): Promise<string> {
    // TODO: Connect to current web3 provider (harmony)
    const web3 = await ensureWeb3();

    let error: string;
    const contract = await new web3.eth.Contract(
      ProjectRaiseABI as AbiItem[],
      address
    );
    // TODO: Make sure to convert values to correct decimal place
    await contract.methods
      .acceptBacker(amount)
      .send({ from: store.state.account, gas: 50000000 });

    return error;
  };

  static vote = async function (address: string, cancelVote: boolean) {
    // TODO: Connect to current web3 provider (harmony)
    const web3 = await ensureWeb3();

    const contract = await new web3.eth.Contract(
      ProjectRaiseABI as AbiItem[],
      address
    );
    await contract.methods.vote(cancelVote).send({ from: store.state.account });
  };

  static milestoneCheck = async function (address: string): Promise<string> {
    // TODO: Connect to current web3 provider (harmony)
    const web3 = await ensureWeb3();

    let error: string;
    try {
      const contract = await new web3.eth.Contract(
        ProjectRaiseABI as AbiItem[],
        address
      );
      await contract.methods
        .milestoneCheck()
        .send({ from: store.state.account });
    } catch (e: any) {
      error = e.message;
    }

    return error;
  };

  static withdrawRefund = async function (address: string): Promise<string> {
    // TODO: Connect to current web3 provider (harmony)
    const web3 = await ensureWeb3();

    let error: string;
    try {
      const contract = await new web3.eth.Contract(
        ProjectRaiseABI as AbiItem[],
        address
      );
      // TODO: Make sure to convert values to correct decimal place
      await contract.methods
        .withdrawRefund(0)
        .send({ from: store.state.account });
    } catch (e: any) {
      error = e.message;
    }

    return error;
  };

  static getFundingTiers = async function (address: string) {
    const web3 = await ensureWeb3();

    const contract = await new web3.eth.Contract(
      ProjectRaiseABI as AbiItem[],
      address
    );
    const fundingTiers = await contract.methods.getFundingTiers().call();
    return fundingTiers;
  };

  static getMilestones = async function (address: string) {
    const web3 = await ensureWeb3();

    const contract = await new web3.eth.Contract(
      ProjectRaiseABI as AbiItem[],
      address
    );
    const milestones = await contract.methods.getMilestones().call();
    return milestones;
  };

  static getBackerRewards = async function (address: string, account: string) {
    // TODO: Connect to current web3 provider (harmony)
    const web3 = await ensureWeb3();

    const contract = await new web3.eth.Contract(
      ProjectRaiseABI as AbiItem[],
      address
    );
    const backerRewards = await contract.methods
      .getBackerRewards(account)
      .call();
    return backerRewards;
  };

  static getAddressBacking = async function (address: string, account: string) {
    // TODO: Connect to current web3 provider (harmony)
    const web3 = await ensureWeb3();

    const contract = await new web3.eth.Contract(
      ProjectRaiseABI as AbiItem[],
      address
    );
    const addressBacking = await contract.methods
      .getAddressBacking(account)
      .call();
    return addressBacking;
  };

  static getCancelVote = async function (address: string, account: string) {
    // TODO: Connect to current web3 provider (harmony)
    const web3 = await ensureWeb3();

    const contract = await new web3.eth.Contract(
      ProjectRaiseABI as AbiItem[],
      address
    );
    const cancelVote = await contract.methods.getCancelVote(account).call();
    return cancelVote;
  };

  static getVotesCount = async function (address) {
    const web3 = await ensureWeb3();

    const contract = await new web3.eth.Contract(
      ProjectRaiseABI as AbiItem[],
      address
    );
    const cancelVote = await contract.methods.cancelVoteCount().call();
    return cancelVote;
  };

  static balanceOf = async function (address: string) {
    // TODO: Connect to current web3 provider (harmony)
    const web3 = await ensureWeb3();

    const contract = await new web3.eth.Contract(
      ProjectRaiseABI as AbiItem[],
      address
    );
    const projectBalance = await contract.methods.balanceOf().call();
    return projectBalance;
  };
}

export default ProjectRaise;
