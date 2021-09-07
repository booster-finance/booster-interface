
export default class Tier {

    static RegularNames: string[] = [
        "Bronze",
        "Silver",
        "Gold"
    ]

    static getName(index:number, length:number):string{

        const totalTypes = this.RegularNames.length
        const totalRanks = Math.ceil(length / totalTypes)

        const type = Math.floor(index /totalRanks)
        console.log(index, length, type)
        const rank = (index % totalRanks) + 1

         if(length < 4) {
            return this.RegularNames[index % totalRanks]
        }else {
            return `${this.RegularNames[type]} ${rank}`
        }
    }

    static getImage(index:number, length:number):string{
            const totalTypes = this.RegularNames.length
            const totalRanks = Math.ceil(length / totalTypes)

            const type = Math.floor(index /totalRanks)
            const rank = (index % totalRanks) + 1
            
            return `${this.RegularNames[type].toLowerCase()}_${rank}.png`
    }

}

