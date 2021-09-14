import { Milestone as MilestoneModel } from "../model/Project";

export default class Milestone {
  static getName(index: number, length: number): string {
    const numberLength = Math.ceil(length + 1 / 10);
    return `Milestone #${index.toString().padStart(numberLength, "0")}`;
  }

  static applyValidation(
    a: MilestoneValidation,
    b: MilestoneValidation
  ): MilestoneValidation {
    if (!b.valid) {
      a.valid = false;
      a.errors = [...a.errors, ...b.errors];
    }
    return a;
  }

  static validateList(milestones: MilestoneModel[]): MilestoneValidation {
    if (!milestones.length)
      return { valid: false, errors: ["Milestone List cannot be empty!"] };
    else if (milestones.length == 1)
      return this.validateMilestone(milestones[0]);
    else {
      let validation: MilestoneValidation = this.validateMilestone(
        milestones[0]
      );
      for (let i = 1; i < milestones.length; i++) {
        const last = milestones[i - 1];
        const cur = milestones[i];
        let curValidation = this.validateMilestone(cur);

        if (last.releaseDate >= cur.releaseDate) {
          curValidation = this.applyValidation(curValidation, {
            valid: false,
            errors: [
              `Release Date of ${i} is earlier than ${
                i - 1
              } that is not possible!`,
            ],
          });
        }

        validation = this.applyValidation(validation, curValidation);
      }

      return validation;
    }
  }

  static validateMilestone(milestone: MilestoneModel): MilestoneValidation {
    let validation:MilestoneValidation = { valid: true, errors: [] };
    if (!(milestone.releaseDate > 0)) {
      validation = this.applyValidation(validation, {
        valid: false,
        errors: [`Releasedate needs to be a number greater than 0.`],
      });
    }

    if (!(milestone.releaseDate > 0)) {
      validation = this.applyValidation(validation, {
        valid: false,
        errors: [`Releasedate needs to be a number greater than 0.`],
      });
    }

    return validation;
  }
}

interface MilestoneValidation {
  valid: boolean;
  errors: string[];
}
