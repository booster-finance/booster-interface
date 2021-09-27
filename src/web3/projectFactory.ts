import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { BigNumber } from '@ethersproject/bignumber'

import * as ProjectFactoryABI from '../../contracts/projectFactory.json'

import store from "../store"

declare global {
    interface Window {
        ethereum: any;
    }
}

class ProjectFactory {
    static createContract = async function () {
        console.log(store.state.network)

        const web3 = await new Web3(Web3.givenProvider || "ws://localhost:9500");
        if (!web3) {
            return undefined
        }

        const contract = await new web3.eth.Contract(ProjectFactoryABI.abi as AbiItem[])
            .deploy({ data: ProjectFactoryABI.bytecode })
            .send({ from: store.state.account })
        return contract
    }

    static createProjectRaise = async function (fundingGoal: BigNumber, startTime: BigNumber, tokenURI: string, milestoneReleaseDates: [], milestoneReleasePercents: []) {
        
       /*eslint prefer-rest-params: "off"*/
        console.log(arguments)
        
        // TODO: Connect to current web3 provider (harmony)
        const web3 = await new Web3(Web3.givenProvider || "ws://localhost:9500");
        if (!web3) {
            return undefined
        }

        let error: string
        try {
            const accounts = await web3.eth.getAccounts()
            const contract = await new web3.eth.Contract(ProjectFactoryABI.abi as AbiItem[],
                store.state.factoryContractAddress)
                console.log(tokenURI)
            // await contract.methods.createProjectRaise(store.state.ustContractAddress, store.state.account, fundingGoal, startTime.toHexString(), tokenURI, milestoneReleaseDates, milestoneReleasePercents).send({ from: accounts[0] })
        } catch (e: any) {
            error = e.message
        }

        return error
    }

    static getProjects = async function (address: string) {
        // TODO: Connect to current web3 provider (harmony)
        const web3 = await new Web3(Web3.givenProvider || "ws://localhost:9500");
        if (!web3) {
            return undefined
        }

        const contract = await new web3.eth.Contract(ProjectFactoryABI.abi as AbiItem[], address)
        const projectBalance = await contract.methods.getProjects().call()
        return projectBalance
    }
}

export default ProjectFactory