import axios from "axios";

interface AssessmentInfo {
  title: string;
  url: string;
  questionCount: number;
}

export const getAssessmentInfos = async (): Promise<AssessmentInfo[]> => {
  return axios
    .get("https://raw.githubusercontent.com/Ebazhanov/linkedin-skill-assessments-quizzes/master/README.md")
    .then((response) => {
      const content = response.data;
      const assessmentInfos = extractAssessmentInfos(content);

      return assessmentInfos;
    });
};

export const extractAssessmentInfos = (content: string): AssessmentInfo[] => {
  const rawListAssessment = content.match(/\| \[Adobe(.|\n)*\|/g);
  if (rawListAssessment === null) {
    throw ReferenceError("Fail to fetch list of assessment.");
  }
  const result = rawListAssessment[0].split("\n");
  const assessmentInfos = result
    .map((item: string) => {
      const title = (item.match(/\[(.{1,40})\]/g) || ["no-title"])[0];
      let url = (item.match(/[a-zA-Z\-()/%1-9.]+.md/g) || [null])[0];
      const questionCount = parseInt((item.match(/=>(.*)questions/i) || ["0", "0"])[1]);
      url = url?.replace(/^\(/g, "") || null;
      url = "https://raw.githubusercontent.com/Ebazhanov/in-quiz-questions/master/" + url;
      return { title, url, questionCount };
    })
    .filter((item) => item.title !== "no-title");
  return assessmentInfos;
};