import { AbiItem } from "web3-utils";
import * as TierNFTABI from "../../contracts/tierNFT.json";
import { ensureWeb3 } from "./utils";

class TierNFT {
  static createContract = async function (proxyMintingAddress: string) {
    const web3 = await ensureWeb3();
    const accounts = await web3.eth.getAccounts();
    const contract = await new web3.eth.Contract(TierNFTABI.abi as AbiItem[])
      .deploy({
        data: TierNFTABI.bytecode,
        arguments: [proxyMintingAddress],
      })
      .send({ from: accounts[0] });
    return contract;
  };

  static baseTokenURI = async function (address: string) {
    // TODO: Connect to current web3 provider (harmony)
    const web3 = await ensureWeb3();
    const contract = await new web3.eth.Contract(
      TierNFTABI.abi as AbiItem[],
      address
    );
    const baseTokenURI = await contract.methods.baseTokenURI().call();
    return baseTokenURI;
  };

  static contractURI = async function (address: string) {
    // TODO: Connect to current web3 provider (harmony)
    const web3 = await ensureWeb3();
    const contract = await new web3.eth.Contract(
      TierNFTABI.abi as AbiItem[],
      address
    );
    const contractURI = await contract.methods.contractURI().call();
    return contractURI;
  };
}

export default TierNFT;
