import Web3 from 'web3'
import { BigNumber } from '@ethersproject/bignumber'

const ProjectFactoryABI = require('../../contracts/projectFactory')

class ProjectFactory {
    createContract = async function () {
        const web3 = await new Web3(this.$store.state.network);        
        if (!web3) {
            return undefined
        }

        const accounts = await web3.eth.getAccounts()
        const contract = await new web3.eth.Contract(ProjectFactoryABI.abi)
            .deploy({data: ProjectFactoryABI.bytecode})
            .send({from: accounts[0]})
        return contract
    }

    createProjectRaise = async function (address: string, usdToken: string, creator: string,
        fundingGoal: BigNumber, startTime: BigNumber, tokenURI: string,
        milestoneReleaseDates: [], milestoneReleasePercents: []) {
        // TODO: Connect to current web3 provider (harmony)
        const web3 = await new Web3(this.$store.state.network);       
        if (!web3) {
            return undefined
        }

        let error: string
        try {
            const accounts = await web3.eth.getAccounts()
            const contract = await new web3.eth.Contract(ProjectFactoryABI.abi, address)
            await contract.methods.createProjectRaise(usdToken, creator, fundingGoal, startTime, tokenURI, milestoneReleaseDates, milestoneReleasePercents).send({from: accounts[0]})
        } catch (e: any) {
            error = e.message
        }

        return error
    }

    getProjects = async function(address: string) {
        // TODO: Connect to current web3 provider (harmony)
        const web3 = await new Web3(this.$store.state.network);         
        if (!web3) {
            return undefined
        }

        const contract = await new web3.eth.Contract(ProjectFactoryABI.abi, address)
        const projectBalance = await contract.methods.getProjects().call()
        return projectBalance
    }
}

export default ProjectFactory