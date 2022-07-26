import { Interface } from "readline";

/////////// totals with initial values
const totals: TotalsType = {
  SHORTER_THAN_15: 0,
  MOVER_MENTIONS: 0,
  SHAKER_MENTION: 0,
  QUESTIONS: 0,
  SPAM: 0,
};

export interface TotalsType {
  SHORTER_THAN_15: number;
  MOVER_MENTIONS: number;
  SHAKER_MENTION: number;
  QUESTIONS: number;
  SPAM: number;
}

export class CommentAnalyzer {
  file: string;
  line: Interface;
  constructor(file: string, line: Interface) {
    this.file = file;
    this.line = line;
  }
  totals = totals;
  /////////// this method helps adding the new metrics.
  private finder = (
    condition: boolean,
    type: keyof TotalsType,
    newValue: number
  ) => {
    if (condition) {
      return totals[type] + newValue;
    }
    return totals[type];
  };

  ////////// analyzing the comment
  public analyze = () => {
    this.line.on("line", (line) => {
      //////////// conditions
      const moverMatches = line.match(/mover/gi);
      const shakerMatches = line.match(/shaker/gi);
      const urlMatch = line.match(
        /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
      );
      const questionsMatches = line.includes("?");
      const shortMatches = line.trim() !== "" && line.length <= 15;
      totals.SHAKER_MENTION = this.finder(
        !!shakerMatches,
        "SHAKER_MENTION",
        shakerMatches?.length as number
      );
      totals.MOVER_MENTIONS = this.finder(
        !!moverMatches,
        "MOVER_MENTIONS",
        moverMatches?.length as number
      );
      totals.SPAM = this.finder(!!urlMatch, "SPAM", 1);
      totals.SHORTER_THAN_15 = this.finder(shortMatches, "SHORTER_THAN_15", 1);

      totals.QUESTIONS = this.finder(questionsMatches, "QUESTIONS", 1);
    });
  };
}
