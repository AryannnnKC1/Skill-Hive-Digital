export type AssessmentQuestionOption = {
  optionId: string;
  categoryWeights?: Record<string, number>;
  skillTags?: string[];
};

export type AssessmentQuestion = {
  questionId: string;
  options: AssessmentQuestionOption[];
};

export type SubmittedAnswer = {
  questionId: string;
  optionId: string;
};

export type CategoryScoreResult = {
  category: string;
  score: number;
  maxScore: number;
  percentage: number;
  rank: number;
};

export type CareerScoreResult = {
  careerId: string;
  category: string;
  score: number;
  maxScore: number;
  matchPercentage: number;
  rank: number;
};

export class AssessmentValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AssessmentValidationError";
  }
}

function collectCategories(questions: AssessmentQuestion[]): Set<string> {
  const categories = new Set<string>();

  for (const question of questions) {
    for (const option of question.options) {
      for (const category of Object.keys(option.categoryWeights ?? {})) {
        categories.add(category);
      }
    }
  }

  return categories;
}

export function calculateMaxPossibleScores(
  questions: AssessmentQuestion[]
): Record<string, number> {
  const maxScores: Record<string, number> = {};

  for (const category of collectCategories(questions)) {
    maxScores[category] = 0;
  }

  for (const question of questions) {
    const perQuestionMax: Record<string, number> = {};

    for (const option of question.options) {
      for (const [category, weight] of Object.entries(
        option.categoryWeights ?? {}
      )) {
        const numericWeight = Number(weight);
        perQuestionMax[category] = Math.max(
          perQuestionMax[category] ?? 0,
          Number.isFinite(numericWeight) ? numericWeight : 0
        );
      }
    }

    for (const [category, maxWeight] of Object.entries(perQuestionMax)) {
      maxScores[category] = (maxScores[category] ?? 0) + maxWeight;
    }
  }

  return maxScores;
}

export function validateAndTallyScores(
  questions: AssessmentQuestion[],
  answers: SubmittedAnswer[]
): {
  categoryScores: Record<string, number>;
  skillScores: Record<string, number>;
} {
  if (!Array.isArray(answers) || answers.length === 0) {
    throw new AssessmentValidationError("Please complete the assessment");
  }

  if (answers.length !== questions.length) {
    throw new AssessmentValidationError("Please answer every question");
  }

  const questionMap = new Map(
    questions.map((question) => [question.questionId, question])
  );
  const answeredQuestionIds = new Set<string>();
  const categoryScores: Record<string, number> = {};
  const skillScores: Record<string, number> = {};

  for (const submitted of answers) {
    if (!submitted?.questionId || !submitted?.optionId) {
      throw new AssessmentValidationError("Each answer must include question and option IDs");
    }

    const question = questionMap.get(submitted.questionId);
    if (!question) {
      throw new AssessmentValidationError(
        `Invalid question ID: ${submitted.questionId}`
      );
    }

    if (answeredQuestionIds.has(submitted.questionId)) {
      throw new AssessmentValidationError(
        `Duplicate answer for question: ${submitted.questionId}`
      );
    }
    answeredQuestionIds.add(submitted.questionId);

    const option = question.options.find(
      (entry) => entry.optionId === submitted.optionId
    );
    if (!option) {
      throw new AssessmentValidationError(
        `Invalid option for question ${submitted.questionId}`
      );
    }

    for (const [category, weight] of Object.entries(
      option.categoryWeights ?? {}
    )) {
      const numericWeight = Number(weight);
      if (!Number.isFinite(numericWeight)) continue;
      categoryScores[category] = (categoryScores[category] ?? 0) + numericWeight;
    }

    for (const skill of option.skillTags ?? []) {
      skillScores[skill] = (skillScores[skill] ?? 0) + 1;
    }
  }

  return { categoryScores, skillScores };
}

function clampPercentage(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)));
}

export function calculateCategoryResults(
  categoryScores: Record<string, number>,
  maxScores: Record<string, number>
): CategoryScoreResult[] {
  const categories = new Set([
    ...Object.keys(maxScores),
    ...Object.keys(categoryScores),
  ]);

  const results: CategoryScoreResult[] = Array.from(categories).map(
    (category) => {
      const score = categoryScores[category] ?? 0;
      const maxScore = maxScores[category] ?? 0;
      const percentage =
        maxScore > 0 ? clampPercentage((score / maxScore) * 100) : 0;

      return {
        category,
        score,
        maxScore,
        percentage,
        rank: 0,
      };
    }
  );

  results.sort((a, b) => {
    if (b.percentage !== a.percentage) return b.percentage - a.percentage;
    if (b.score !== a.score) return b.score - a.score;
    return a.category.localeCompare(b.category);
  });

  return results.map((result, index) => ({
    ...result,
    rank: index + 1,
  }));
}

export function rankCareers<
  T extends { _id: unknown; category: string; title: string },
>(careers: T[], categoryResults: CategoryScoreResult[]): Array<
  CareerScoreResult & { career: T }
> {
  const categoryMap = new Map(
    categoryResults.map((result) => [result.category, result])
  );

  const ranked = careers.map((career) => {
    const categoryResult = categoryMap.get(career.category);

    return {
      career,
      careerId: String(career._id),
      category: career.category,
      score: categoryResult?.score ?? 0,
      maxScore: categoryResult?.maxScore ?? 0,
      matchPercentage: categoryResult?.percentage ?? 0,
      rank: 0,
    };
  });

  ranked.sort((a, b) => {
    if (b.matchPercentage !== a.matchPercentage) {
      return b.matchPercentage - a.matchPercentage;
    }
    if (b.score !== a.score) return b.score - a.score;
    return a.career.title.localeCompare(b.career.title);
  });

  return ranked.map((result, index) => ({
    ...result,
    rank: index + 1,
  }));
}

export function scoreAssessment<
  T extends { _id: unknown; category: string; title: string },
>(questions: AssessmentQuestion[], answers: SubmittedAnswer[], careers: T[]) {
  const maxCategoryScores = calculateMaxPossibleScores(questions);
  const { categoryScores, skillScores } = validateAndTallyScores(
    questions,
    answers
  );
  const rankedCategoryResults = calculateCategoryResults(
    categoryScores,
    maxCategoryScores
  );
  const rankedCareers = rankCareers(careers, rankedCategoryResults);

  return {
    categoryScores,
    skillScores,
    maxCategoryScores,
    rankedCategoryResults,
    rankedCareers,
  };
}
