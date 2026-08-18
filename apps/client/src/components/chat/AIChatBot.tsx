/**
 * AIChatBot
 * Main floating chatbot component with slide-in drawer panel.
 * Integrates with Gemini API for career counseling.
 */

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  type KeyboardEvent,
} from 'react';
import { useChat, type ChatMessage } from '../../hooks/useChat';
import MarkdownRenderer from './MarkdownRenderer';

// ── Types & Constants ──────────────────────────────────────────────────────

interface Props {
  studentName?: string;
  assessmentData?: string;
  savedCareers?: string;
}

const STARTER_PROMPTS = [
  { label: 'Recommend careers for me', icon: '✦' },
  { label: 'Explain my assessment results', icon: '✦' },
  { label: 'What skills should I learn?', icon: '✦' },
  { label: 'Technology careers', icon: '✦' },
  { label: 'Business careers', icon: '✦' },
  { label: 'Healthcare careers', icon: '✦' },
  { label: 'Help me use this platform', icon: '✦' },
];

// ── Sub-components ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="ai-typing-indicator" aria-label="AI is typing">
      <span />
      <span />
      <span />
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  const timeStr = message.timestamp.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`ai-message-row ${isUser ? 'ai-message-row--user' : 'ai-message-row--ai'}`}>
      {/* Avatar */}
      {!isUser && (
        <div className="ai-avatar ai-avatar--bot" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
            <circle cx="9" cy="14" r="1" fill="currentColor"/>
            <circle cx="15" cy="14" r="1" fill="currentColor"/>
          </svg>
        </div>
      )}

      {/* Bubble */}
      <div className="ai-message-wrapper">
        <div
          className={`ai-bubble ${
            isUser
              ? 'ai-bubble--user'
              : message.isError
              ? 'ai-bubble--error'
              : 'ai-bubble--ai'
          }`}
        >
          {isUser ? (
            <p className="ai-bubble-text">{message.content}</p>
          ) : (
            <MarkdownRenderer content={message.content} />
          )}
        </div>
        <span className="ai-timestamp">{timeStr}</span>
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="ai-avatar ai-avatar--user" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

