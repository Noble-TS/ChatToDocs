import React, { useState, useRef, useEffect } from "react";
import { KapaProvider, useChat } from "@kapaai/react-sdk";
import ReactMarkdown from "react-markdown";
import { LuSend, LuThumbsUp, LuThumbsDown, LuRefreshCw } from "react-icons/lu";

// Frameworks list
const FRAMEWORKS = [
  "Better Auth",
  "Supabase",
  "Tailwind CSS",
  "TanStack Query",
  "Next.js",
  "Redux",
  "Chakra UI",
];

function ChatHeader({ conversation, resetConversation, frameworks }) {
  return (
    <div className="p-4 bg-indigo-600 dark:bg-indigo-700 text-white text-lg font-semibold shadow-md">
      Chatting with Docs for: 
      {frameworks.length === 0 
        ? ' No Frameworks Selected' 
        : frameworks.map((f) => (
            <span key={f} className="inline-block bg-indigo-700 dark:bg-indigo-800 text-indigo-100 px-2 py-0.5 text-sm rounded-full ml-2">
              {f}
            </span>
          ))
      }
      <button
        className="float-right flex items-center gap-1 px-3 py-1.5 rounded-lg border border-indigo-400 text-sm text-white hover:bg-indigo-700 disabled:opacity-50 transition duration-200"
        onClick={resetConversation}
        disabled={conversation.length === 0}
      >
        <LuRefreshCw className="w-4 h-4" />
        New Chat
      </button>
    </div>
  );
}

