import Web3 from 'web3'

const TierNFTABI = require('../../contracts/tierNFT')

class TierNFT {
    createContract = async function (proxyMintingAddress: string) {
        const web3 = await new Web3(this.$store.state.network);        
        if (!web3) {
            return undefined
        }

        const accounts = await web3.eth.getAccounts()
        const contract = await new web3.eth.Contract(TierNFTABI.abi)
            .deploy(
                {
                    data: TierNFTABI.bytecode,
                    arguments: [proxyMintingAddress]
                })
            .send({from: accounts[0]})
        return contract
    }

    baseTokenURI = async function(address: string) {
        // TODO: Connect to current web3 provider (harmony)
        const web3 = await new Web3(this.$store.state.network);         
        if (!web3) {
            return undefined
        }

        const contract = await new web3.eth.Contract(TierNFTABI.abi, address)
        const baseTokenURI = await contract.methods.baseTokenURI().call()
        return baseTokenURI
    }

    contractURI = async function(address: string) {
        // TODO: Connect to current web3 provider (harmony)
        const web3 = await new Web3(this.$store.state.network);         
        if (!web3) {
            return undefined
        }

        const contract = await new web3.eth.Contract(TierNFTABI.abi, address)
        const contractURI = await contract.methods.contractURI().call()
        return contractURI
    }
}

export default TierNFT