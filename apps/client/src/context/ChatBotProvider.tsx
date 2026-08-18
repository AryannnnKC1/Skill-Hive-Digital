/**
 * ChatBotProvider
 * Wraps the app and provides the AIChatBot floating widget on authenticated pages.
 * Reads auth state and passes student context to the AI.
 */

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AIChatBot from '../components/chat/AIChatBot';
import { fetchLatestRecommendations, fetchSavedCareers } from '../api';
import type { RecommendationsResponse, SavedCareerRecord } from '../types';

// Pages where the chatbot should NOT appear (unauthenticated pages)
const PUBLIC_ROUTES = new Set(['/', '/login', '/register']);

function useChatbotContext() {
  const [studentName, setStudentName] = useState<string | undefined>();
  const [assessmentData, setAssessmentData] = useState<string | undefined>();
  const [savedCareersData, setSavedCareersData] = useState<string | undefined>();

  useEffect(() => {
    // Load student name from localStorage
    const stored = localStorage.getItem('userName');
    if (stored) setStudentName(stored);

    // Fetch assessment results for context
    const token = localStorage.getItem('token');
    if (!token) return;

    fetchLatestRecommendations()
      .then((data: RecommendationsResponse) => {
        if (data?.recommendations?.length > 0) {
          const topCareers = data.recommendations
            .slice(0, 5)
            .map(
              (r) =>
                `${r.career.title} (${r.matchPercentage}% match)`
            )
            .join(', ');

          const scores = Object.entries(data.categoryScores || {})
            .map(([cat, score]) => `${cat}: ${Math.round(score)}`)
            .join(', ');

          const summary = [
            data.recommendations.length > 0
              ? `Top career matches: ${topCareers}`
              : null,
            scores ? `Category scores: ${scores}` : null,
            data.submittedAt
              ? `Assessment completed on: ${new Date(data.submittedAt).toLocaleDateString()}`
              : null,
          ]
            .filter(Boolean)
            .join('. ');

          setAssessmentData(summary || undefined);
        }
      })
      .catch(() => {
        // Non-critical: ignore if no assessment data
      });

    fetchSavedCareers()
      .then((records: SavedCareerRecord[]) => {
        if (records?.length > 0) {
          const names = records
            .slice(0, 8)
            .map((r) => r.career.title)
            .join(', ');
          setSavedCareersData(`${records.length} saved careers: ${names}`);
        }
      })
      .catch(() => {
        // Non-critical: ignore
      });
  }, []);

  return { studentName, assessmentData, savedCareersData };
}

export function ChatBotProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isPublicRoute = PUBLIC_ROUTES.has(location.pathname);
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  const showChatBot = !isPublicRoute && isAuthenticated;

  const { studentName, assessmentData, savedCareersData } = useChatbotContext();

  return (
    <>
      {children}
      {showChatBot && (
        <AIChatBot
          studentName={studentName}
          assessmentData={assessmentData}
          savedCareers={savedCareersData}
        />
      )}
    </>
  );
}