function ChatMessage({ qa }) {
  const { addFeedback } = useChat();
  const [feedback, setFeedback] = useState(null);

  const handleFeedback = (type) => {
    setFeedback(type);
    addFeedback(qa.id, type);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* User Question */}
      <div className="flex justify-end">
        <div className="bg-indigo-600 text-white rounded-xl rounded-br-none max-w-[80%] px-4 py-2 shadow-lg">
          {qa.question}
        </div>
      </div>
      
      {/* AI Answer */}
      <div className="flex justify-start">
        <div className="bg-indigo-100 dark:bg-indigo-900 text-gray-800 dark:text-indigo-100 rounded-xl rounded-bl-none max-w-[80%] px-4 py-3 shadow-xl flex flex-col gap-3">
          {qa.answer ? (
            <>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{qa.answer}</ReactMarkdown>
              </div>
              
              {/* Sources */}
              {qa.sources && qa.sources.length > 0 && (
                <div className="mt-2 pt-3 border-t border-indigo-200 dark:border-indigo-700">
                  <div className="font-semibold text-gray-600 dark:text-gray-300 mb-2 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Sources:
                  </div>
                  <ul className="space-y-1 text-xs">
                    {qa.sources.map((source, idx) => (
                      <li key={idx}>
                        <a
                          href={source.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-200 hover:underline transition duration-150"
                        >
                          {source.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Feedback Buttons */}
              {qa.id && (
                <div className="mt-2 pt-2 border-t border-indigo-200 dark:border-indigo-700 flex gap-2 justify-end">
                  <button
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition duration-150 ${
                      feedback === "upvote"
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 font-semibold"
                        : "text-gray-500 dark:text-gray-400 hover:bg-green-100 dark:hover:bg-green-900"
                    }`}
                    onClick={() => handleFeedback("upvote")}
                  >
                    <LuThumbsUp className="w-4 h-4" />
                    Helpful
                  </button>
                  <button
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition duration-150 ${
                      feedback === "downvote"
                        ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 font-semibold"
                        : "text-gray-500 dark:text-gray-400 hover:bg-red-100 dark:hover:bg-red-900"
                    }`}
                    onClick={() => handleFeedback("downvote")}
                  >
                    <LuThumbsDown className="w-4 h-4" />
                    Not helpful
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <span>Thinking</span>
              <span className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChatInterface({ frameworks }) {
  const [question, setQuestion] = useState("");
  const messagesEndRef = useRef(null);
  const { conversation, submitQuery, resetConversation, isGeneratingAnswer } = useChat();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  useEffect(() => {
    if (conversation.length > 0) {
      resetConversation();
    }
  }, [frameworks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() && frameworks.length > 0) {
      submitQuery(question);
      setQuestion("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-indigo-900/50 overflow-hidden">
      <ChatHeader
        conversation={conversation}
        resetConversation={resetConversation}
        frameworks={frameworks}
      />
      
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 bg-gray-50 dark:bg-gray-900">
        {conversation.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-lg">
            Ask your first question below! 👇
          </div>
        ) : (
          <>
            {conversation.map((qa, index) => (
              <ChatMessage key={qa.id || index} qa={qa} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
        
        {isGeneratingAnswer && (
          <div className="flex justify-start">
            <div className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-3 rounded-xl shadow-md flex items-center gap-2">
              <LuRefreshCw className="w-5 h-5 animate-spin" />
              <span>AI is thinking...</span>
            </div>
          </div>
        )}
      </div>
      
      <form
        className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={
              frameworks.length === 0
                ? "Select at least one framework to enable chat"
                : "Ask a question about the selected documentation..."
            }
            disabled={isGeneratingAnswer || frameworks.length === 0}
            className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-inner"
          />
          <button
            type="submit"
            disabled={!question.trim() || isGeneratingAnswer || frameworks.length === 0}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition duration-200 disabled:bg-indigo-300 flex items-center justify-center"
          >
            <LuSend className="w-5 h-5 mr-2" />
            Send
          </button>
        </div>
        {frameworks.length === 0 && (
          <p className="text-sm text-red-500 dark:text-red-400 mt-2">
            Please select at least one framework to enable the chat.
          </p>
        )}
      </form>
      
      {/* Attribution requirement */}
      <div className="text-center text-xs p-2 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
        Powered by{" "}
        <a
          href="https://kapa.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-500 hover:underline font-medium"
        >
          kapa.ai
        </a>
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedFrameworks, setSelectedFrameworks] = useState([
    "Better Auth",
    "Supabase",
  ]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleFramework = (fw) => {
    setSelectedFrameworks((prev) =>
      prev.includes(fw)
        ? prev.filter((f) => f !== fw)
        : [...prev, fw]
    );
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <KapaProvider integrationId="your-integration-id" callbacks={{}}>
      <div className={`min-h-screen font-sans antialiased flex flex-col ${isDarkMode ? 'dark' : ''}`}>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center py-8">
          <header className="w-full max-w-6xl mb-6 bg-white dark:bg-gray-900 shadow-lg dark:shadow-none p-4 sticky top-0 z-10 border-b border-gray-100 dark:border-gray-800">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  <span className="text-indigo-600">DocsAI</span> Chat with Docs MVP
                </h1>
                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200 shadow-md"
                  aria-label="Toggle Dark Mode"
                >
                  {isDarkMode ? (
                    <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.364 1.636a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM7.757 4.343a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zm9.9-1.414a1 1 0 010 1.414l-1.414 1.414a1 1 0 01-1.414-1.414l1.414-1.414a1 1 0 011.414 0zM10 15a5 5 0 100-10 5 5 0 000 10zm-9 1a1 1 0 01-1 1H3a1 1 0 110-2H1a1 1 0 01-1 1zM19 19a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM2 19a1 1 0 01-1 1H3a1 1 0 110-2H2a1 1 0 01-1 1z"/>
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.364 1.636a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM7.757 4.343a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM10 15a5 5 0 100-10 5 5 0 000 10zm-9 1a1 1 0 01-1 1H3a1 1 0 110-2H1a1 1 0 01-1 1zM19 19a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM2 19a1 1 0 01-1 1H3a1 1 0 110-2H2a1 1 0 01-1 1z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">
                  Select Documentation Sets:
                </h2>
                
                <button
                  onClick={() => console.log("Add project clicked")}
                  className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900 border-2 border-indigo-500 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 font-semibold rounded-xl shadow-md hover:bg-indigo-100 dark:hover:bg-indigo-800 transition duration-200 whitespace-nowrap text-sm md:text-base"
                >
                  + Add Your OpenSource Project
                </button>
              </div>

              {/* Framework Selection Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mt-2">
                {FRAMEWORKS.map((fw) => (
                  <button
                    key={fw}
                    onClick={() => toggleFramework(fw)}
                    className={`p-3 text-center text-sm font-medium rounded-xl border-2 transition-all duration-200 shadow-sm ${
                      selectedFrameworks.includes(fw)
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-lg transform scale-105'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-50 dark:border-gray-600 dark:hover:bg-gray-600'
                    }`}
                  >
                    {fw}
                  </button>
                ))}
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800 mt-4">
                Currently talking to the documentation of {selectedFrameworks.length} framework(s).
                Ask questions about setup, common integration issues, or best practices!
              </p>
            </div>
          </header>
          
          <main className="w-full max-w-6xl flex-1 p-4 md:p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="h-[calc(100vh-350px)] min-h-[500px]">
              <ChatInterface frameworks={selectedFrameworks} />
            </div>
          </main>

          <footer className="w-full bg-gray-900 dark:bg-gray-950 p-4 mt-8">
            <div className="max-w-6xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
              <p>Developed as an MVP for "Chat with Docs".</p>
              <p className="mt-1">Chat logic is structured for use with the Kapa.ai React SDK.</p>
            </div>
          </footer>
        </div>
      </div>
    </KapaProvider>
  );
}