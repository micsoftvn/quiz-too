import { Challenge } from "./challenge";

type Challenges = Map<number, Challenge>;

export class Quiz {
  private challengeCount: number;
  private challenges: Challenges;

  constructor(challenges: Challenges) {
    this.challenges = this.sanitizeChallenges(challenges);
    this.challengeCount = challenges.size;
  }

  public getChallenges(): Challenges {
    return this.challenges;
  }

  public getChallengeCount(): number {
    return this.challengeCount;
  }

  public setChallenge(challenge: Challenge): void {
    const idx = challenge.getIndex();
    this.challenges.set(idx, challenge);
  }

  private sanitizeChallenges(challenges: Challenges): Challenges {
    const newChallenge = new Map();
    challenges.forEach((challenge) => {
      if (
        challenge.getQuestion() !== "" &&
        challenge.getIndex() > 0 &&
        challenge.getAnswers().length > 0 &&
        challenge.getChoices().length > 0
      ) {
        newChallenge.set(challenge.getIndex(), challenge);
      }
    });
    return newChallenge;
  }
}
