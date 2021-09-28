import Web3 from "web3";
import { BigNumber } from "@ethersproject/bignumber";
import { AbiItem } from "web3-utils";
import * as ERC20ABI from "../../contracts/erc20.json";


class ERC20 {
  approve = async function (
    address: string,
    spender: string,
    amount: BigNumber
  ) {
    // TODO: Connect to current web3 provider (harmony)
    const web3 = await new Web3(this.$store.state.network);
    if (!web3) {
      return undefined;
    }

    let error: string;
    try {
      const accounts = await web3.eth.getAccounts();
      const contract = await new web3.eth.Contract(
        ERC20ABI as AbiItem[],
        address
      );
      // TODO: Make sure decimal placing is correct
      await contract.methods
        .approve(spender, amount)
        .send({ from: accounts[0] });
    } catch (e: any) {
      error = e.message;
    }

    return error;
  };
}

export default ERC20;
