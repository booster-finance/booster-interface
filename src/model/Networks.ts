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
  factoryContractAddress: "0xdbe24C380b968Ca636DAb38B728F0c993A202742",
  ustContractAddress: "0xe548bf086b4baa6c8a5ca63ac55c79f5b9af25f7",
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
