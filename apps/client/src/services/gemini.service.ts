/**
 * Gemini AI Service
 * Handles all communication with the Google Gemini API for career counseling.
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;
const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// ── Types ──────────────────────────────────────────────────────────────────

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface GeminiRequest {
  system_instruction: {
    parts: { text: string }[];
  };
  contents: GeminiMessage[];
  generationConfig?: {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
  };
}

export interface GeminiCandidate {
  content: {
    role: string;
    parts: { text: string }[];
  };
  finishReason: string;
  safetyRatings?: {
    category: string;
    probability: string;
  }[];
}

export interface GeminiResponse {
  candidates?: GeminiCandidate[];
  promptFeedback?: {
    blockReason?: string;
    safetyRatings?: {
      category: string;
      probability: string;
    }[];
  };
  error?: {
    code: number;
    message: string;
    status: string;
  };
}

// ── System Prompt ──────────────────────────────────────────────────────────

const CAREER_COUNSELOR_SYSTEM_PROMPT = `You are SkillHive AI, a professional career counseling assistant embedded in the SkillHive platform.

Your responsibilities:
- Help students explore career paths based on their interests, skills, and assessment results.
- Explain assessment results clearly and constructively, highlighting strengths and growth areas.
- Recommend careers based on the student's unique profile, skill scores, and category strengths.
- Suggest specific learning resources, courses, certifications, and pathways for career growth.
- Answer questions about the SkillHive platform and how to use its features.
- Be encouraging, professional, empathetic, and concise in your responses.
- If you do not know something, say so honestly and suggest where the student might find the answer.
- Never provide harmful, unsafe, or misleading career advice.

When discussing specific careers, always cover:
1. Required technical and soft skills
2. Educational pathways (degrees, certifications, bootcamps)
3. Possible job roles and career progression
4. Salary ranges and industry demand
5. Practical next steps and resources

Platform features you can explain:
- Assessment: A skill and interest assessment that generates personalized career recommendations
- Dashboard: Shows saved careers, assessment results, and career match percentages
- Career Search: Browse and filter all available career paths
- Saved Careers: Bookmark careers for later review
- Resources: Curated learning materials linked to careers
- Career Roadmap: Step-by-step path for specific careers
- Profile: Personal information and academic background

Keep responses concise but complete. Use markdown formatting (bold, lists, headers) to make information scannable. Always end with an encouraging note or actionable next step when relevant.`;

// ── Service Functions ──────────────────────────────────────────────────────

/**
 * Sends a conversation to Gemini and returns the AI's text response.
 * @param history - Array of previous messages in Gemini format
 * @param studentContext - Optional student context string for personalization
 */
export async function sendMessageToGemini(
  history: GeminiMessage[],
  studentContext?: string
): Promise<string> {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    throw new Error(
      'Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.'
    );
  }

  // Inject student context into the last user message if provided
  const contents: GeminiMessage[] = studentContext
    ? history.map((msg, idx) => {
        if (idx === history.length - 1 && msg.role === 'user') {
          return {
            ...msg,
            parts: [
              {
                text: `${msg.parts[0].text}\n\n---\nStudent Context:\n${studentContext}`,
              },
            ],
          };
        }
        return msg;
      })
    : history;

  const requestBody: GeminiRequest = {
    system_instruction: {
      parts: [{ text: CAREER_COUNSELOR_SYSTEM_PROMPT }],
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    },
  };

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  const data: GeminiResponse = await response.json();

  // Handle API-level errors
  if (!response.ok || data.error) {
    const errorMsg =
      data.error?.message ||
      `API request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  // Handle safety filter blocks
  if (data.promptFeedback?.blockReason) {
    throw new Error(
      `Response blocked by safety filters: ${data.promptFeedback.blockReason}`
    );
  }

  // Validate candidates array
  if (!data.candidates || data.candidates.length === 0) {
    throw new Error('No response generated. Please try rephrasing your question.');
  }

  const candidate = data.candidates[0];

  // Check finish reason
  if (candidate.finishReason === 'SAFETY') {
    throw new Error(
      'Response was blocked due to safety guidelines. Please try a different question.'
    );
  }

  if (!candidate.content?.parts?.[0]?.text) {
    throw new Error('Received an empty response. Please try again.');
  }

  return candidate.content.parts[0].text;
}
