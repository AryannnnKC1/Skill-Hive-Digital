import { useState, useCallback, useEffect } from 'react';
import {
  sendMessageToGemini,
  type GeminiMessage,
} from '../services/gemini.service';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isError?: boolean;
}

export interface StudentContext {
  name?: string;
  assessmentData?: string;
  savedCareers?: string;
}

const STORAGE_KEY = 'skillhive-chat-history';
const MAX_HISTORY = 50; // Keep last 50 messages in localStorage

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function loadFromStorage(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // Re-hydrate Date objects
    return parsed.map((msg: ChatMessage & { timestamp: string }) => ({
      ...msg,
      timestamp: new Date(msg.timestamp),
    }));
  } catch {
    return [];
  }
}

function saveToStorage(messages: ChatMessage[]) {
  try {
    const toStore = messages.slice(-MAX_HISTORY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch {
    // Ignore storage errors
  }
}

function toGeminiHistory(messages: ChatMessage[]): GeminiMessage[] {
  return messages
    .filter(m => !m.isError)
    .map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));
}

function buildStudentContextString(ctx?: StudentContext): string | undefined {
  if (!ctx) return undefined;
  const parts: string[] = [];
  if (ctx.name) parts.push(`Student Name: ${ctx.name}`);
  if (ctx.assessmentData)
    parts.push(`Assessment Results: ${ctx.assessmentData}`);
  if (ctx.savedCareers) parts.push(`Saved Careers: ${ctx.savedCareers}`);
  return parts.length > 0 ? parts.join('\n') : undefined;
}

// ── Hook ───────────────────────────────────────────────────────────────────

export function useChat(studentContext?: StudentContext) {
  const [messages, setMessages] = useState<ChatMessage[]>(loadFromStorage);
  const [isTyping, setIsTyping] = useState(false);

  // Persist messages on every change
  useEffect(() => {
    saveToStorage(messages);
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isTyping) return;

      const userMessage: ChatMessage = {
        id: generateId(),
        role: 'user',
        content: text.trim(),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);

      try {
        // Build Gemini-formatted history (all previous messages + new one)
        const history = toGeminiHistory([...messages, userMessage]);
        const contextString = buildStudentContextString(studentContext);

        const responseText = await sendMessageToGemini(history, contextString);

        const assistantMessage: ChatMessage = {
          id: generateId(),
          role: 'assistant',
          content: responseText,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, assistantMessage]);
      } catch (err) {
        const errorMessage: ChatMessage = {
          id: generateId(),
          role: 'assistant',
          content:
            err instanceof Error
              ? err.message
              : 'Something went wrong. Please try again.',
          timestamp: new Date(),
          isError: true,
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    },
    [messages, isTyping, studentContext]
  );

  const clearHistory = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    clearHistory,
  };
}
