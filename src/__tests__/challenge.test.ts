import { readFileSync } from "fs";
import { ChallengeStatus, ChallengeType } from "../challenge";
import { MdFileProcessor } from "../mdFileProcessor";

const data = readFileSync("./samples/java-quiz.md", "utf-8");

test("test challenge component single type", async () => {
  const mdFileProcessor = new MdFileProcessor(data);
  const quiz = mdFileProcessor.getQuiz();
  const challenge = quiz.getChallenges()[0];
  challenge.setSelectedChoices([1]);
  const status = challenge.getChallengeStatus();
  expect(status).toEqual(ChallengeStatus.CORRECT);

  const challengeType = challenge.getChallengeType();
  expect(challengeType).toEqual(ChallengeType.SINGLE);
});

test("test challenge component multiple type", async () => {
  const mdFileProcessor = new MdFileProcessor(data);
  const quiz = mdFileProcessor.getQuiz();
  const challenge = quiz.getChallenges()[1];
  challenge.setSelectedChoices([2, 1]);
  const status = challenge.getChallengeStatus();
  expect(status).toEqual(ChallengeStatus.CORRECT);

  const challengeType = challenge.getChallengeType();
  expect(challengeType).toEqual(ChallengeType.MULTIPLE);
});