const AIChatBot: React.FC<Props> = ({
  studentName,
  assessmentData,
  savedCareers,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showStarterPrompts, setShowStarterPrompts] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, isTyping, sendMessage, clearHistory } = useChat({
    name: studentName,
    assessmentData,
    savedCareers,
  });

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Hide starter prompts once user has sent messages
  useEffect(() => {
    if (messages.length > 0) {
      setShowStarterPrompts(false);
    }
  }, [messages.length]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  // Trap focus and close on Escape
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSend = useCallback(async () => {
    if (!inputValue.trim() || isTyping) return;
    const text = inputValue;
    setInputValue('');
    setShowStarterPrompts(false);
    await sendMessage(text);
  }, [inputValue, isTyping, sendMessage]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleStarterPrompt = useCallback(
    (prompt: string) => {
      setShowStarterPrompts(false);
      sendMessage(prompt);
    },
    [sendMessage]
  );

  const handleClearHistory = useCallback(() => {
    clearHistory();
    setShowStarterPrompts(true);
  }, [clearHistory]);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
    setIsMinimized(false);
  };

  return (
    <>
      {/* ── Backdrop (mobile) ── */}
      {isOpen && (
        <div
          className="ai-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Chat Panel ── */}
      <div
        className={`ai-panel ${isOpen ? 'ai-panel--open' : ''} ${
          isMinimized ? 'ai-panel--minimized' : ''
        }`}
        role="dialog"
        aria-label="SkillHive AI Career Assistant"
        aria-modal="true"
      >
        {/* Panel Header */}
        <div className="ai-panel-header">
          <div className="ai-panel-header-info">
            <div className="ai-panel-avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
                <circle cx="9" cy="14" r="1" fill="currentColor"/>
                <circle cx="15" cy="14" r="1" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <p className="ai-panel-name">SkillHive AI</p>
              <div className="ai-panel-status">
                <span className="ai-status-dot" />
                <span>Career Counselor · Powered by Gemini</span>
              </div>
            </div>
          </div>
          <div className="ai-panel-actions">
            {messages.length > 0 && (
              <button
                className="ai-icon-btn"
                onClick={handleClearHistory}
                title="Clear chat history"
                aria-label="Clear chat history"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                  <path d="M10 11v6M14 11v6"/>
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
              </button>
            )}
            <button
              className="ai-icon-btn"
              onClick={() => setIsMinimized((p) => !p)}
              title={isMinimized ? 'Expand' : 'Minimize'}
              aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isMinimized ? (
                  <polyline points="15 3 21 3 21 9"/>
                ) : (
                  <line x1="5" y1="12" x2="19" y2="12"/>
                )}
                {isMinimized ? (
                  <><line x1="10" y1="14" x2="21" y2="3"/><polyline points="9 21 3 21 3 15"/><line x1="14" y1="10" x2="3" y2="21"/></>
                ) : null}
              </svg>
            </button>
            <button
              className="ai-icon-btn ai-icon-btn--close"
              onClick={() => setIsOpen(false)}
              title="Close chat"
              aria-label="Close chat"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Panel Body */}
        {!isMinimized && (
          <>
            <div className="ai-messages-area" role="log" aria-live="polite">
              {/* Welcome message */}
              {messages.length === 0 && (
                <div className="ai-welcome">
                  <div className="ai-welcome-avatar">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
                      <circle cx="9" cy="14" r="1" fill="currentColor"/>
                      <circle cx="15" cy="14" r="1" fill="currentColor"/>
                    </svg>
                  </div>
                  <h3 className="ai-welcome-title">
                    Hi{studentName ? `, ${studentName.split(' ')[0]}` : ''}! I'm SkillHive AI
                  </h3>
                  <p className="ai-welcome-subtitle">
                    Your personal career counselor. Ask me anything about careers, your assessment results, or how to use this platform.
                  </p>
                </div>
              )}

              {/* Messages */}
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="ai-message-row ai-message-row--ai">
                  <div className="ai-avatar ai-avatar--bot" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
                      <circle cx="9" cy="14" r="1" fill="currentColor"/>
                      <circle cx="15" cy="14" r="1" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="ai-message-wrapper">
                    <div className="ai-bubble ai-bubble--ai">
                      <TypingIndicator />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Starter Prompts */}
            {showStarterPrompts && (
              <div className="ai-starter-prompts">
                <p className="ai-starter-label">Suggested questions</p>
                <div className="ai-starter-grid">
                  {STARTER_PROMPTS.map((prompt) => (
                    <button
                      key={prompt.label}
                      className="ai-starter-btn"
                      onClick={() => handleStarterPrompt(prompt.label)}
                      disabled={isTyping}
                    >
                      {prompt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="ai-input-area">
              <div className="ai-input-wrapper">
                <textarea
                  ref={inputRef}
                  className="ai-input"
                  placeholder="Ask about careers, your results, or anything..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isTyping}
                  rows={1}
                  aria-label="Chat message input"
                  maxLength={2000}
                />
                <button
                  className={`ai-send-btn ${inputValue.trim() && !isTyping ? 'ai-send-btn--active' : ''}`}
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  aria-label="Send message"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </div>
              <p className="ai-input-hint">Enter to send · Shift+Enter for new line</p>
            </div>
          </>
        )}
      </div>

      {/* ── Floating Action Button ── */}
      <button
        className={`ai-fab ${isOpen ? 'ai-fab--open' : ''}`}
        onClick={toggleOpen}
        aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
              <circle cx="9" cy="14" r="1" fill="currentColor"/>
              <circle cx="15" cy="14" r="1" fill="currentColor"/>
            </svg>
            <span className="ai-fab-label">Chat with AI</span>
          </>
        )}
      </button>
    </>
  );
};

export default AIChatBot;
