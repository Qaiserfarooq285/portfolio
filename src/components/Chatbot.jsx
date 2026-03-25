'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cvData, chatbotKnowledge } from '@/data/cvData';

const greetingMessage = "Hello. I'm Qaiser's portfolio AI assistant. How can I help you today? Would you like to know about Qaiser's skills, experience, projects or availabality?";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: greetingMessage,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === '#chatbot') {
        setIsOpen(true);
      }
    };

    openFromHash();
    window.addEventListener('hashchange', openFromHash);

    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('salam')) {
      return greetingMessage;
    }

    if (lowerMessage.includes('whatsapp') || lowerMessage.includes('wa.me')) {
      return `You can contact directly on WhatsApp: ${cvData.personal.social.whatsapp}`;
    }

    if (lowerMessage.includes('who are you') || lowerMessage.includes('your name')) {
      return `I'm Qaiser's portfolio AI assistant. Qaiser Farooq is an AI Researcher.`;
    }

    if (lowerMessage.includes('location') || lowerMessage.includes('where are you')) {
      return `Qaiser is based in ${cvData.personal.location}.`;
    }

    // Check for availability
    if (
      lowerMessage.includes('available') ||
      lowerMessage.includes('work') ||
      lowerMessage.includes('hire')
    ) {
      return chatbotKnowledge.availability;
    }

    // Check for skills
    if (
      lowerMessage.includes('skill') ||
      lowerMessage.includes('expert') ||
      lowerMessage.includes('proficient')
    ) {
      return chatbotKnowledge.skills_summary;
    }

    // Check for education
    if (
      lowerMessage.includes('education') ||
      lowerMessage.includes('studied') ||
      lowerMessage.includes('degree')
    ) {
      return chatbotKnowledge.education_summary;
    }

    // Check for experience
    if (
      lowerMessage.includes('experience') ||
      lowerMessage.includes('worked') ||
      lowerMessage.includes('job')
    ) {
      return chatbotKnowledge.experience_summary;
    }

    // Check for projects
    if (
      lowerMessage.includes('project') ||
      lowerMessage.includes('built') ||
      lowerMessage.includes('portfolio')
    ) {
      return chatbotKnowledge.projects_summary;
    }

    // Check for contact
    if (
      lowerMessage.includes('contact') ||
      lowerMessage.includes('email') ||
      lowerMessage.includes('phone') ||
      lowerMessage.includes('reach')
    ) {
      return `You can reach Qaiser at:
📧 Email: ${cvData.personal.email}
📱 Phone: ${cvData.personal.phone}
💬 WhatsApp: ${cvData.personal.social.whatsapp}
Feel free to connect with him!`;
    }

    // Check for specific technologies
    if (
      lowerMessage.includes('python') ||
      lowerMessage.includes('tensorflow') ||
      lowerMessage.includes('pytorch')
    ) {
      return `Qaiser is highly proficient with Python and machine learning frameworks like TensorFlow and PyTorch. He has extensive experience with NLP and deep learning projects.`;
    }

    // Default responses
    const defaultResponses = [
      `That's a great question! Qaiser is available for opportunities. You can contact him on WhatsApp: ${cvData.personal.social.whatsapp}.`,
      `I can help answer questions about Qaiser's background, projects, and expertise. He is available and reachable on WhatsApp: ${cvData.personal.social.whatsapp}.`,
      `I'm here to provide information about Qaiser's professional profile. He is available for work—WhatsApp: ${cvData.personal.social.whatsapp}.`,
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const messageText = input.trim();

    const userMessage = {
      id: generateId(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageText }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error || 'LLM request failed');
      }

      const data = await response.json();
      const botReply = data?.reply || generateBotResponse(messageText);

      const botResponse = {
        id: generateId(),
        text: botReply,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      const botResponse = {
        id: generateId(),
        text: `AI API is not connected: ${error?.message || 'Unknown error'}\n\n${generateBotResponse(messageText)}`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickQuestion = (question) => {
    if (isLoading) return;
    setInput(question);

    setTimeout(async () => {
      const userMsg = {
        id: generateId(),
        text: question,
        sender: 'user',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: question }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData?.error || 'LLM request failed');
        }

        const data = await response.json();
        const botReply = data?.reply || generateBotResponse(question);

        const botMsg = {
          id: generateId(),
          text: botReply,
          sender: 'bot',
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMsg]);
      } catch (error) {
        const fallbackMsg = {
          id: generateId(),
          text: `AI API is not connected: ${error?.message || 'Unknown error'}\n\n${generateBotResponse(question)}`,
          sender: 'bot',
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, fallbackMsg]);
      } finally {
        setInput('');
        setIsLoading(false);
      }
    }, 50);
  };

  return (
    <>
      <section id="chatbot" className="h-0 w-0" aria-hidden="true"></section>

      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white text-black text-sm px-4 py-2 rounded-xl shadow-lg"
          >
            Hey there, I'm Qaiser's assistant
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-16 h-16 rounded-full bg-white text-black shadow-2xl flex items-center justify-center"
          aria-label="Open assistant chat"
        >
          <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="5" y="7" width="14" height="11" rx="3" />
            <path d="M12 3v3" />
            <circle cx="9.5" cy="12" r="1" fill="currentColor" stroke="none" />
            <circle cx="14.5" cy="12" r="1" fill="currentColor" stroke="none" />
            <path d="M9 15h6" />
          </svg>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 w-[min(94vw,380px)] h-[min(72vh,520px)] bg-black border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="px-4 py-3 border-b border-white/15 flex items-center justify-between bg-white/5">
              <div>
                <p className="text-white font-semibold text-sm">Qaiser's Assistant</p>
                <p className="text-gray-400 text-xs">Ask about skills, projects, experience</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Close assistant chat"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    layout
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-lg text-sm whitespace-pre-wrap leading-relaxed ${
                        message.sender === 'user'
                          ? 'bg-white text-black'
                          : 'bg-white/10 text-white border border-white/20'
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/10 text-white border border-white/20 px-4 py-3 rounded-lg">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            <div className="px-4 pb-3">
              <div className="flex flex-wrap gap-2 mb-3">
                {['Skills?', 'Projects?', 'Available?'].map((question) => (
                  <button
                    key={question}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs px-2 py-1 rounded-md border border-white/20 text-gray-300 hover:text-white hover:border-white/40 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me something..."
                  disabled={isLoading}
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-white/40 transition-colors disabled:opacity-50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="px-4 py-2 bg-white text-black rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? '...' : 'Send'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
