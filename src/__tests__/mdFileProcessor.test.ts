import { readFileSync } from "fs";
import { MdFileProcessor } from "../mdFileProcessor";

test("getContent", async () => {
  const data = readFileSync("./samples/css.md", "utf-8");

  const mdFileProcessor = new MdFileProcessor(data);
  expect(mdFileProcessor.getQuestionCount()).toBeGreaterThanOrEqual(82);
});

test("get challenge", async () => {
  const data = readFileSync("./samples/css.md", "utf-8");

  const mdFileProcessor = new MdFileProcessor(data);
  const challengeRaw = mdFileProcessor.getChallengeRawPartition()[0];
  expect(mdFileProcessor.extractQuestionIndex(challengeRaw)).toEqual(1);
  expect(mdFileProcessor.extractQuestion(challengeRaw)).toContain(
    "Q1. In the following example, which selector has the highest specificity ranking for selecting the anchor link element?",
  );
  expect(mdFileProcessor.extractChoices(challengeRaw).length).toBeGreaterThanOrEqual(4);
  expect(mdFileProcessor.extractAnswers(challengeRaw).length).toEqual(1);
  expect(mdFileProcessor.extractExplanation(challengeRaw)).toEqual("Explain: This is the explanation.");

  const quiz = mdFileProcessor.getQuiz();
  expect(quiz.getChallenges().length).toBeGreaterThanOrEqual(81);
  // console.log(quiz.getChallenges());
});
