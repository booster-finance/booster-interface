import { BigNumber } from "@ethersproject/bignumber";
import { ensureWeb3 } from "./utils";

import ProjectRaiseABI from "../../contracts/projectRaise.json";
import { AbiItem } from "web3-utils";

class ProjectRaise {
  withdrawFunds = async function (address: string): Promise<string> {
    // TODO: Connect to current web3 provider (harmony)
    const web3 = await ensureWeb3();

    let error: string;
    try {
      const accounts = await web3.eth.getAccounts();
      const contract = await new web3.eth.Contract(
        ProjectRaiseABI as AbiItem[],
        address
      );
      await contract.methods.withdrawFunds().send({ from: accounts[0] });
    } catch (e: any) {
      error = e.message;
    }

    return error;
  };

  cancelProject = async function (address: string): Promise<string> {
    // TODO: Connect to current web3 provider (harmony)
    const web3 = await ensureWeb3();

    let error: string;
    try {
      const accounts = await web3.eth.getAccounts();
      const contract = await new web3.eth.Contract(
        ProjectRaiseABI as AbiItem[],
        address
      );
      await contract.methods.cancelProject().send({ from: accounts[0] });
    } catch (e: any) {
      error = e.message;
    }

    return error;
  };

  assignTiers = async function (
    address: string,
    tierAmounts: [],
    tierRewards: [],
    maxBackers: []
  ): Promise<string> {
    // TODO: Connect to current web3 provider (harmony)
    const web3 = await ensureWeb3();

    let error: string;
    try {
      const accounts = await web3.eth.getAccounts();
      const contract = await new web3.eth.Contract(
        ProjectRaiseABI as AbiItem[],
        address
      );
      // TODO: Make sure to convert values to correct decimal place
      await contract.methods
        .assignTiers(tierAmounts, tierRewards, maxBackers)
        .send({ from: accounts[0] });
    } catch (e: any) {
      error = e.message;
    }

    return error;
  };

  checkFundingSuccess = async function (address: string): Promise<string> {
    // TODO: Connect to current web3 provider (harmony)
    const web3 = await ensureWeb3();

    let error: string;
    try {
      const accounts = await web3.eth.getAccounts();
      const contract = await new web3.eth.Contract(
        ProjectRaiseABI as AbiItem[],
        address
      );
      await contract.methods.checkFundingSuccess().send({ from: accounts[0] });
    } catch (e: any) {
      error = e.message;
    }

    return error;
  };

  acceptBacker = async function (
    address: string,
    amount: BigNumber
  ): Promise<string> {
    // TODO: Connect to current web3 provider (harmony)
    const web3 = await ensureWeb3();

    let error: string;
    try {
      const accounts = await web3.eth.getAccounts();
      const contract = await new web3.eth.Contract(
        ProjectRaiseABI as AbiItem[],
        address
      );
      // TODO: Make sure to convert values to correct decimal place
      await contract.methods
        .checkFundingSuccess(amount)
        .send({ from: accounts[0] });
    } catch (e: any) {
      error = e.message;
    }

    return error;
  };

  vote = async function (
    address: string,
    cancelVote: boolean
  ): Promise<string> {
    // TODO: Connect to current web3 provider (harmony)
    const web3 = await ensureWeb3();

    let error: string;
    try {
      const accounts = await web3.eth.getAccounts();
      const contract = await new web3.eth.Contract(
        ProjectRaiseABI as AbiItem[],
        address
      );
      await contract.methods.vote(cancelVote).send({ from: accounts[0] });
    } catch (e: any) {
      error = e.message;
    }

    return error;
  };

  milestoneCheck = async function (address: string): Promise<string> {
    // TODO: Connect to current web3 provider (harmony)
    const web3 = await ensureWeb3();

    let error: string;
    try {
      const accounts = await web3.eth.getAccounts();
      const contract = await new web3.eth.Contract(
        ProjectRaiseABI as AbiItem[],
        address
      );
      await contract.methods.milestoneCheck().send({ from: accounts[0] });
    } catch (e: any) {
      error = e.message;
    }

    return error;
  };

  withdrawRefund = async function (
    address: string,
    amount: BigNumber
  ): Promise<string> {
    // TODO: Connect to current web3 provider (harmony)
    const web3 = await ensureWeb3();

    let error: string;
    try {
      const accounts = await web3.eth.getAccounts();
      const contract = await new web3.eth.Contract(
        ProjectRaiseABI as AbiItem[],
        address
      );
      const value = web3.utils.toWei(String(amount), "ether");
      // TODO: Make sure to convert values to correct decimal place
      await contract.methods.withdrawRefund(amount).send({ from: accounts[0] });
    } catch (e: any) {
      error = e.message;
    }

    return error;
  };

  getBackerRewards = async function (address: string, account: string) {
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

  getAddressBacking = async function (address: string, account: string) {
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

  getCancelVote = async function (address: string, account: string) {
    // TODO: Connect to current web3 provider (harmony)
    const web3 = await ensureWeb3();

    const contract = await new web3.eth.Contract(
      ProjectRaiseABI as AbiItem[],
      address
    );
    const cancelVote = await contract.methods.getCancelVote(account).call();
    return cancelVote;
  };

  balanceOf = async function (address: string) {
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
