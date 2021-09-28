import { AbiItem } from "web3-utils";
import { BigNumber } from "@ethersproject/bignumber";

import * as ProjectFactoryABI from "../../contracts/projectFactory.json";

import store from "../store";
import { ensureWeb3 } from "./utils";

// declare global {
//   interface Window {
//     ethereum: any;
//   }
// }

class ProjectFactory {
  static createContract = async function () {
    if (!store.state.network) throw new Error("Network is not set");

    const web3 = await ensureWeb3();

    const contract = await new web3.eth.Contract(
      ProjectFactoryABI.abi as AbiItem[]
    )
      .deploy({ data: ProjectFactoryABI.bytecode })
      .send({ from: store.state.account });
    return contract;
  };

  static createProjectRaise = async function (
    fundingGoal: BigNumber,
    startTime: BigNumber,
    tokenURI: string,
    milestoneReleaseDates: [],
    milestoneReleasePercents: []
  ): Promise<string> {
    /*eslint prefer-rest-params: "off"*/

    // TODO: Connect to current web3 provider (harmony)
    const web3 = await ensureWeb3();

    const accounts = await web3.eth.getAccounts();
    const contract = await new web3.eth.Contract(
      ProjectFactoryABI.abi as AbiItem[],
      store.state.network.factoryContract
    );
    const projectRaiseContractAddress = await contract.methods
      .createProjectRaise(
        store.state.network.ustContractAddress,
        store.state.account,
        fundingGoal.toHexString(),
        startTime.toHexString(),
        /* 
        Reimplement TokenURI into ‘createProjectRaise’ currently 0 [Q/2] 
         */
        0,
        milestoneReleaseDates,
        milestoneReleasePercents
      )
      .send({ from: accounts[0] });

    return projectRaiseContractAddress;
  };

  static getProjects = async function (address: string) {
    const web3 = await ensureWeb3();

    const contract = await new web3.eth.Contract(
      ProjectFactoryABI.abi as AbiItem[],
      address
    );
    const projectBalance = await contract.methods.getProjects().call();
    return projectBalance;
  };
}

export default ProjectFactory;
