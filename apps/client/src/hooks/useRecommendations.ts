import { useCallback, useEffect, useState } from "react";
import { fetchLatestRecommendations } from "../api";
import type { CategoryResult, RecommendationResult } from "../types";

export function useRecommendations() {
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [rankedCategoryResults, setRankedCategoryResults] = useState<CategoryResult[]>([]);
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const [categoryScores, setCategoryScores] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const refresh = useCallback(async () => {
    if (!token) {
      setRecommendations([]);
      setRankedCategoryResults([]);
      setSubmittedAt(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchLatestRecommendations();
      setRecommendations(data.recommendations);
      setRankedCategoryResults(data.rankedCategoryResults);
      setSubmittedAt(data.submittedAt);
      setCategoryScores(data.categoryScores);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load recommendations"
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const topCategories = rankedCategoryResults
    .slice(0, 2)
    .map((result) => result.category);

  const topRecommendations = recommendations.slice(0, 3);

  return {
    recommendations,
    topRecommendations,
    rankedCategoryResults,
    submittedAt,
    categoryScores,
    topCategories,
    loading,
    error,
    refresh,
    hasTakenAssessment: submittedAt !== null,
  };
}
