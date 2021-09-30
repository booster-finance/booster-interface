export interface Network {
  chainId: number;
  name: string;
  rpc: string;
  factoryContractAddress: string;
  ustContractAddress: string;
  ustDecimals: number
}

const HARMONY_TESTNET: Network = {
  chainId: 1666700000,
  name: "Harmony Testnet",
  rpc: "https: api.s0.b.hmny.io",
  factoryContractAddress: "0xbC38bA81660DF437e20178ACbaB8508569562Ded",
  ustContractAddress: "0x65f70b2884bce4f700421733634BF2BD5a5fe3e7",
  ustDecimals: 18
};

const HARMONY_MAINNET: Network = {
  chainId: 1666600000,
  name: "Harmony",
  rpc: "https://api.harmony.one",
  factoryContractAddress: null,
  ustContractAddress: null,
  ustDecimals: 18
};

const Networks = {
  [HARMONY_TESTNET.chainId]: HARMONY_TESTNET,
  [HARMONY_MAINNET.chainId]: HARMONY_MAINNET,
};

export default function getNetwork(chainId: number): Network {
  return Networks[chainId] || null;
}

const defaultChain = HARMONY_TESTNET

export { defaultChain }

