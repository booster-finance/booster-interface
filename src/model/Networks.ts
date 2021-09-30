export interface Network {
  chainId: number;
  name: string;
  rpc: string;
  factoryContractAddress: string;
  ustContractAddress: string;
}

const HARMONY_TESTNET: Network = {
  chainId: 1666700000,
  name: "Harmony Testnet",
  rpc: "https: api.s0.b.hmny.io",
  factoryContractAddress: "0x738865a5fd23E70C1F64dEb847EF75130F160393",
  ustContractAddress: "0x9e9bebfb40ba860fa15a24ecc082aa4192f84d13",
};

const HARMONY_MAINNET: Network = {
  chainId: 1666600000,
  name: "Harmony",
  rpc: "https://api.harmony.one",
  factoryContractAddress: null,
  ustContractAddress: null,
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

