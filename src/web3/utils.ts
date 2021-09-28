import Web3 from "web3";

export async function ensureWeb3(): Promise<Web3> {
  const web3 = await new Web3(Web3.givenProvider || "ws://localhost:9500");
  if (!web3) throw new Error("Could not resolve web3.");
  return web3;
}
