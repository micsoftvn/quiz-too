import { Challenge } from "./challenge";

export class Quiz {
  private challengeCount: number;
  private challenges: Challenge[];

  constructor(challenges: Challenge[]) {
    this.challenges = this.sanitizeChallenges(challenges);
    this.challengeCount = challenges.length;
  }

  public getChallenges(): Challenge[] {
    return this.challenges;
  }

  private sanitizeChallenges(challenges: Challenge[]): Challenge[] {
    return challenges.filter(
      (challenge) => challenge.getIndex() > 0 && challenge.getAnswers().length > 0 && challenge.getChoices().length > 0,
    );
  }
}
