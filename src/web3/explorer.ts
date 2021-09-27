const enum ChainId {
    HARMONY = 1666600000,
    HARMONY_TESTNET = 1666700000,
    HARMONY_LOCALNET = 1666700000
  }

const explorer = {
  harmony: (link: string, data: string, type: 'transaction' | 'token' | 'address' | 'block') => {
    switch (type) {
      case 'transaction':
        return `${link}/tx/${data}`
      case 'token':
        return `${link}/address/${data}`
      default:
        return `${link}/${type}/${data}`
    }
  }
}
interface ChainObject {
  [chainId: number]: {
    link: string
    builder: (chainName: string, data: string, type: 'transaction' | 'token' | 'address' | 'block') => string
  }
}

const chains: ChainObject = {
  [ChainId.HARMONY]: {
    link: 'https://beta.explorer.harmony.one/#',
    builder: explorer.harmony,
  },
  [ChainId.HARMONY_TESTNET]: {
    link: 'https://explorer.pops.one/#',
    builder: explorer.harmony,
  },
  [ChainId.HARMONY_LOCALNET]: {
    link: '#',
    builder: explorer.harmony,
  }
}

export function getExplorerLink(
  chainId: ChainId,
  data: string,
  type: 'transaction' | 'token' | 'address' | 'block'
): string {
  const chain = chains[chainId]
  return chain.builder(chain.link, data, type)
}
