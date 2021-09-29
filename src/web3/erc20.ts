import { ensureWeb3 } from "./utils";
import { BigNumber } from "@ethersproject/bignumber";
import { AbiItem } from "web3-utils";
import * as ERC20ABI from "../../contracts/erc20.json";
import store from "../store";


class ERC20 {
  approve = async function (
    address: string,
    spender: string,
    amount: BigNumber
  ) {
    const web3 = await ensureWeb3();

    let error: string;
    try {
      const contract = await new web3.eth.Contract(
        ERC20ABI as AbiItem[],
        address
      );
      // TODO: Make sure decimal placing is correct
      await contract.methods
        .approve(spender, amount)
        .send({ from: store.state.account });
    } catch (e: any) {
      error = e.message;
    }

    return error;
  };
}

export default ERC20;
