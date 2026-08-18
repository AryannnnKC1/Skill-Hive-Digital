import { describe, expect, test } from "bun:test";
import {
  calculateCategoryResults,
  calculateMaxPossibleScores,
  scoreAssessment,
  validateAndTallyScores,
} from "./assessmentScoring";

import type { AssessmentQuestion } from "./assessmentScoring";

const sampleQuestions: AssessmentQuestion[] = [
  {
    questionId: "q1",
    options: [
      {
        optionId: "q1-a",
        categoryWeights: { "Software Engineering": 5, "Data Science": 3 },
      },
      {
        optionId: "q1-b",
        categoryWeights: { Cybersecurity: 4 },
      },
    ],
  },
  {
    questionId: "q2",
    options: [
      {
        optionId: "q2-a",
        categoryWeights: { "Software Engineering": 4, Cybersecurity: 5 },
      },
      {
        optionId: "q2-b",
        categoryWeights: { "Data Science": 2 },
      },
    ],
  },
  {
    questionId: "q3",
    options: [
      {
        optionId: "q3-a",
        categoryWeights: { "Software Engineering": 3, "Data Science": 2 },
      },
      {
        optionId: "q3-b",
        categoryWeights: { Cybersecurity: 1 },
      },
    ],
  },
];

describe("assessmentScoring", () => {
  test("calculates max possible scores per category", () => {
    expect(calculateMaxPossibleScores(sampleQuestions)).toEqual({
      "Software Engineering": 12,
      "Data Science": 5,
      Cybersecurity: 9,
    });
  });

  test("calculates student scores from selected options", () => {
    const { categoryScores } = validateAndTallyScores(sampleQuestions, [
      { questionId: "q1", optionId: "q1-a" },
      { questionId: "q2", optionId: "q2-a" },
      { questionId: "q3", optionId: "q3-a" },
    ]);

    expect(categoryScores).toEqual({
      "Software Engineering": 12,
      "Data Science": 5,
      Cybersecurity: 5,
    });
  });

  test("calculates compatibility percentages from max scores", () => {
    const categoryScores = {
      "Software Engineering": 12,
      "Data Science": 5,
      Cybersecurity: 5,
    };
    const maxScores = calculateMaxPossibleScores(sampleQuestions);

    expect(calculateCategoryResults(categoryScores, maxScores)).toEqual([
      {
        category: "Software Engineering",
        score: 12,
        maxScore: 12,
        percentage: 100,
        rank: 1,
      },
      {
        category: "Data Science",
        score: 5,
        maxScore: 5,
        percentage: 100,
        rank: 2,
      },
      {
        category: "Cybersecurity",
        score: 5,
        maxScore: 9,
        percentage: 56,
        rank: 3,
      },
    ]);
  });

  test("ranks careers using category compatibility", () => {
    const careers = [
      { _id: "1", title: "Security Analyst", category: "Cybersecurity" },
      { _id: "2", title: "Software Engineer", category: "Software Engineering" },
      { _id: "3", title: "Data Scientist", category: "Data Science" },
    ];

    const result = scoreAssessment(
      sampleQuestions,
      [
        { questionId: "q1", optionId: "q1-a" },
        { questionId: "q2", optionId: "q2-a" },
        { questionId: "q3", optionId: "q3-a" },
      ],
      careers
    );

    expect(result.rankedCareers.map((entry) => entry.career.title)).toEqual([
      "Software Engineer",
      "Data Scientist",
      "Security Analyst",
    ]);
    expect(result.rankedCareers[0]?.matchPercentage).toBe(100);
    expect(result.rankedCareers[2]?.matchPercentage).toBe(56);
  });
});
