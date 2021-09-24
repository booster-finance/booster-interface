// NOTE: Try not to add anything to thie file, it's almost entirely refactored out.

import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'

import { AddressZero } from '@ethersproject/constants'
import ProjectRaiseABI from '../../contracts/projectRaise.json'
import TierNFTABI from '../../contracts/tierNFT.json'
import { Contract } from '@ethersproject/contracts'
import { isAddress } from './validate'

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

// account is optional
export function getProjectRaiseContract(address: string, library: Web3Provider, account?: string): Contract {
  return getContract(
    address,
    ProjectRaiseABI,
    library,
    account
  )
}

// TODO
export function createProjectRaiseInstance(library: Web3Provider, params: Object, account: String) {

}

export function getTierNFTContract(address: string, library: Web3Provider, account?: string): Contract {
  return getContract(address, TierNFTABI, library, account)
}

// TODO
export function createTierNFTInstance(library: Web3Provider, params: Object, account: String) {

}