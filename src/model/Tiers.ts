interface RankType {
  rank: number;
  type: number;
}
export default class Tier {
  static RegularNames: string[] = ["Bronze", "Silver", "Gold"];

  static getTypeAndRank(index: number, length: number): RankType {
    const typeWidth = length / this.RegularNames.length;
    const type = Math.floor(index / typeWidth);
    const rank = Math.floor(index % typeWidth) + 1;
    return { type, rank };
  }

  static getName(index: number, length: number): string {
    const { type, rank } = this.getTypeAndRank(index, length);

    if (length < 4) {
      return this.RegularNames[type];
    } else {
      return `${this.RegularNames[type]} ${rank}`;
    }
  }

  static getImage(index: number, length: number): string {
    const { type, rank } = this.getTypeAndRank(index, length);
    return `${this.RegularNames[type].toLowerCase()}_${rank}.png`;
  }
}
