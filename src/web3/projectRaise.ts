import Web3 from 'web3'
import { BigNumber } from '@ethersproject/bignumber'

const ProjectRaiseABI = require('../../contracts/projectRaise')

class ProjectRaise {
    withdrawFunds = async function (address: string) {
        // TODO: Connect to current web3 provider (harmony)
        const web3 = await new Web3(this.$store.state.network);       
        if (!web3) {
            return undefined
        }

        let error: string
        try {
            const accounts = await web3.eth.getAccounts()
            const contract = await new web3.eth.Contract(ProjectRaiseABI, address)
            await contract.methods.withdrawFunds().send({from: accounts[0]})
        } catch (e: any) { 
            error = e.message
        }

        return error
    }

    cancelProject = async function (address: string) {
        // TODO: Connect to current web3 provider (harmony)
        const web3 = await new Web3(this.$store.state.network);       
        if (!web3) {
            return undefined
        }

        let error: string
        try {
            const accounts = await web3.eth.getAccounts()
            const contract = await new web3.eth.Contract(ProjectRaiseABI, address)
            await contract.methods.cancelProject().send({from: accounts[0]})
        } catch (e: any) {
            error = e.message
        }

        return error
    }

    assignTiers = async function (address: string, tierAmounts: [], tierRewards: [], maxBackers: []) {
        // TODO: Connect to current web3 provider (harmony)
        const web3 = await new Web3(this.$store.state.network);       
        if (!web3) {
            return undefined
        }

        let error: string
        try {
            const accounts = await web3.eth.getAccounts()
            const contract = await new web3.eth.Contract(ProjectRaiseABI, address)
            // TODO: Make sure to convert values to correct decimal place
            await contract.methods.assignTiers(tierAmounts, tierRewards, maxBackers).send({from: accounts[0]})
        } catch (e: any) {
            error = e.message
        }

        return error
    }

    checkFundingSuccess = async function (address: string) {
        // TODO: Connect to current web3 provider (harmony)
        const web3 = await new Web3(this.$store.state.network);       
        if (!web3) {
            return undefined
        }

        let error: string
        try {
            const accounts = await web3.eth.getAccounts()
            const contract = await new web3.eth.Contract(ProjectRaiseABI, address)
            await contract.methods.checkFundingSuccess().send({from: accounts[0]})
        } catch (e: any) {
            error = e.message
        }

        return error
    }

    acceptBacker = async function (address: string, amount: BigNumber) {
        // TODO: Connect to current web3 provider (harmony)
        const web3 = await new Web3(this.$store.state.network);       
        if (!web3) {
            return undefined
        }

        let error: string
        try {
            const accounts = await web3.eth.getAccounts()
            const contract = await new web3.eth.Contract(ProjectRaiseABI, address)
            // TODO: Make sure to convert values to correct decimal place
            await contract.methods.checkFundingSuccess(amount).send({from: accounts[0]})
        } catch (e: any) {
            error = e.message
        }

        return error
    }

    vote = async function (address: string, cancelVote: Boolean) {
        // TODO: Connect to current web3 provider (harmony)
        const web3 = await new Web3(this.$store.state.network);       
        if (!web3) {
            return undefined
        }

        let error: string
        try {
            const accounts = await web3.eth.getAccounts()
            const contract = await new web3.eth.Contract(ProjectRaiseABI, address)
            await contract.methods.vote(cancelVote).send({from: accounts[0]})
        } catch (e: any) {
            error = e.message
        }

        return error
    }

    milestoneCheck = async function (address: string) {
        // TODO: Connect to current web3 provider (harmony)
        const web3 = await new Web3(this.$store.state.network);       
        if (!web3) {
            return undefined
        }

        let error: string
        try {
            const accounts = await web3.eth.getAccounts()
            const contract = await new web3.eth.Contract(ProjectRaiseABI, address)
            await contract.methods.milestoneCheck().send({from: accounts[0]})
        } catch (e: any) {
            error = e.message
        }

        return error
    }

    withdrawRefund = async function (address: string, amount: BigNumber) {
        // TODO: Connect to current web3 provider (harmony)
        const web3 = await new Web3(this.$store.state.network);       
        if (!web3) {
            return undefined
        }

        let error: string
        try {
            const accounts = await web3.eth.getAccounts()
            const contract = await new web3.eth.Contract(ProjectRaiseABI, address)
            const value = web3.utils.toWei(String(amount), 'ether')
            // TODO: Make sure to convert values to correct decimal place
            await contract.methods.withdrawRefund(amount).send({from: accounts[0]})
        } catch (e: any) {
            error = e.message
        }

        return error
    }

    getBackerRewards = async function(address: string, account: string) {
        // TODO: Connect to current web3 provider (harmony)
        const web3 = await new Web3(this.$store.state.network);         
        if (!web3) {
            return undefined
        }

        const contract = await new web3.eth.Contract(ProjectRaiseABI, address)
        const backerRewards = await contract.methods.getBackerRewards(account).call()
        return backerRewards
    }

    getAddressBacking = async function(address: string, account: string) {
        // TODO: Connect to current web3 provider (harmony)
        const web3 = await new Web3(this.$store.state.network);         
        if (!web3) {
            return undefined
        }

        const contract = await new web3.eth.Contract(ProjectRaiseABI, address)
        const addressBacking = await contract.methods.getAddressBacking(account).call()
        return addressBacking
    }

    getCancelVote = async function(address: string, account: string) {
        // TODO: Connect to current web3 provider (harmony)
        const web3 = await new Web3(this.$store.state.network);         
        if (!web3) {
            return undefined
        }

        const contract = await new web3.eth.Contract(ProjectRaiseABI, address)
        const cancelVote = await contract.methods.getCancelVote(account).call()
        return cancelVote
    }

    balanceOf = async function(address: string) {
        // TODO: Connect to current web3 provider (harmony)
        const web3 = await new Web3(this.$store.state.network);         
        if (!web3) {
            return undefined
        }

        const contract = await new web3.eth.Contract(ProjectRaiseABI, address)
        const projectBalance = await contract.methods.balanceOf().call()
        return projectBalance
    }
}

export default ProjectRaise