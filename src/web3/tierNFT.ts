import Web3 from 'web3'
import { AbiItem } from 'web3-utils'


import * as TierNFTABI from '../../contracts/tierNFT.json'


class TierNFT {
    static createContract = async function (proxyMintingAddress: string) {
        const web3 = await new Web3(this.$store.state.network);        
        if (!web3) {
            return undefined
        }

        const accounts = await web3.eth.getAccounts()
        const contract = await new web3.eth.Contract(TierNFTABI.abi as AbiItem[])
            .deploy(
                {
                    data: TierNFTABI.bytecode,
                    arguments: [proxyMintingAddress]
                })
            .send({from: accounts[0]})
        return contract
    }

    static baseTokenURI = async function(address: string) {
        // TODO: Connect to current web3 provider (harmony)
        const web3 = await new Web3(this.$store.state.network);         
        if (!web3) {
            return undefined
        }

        const contract = await new web3.eth.Contract(TierNFTABI.abi as AbiItem[], address)
        const baseTokenURI = await contract.methods.baseTokenURI().call()
        return baseTokenURI
    }

    static contractURI = async function(address: string) {
        // TODO: Connect to current web3 provider (harmony)
        const web3 = await new Web3(this.$store.state.network);         
        if (!web3) {
            return undefined
        }

        const contract = await new web3.eth.Contract(TierNFTABI.abi as AbiItem[], address)
        const contractURI = await contract.methods.contractURI().call()
        return contractURI
    }
}

export default TierNFT