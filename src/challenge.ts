export enum ChallengeStatus {
  IDLE,
  CORRECT,
  WRONG,
}

export enum ChallengeType {
  SINGLE,
  MULTIPLE
}

export class Challenge {
  private challengeType: ChallengeType;
  private challengeStatus: ChallengeStatus;
  private index: number;
  private question: string;
  private choices: string[];
  private answers: number[];
  private explanation?: string;
  private selectedChoices: number[];

  constructor(index: number, question: string, choices: string[], answers: number[], explanation: string | undefined) {
    this.challengeType = answers.length > 1? ChallengeType.MULTIPLE : ChallengeType.SINGLE
    this.challengeStatus = ChallengeStatus.IDLE;
    this.index = index;
    this.question = question;
    this.choices = choices;
    this.answers = answers;
    this.explanation = explanation;
    this.selectedChoices = [];
  }

  public getChallengeType(): ChallengeType {
    return this.challengeType
  }

  public getChallengeStatus(): ChallengeStatus {
    return this.challengeStatus;
  }

  public getIndex(): number {
    return this.index;
  }

  public getQuestion(): string {
    return this.question;
  }

  public setQuestion(newQuestion: string): void {
    this.question = newQuestion;
  }

  public getChoices(): string[] {
    return this.choices;
  }

  public setChoices(newChoices: string[]): void {
    this.choices = newChoices;
  }

  public setSelectedChoices(selectedChoices: number[]): void {
    this.selectedChoices = selectedChoices;
    if (this.arrayEquals(this.answers, this.selectedChoices)) {
      this.challengeStatus = ChallengeStatus.CORRECT;
    } else {
      this.challengeStatus = ChallengeStatus.WRONG;
    }
  }

  public getAnswers(): number[] {
    return this.answers;
  }

  public getExplanation(): string | undefined {
    return this.explanation;
  }

  public setExplanation(newExplanation: string): void {
    this.explanation = newExplanation;
  }

  private arrayEquals(a: number[], b: number[]): boolean {
    const sorted_a = a.sort();
    const sorted_b = b.sort();
    return sorted_a.length === sorted_b.length && sorted_a.every((val, idx) => val === sorted_b[idx]);
  }
}
