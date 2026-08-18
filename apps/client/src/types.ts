export type RoadmapItemType = 'education' | 'skill' | 'experience';

export type RoadmapItem = {
  label: string;
  type: RoadmapItemType;
};

export type RoadmapStage = {
  title: string;
  duration: string;
  description: string;
  items: RoadmapItem[];
};

export type CareerRoadmap = {
  summary: string;
  stages: RoadmapStage[];
};

export type Career = {
  _id: string;
  title: string;
  description: string;
  category: string;
  requiredSkills: string[];
  educationRequired: string;
  averageSalary: string;
  growthOutlook: string;
  workEnvironment: string;
  roadmap?: CareerRoadmap;
};

export type SavedCareerRecord = {
  _id: string;
  userId: string;
  careerId: string;
  savedAt: string;
  career: Career;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AssessmentOption = {
  optionId: string;
  text: string;
  categoryWeights: Record<string, number>;
  skillTags: string[];
};

export type AssessmentQuestion = {
  questionId: string;
  text: string;
  options: AssessmentOption[];
};

export type Assessment = {
  _id: string;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
};

export type AssessmentAnswer = {
  questionId: string;
  optionId: string;
};

export type RecommendationResult = {
  career: Career;
  matchPercentage: number;
};

export type RecommendationsResponse = {
  submittedAt: string | null;
  recommendations: RecommendationResult[];
  categoryScores: Record<string, number>;
  skillScores: Record<string, number>;
};

export type DashboardSavedCareersSummary = {
  recent: SavedCareerRecord[];
  count: number;
};

export type Resource = {
  _id: string
  title: string
  description: string
  type: 'Course' | 'Article' | 'Video' | 'Certification'
  provider: string
  url: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  careerFields: string[]
  skills: string[]
  careerIds: string[]
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}