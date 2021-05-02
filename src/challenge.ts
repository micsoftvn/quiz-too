export class Challenge {
  private index: number;
  private question: string;
  private choices: string[];
  private answers: number[];
  private explanation?: string;

  constructor(index: number, question: string, choices: string[], answers: number[], explanation: string | undefined) {
    this.index = index;
    this.question = question;
    this.choices = choices;
    this.answers = answers;
    this.explanation = explanation;
  }

  public getIndex(): number {
    return this.index;
  }

  public getQuestion(): string {
    return this.question;
  }

  public getChoices(): string[] {
    return this.choices;
  }

  public getAnswers(): number[] {
    return this.answers;
  }

  public getExplanation(): string | undefined {
    return this.explanation;
  }
}
