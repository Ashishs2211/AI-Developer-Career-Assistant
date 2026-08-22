import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  FaRobot,
  FaUser,
  FaPaperPlane,
  FaTrash,
  FaCopy,
} from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";
import LoadingCard from "../components/common/LoadingCard";
import { sendMessage } from "../services/chatService";

export default function ChatAssistant() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text:
        "👋 Hi! I'm your AI Career Assistant.\n\nAsk me anything about:\n\n• Resume Review\n• DSA\n• MERN Stack\n• Interview Preparation\n• Career Guidance\n• GitHub Projects\n• Roadmaps",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  /* ================= Auto Scroll ================= */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  /* ================= Send Message ================= */

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error("Please type a message.");
      return;
    }

    const currentMessage = message.trim();

    const userMessage = {
      sender: "user",
      text: currentMessage,
    };

    setMessages((prev) => [...prev, userMessage]);

    setMessage("");

    try {
      setLoading(true);

      const response = await sendMessage(currentMessage);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            response.data.reply ||
            "Sorry, I could not generate a response.",
        },
      ]);
    } catch (error) {
      console.log("Chat Error:", error);
      console.log("Response:", error.response);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to get AI response."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= Copy Response ================= */

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);

      toast.success("Response copied!");
    } catch (error) {
      console.log(error);

      toast.error("Failed to copy response.");
    }
  };

  /* ================= Clear Chat ================= */

  const handleClearChat = () => {
    setMessages([
      {
        sender: "ai",
        text:
          "👋 Hello! I'm your AI Career Assistant.\n\nHow can I help you today?",
      },
    ]);

    toast.success("Chat cleared.");
  };

  return (
    <DashboardLayout>

      <div className="max-w-5xl mx-auto">

        {/* ================= Hero ================= */}

        <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 text-white shadow-2xl p-10 mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

              <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md">
                <FaRobot />
                Gemini AI Powered
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mt-5">
                🤖 AI Career Assistant
              </h1>

              <p className="mt-5 text-blue-100 text-lg leading-8 max-w-3xl">
                Ask career questions, get interview help,
                resume advice, DSA guidance, project suggestions
                and much more.
              </p>

            </div>

          </div>

        </div>

        {/* ================= Chat Container ================= */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden">

          {/* ================= Chat Header ================= */}

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 md:px-8 py-5 flex items-center justify-between gap-4">

            <div>

              <h2 className="text-xl md:text-2xl font-bold">
                AI Conversation
              </h2>

              <p className="text-indigo-100 text-sm mt-1">
                Your personal AI career assistant
              </p>

            </div>

            <button
              onClick={handleClearChat}
              disabled={messages.length <= 1 && !loading}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FaTrash />

              <span className="hidden sm:inline">
                Clear
              </span>
            </button>

          </div>

          {/* ================= Messages ================= */}

          <div className="h-[500px] overflow-y-auto p-5 md:p-8 space-y-5">

            {messages.map((msg, index) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                }}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[85%] md:max-w-[75%] rounded-3xl px-5 md:px-6 py-4 shadow-lg ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 dark:text-white"
                  }`}
                >

                  {/* Message Header */}

                  <div className="flex items-center gap-3 mb-3">

                    {msg.sender === "user" ? (
                      <FaUser className="text-lg" />
                    ) : (
                      <FaRobot className="text-lg text-indigo-600 dark:text-indigo-400" />
                    )}

                    <span className="font-semibold">
                      {msg.sender === "user"
                        ? "You"
                        : "AI Assistant"}
                    </span>

                  </div>

                  {/* Message Content */}

                  {msg.sender === "user" ? (

                    <p className="whitespace-pre-wrap leading-7">
                      {msg.text}
                    </p>

                  ) : (

                    <div>

                      <div className="prose prose-sm md:prose-base max-w-none dark:prose-invert prose-pre:bg-slate-950 prose-pre:text-gray-100 prose-code:text-blue-600 dark:prose-code:text-blue-400">

                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                        >
                          {msg.text}
                        </ReactMarkdown>

                      </div>

                      {/* Copy Button */}

                      <button
                        onClick={() =>
                          handleCopy(msg.text)
                        }
                        className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white text-sm hover:bg-slate-300 dark:hover:bg-slate-600 transition"
                      >
                        <FaCopy />

                        Copy
                      </button>

                    </div>

                  )}

                </div>

              </motion.div>

            ))}

            {/* ================= Loading ================= */}

            {loading && (
              <div className="flex justify-start">

                <LoadingCard text="AI is thinking..." />

              </div>
            )}

            <div ref={bottomRef}></div>

          </div>

          {/* ================= Input ================= */}

          <div className="border-t dark:border-slate-700 p-5 md:p-6">

            <div className="flex gap-3">

              <input
                type="text"
                placeholder="Ask anything about coding, career, resume..."
                value={message}
                disabled={loading}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                onKeyDown={(e) => {

                  if (
                    e.key === "Enter" &&
                    !e.shiftKey
                  ) {
                    e.preventDefault();
                    handleSend();
                  }

                }}
                className="flex-1 rounded-2xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
              />

              <button
                onClick={handleSend}
                disabled={
                  loading ||
                  !message.trim()
                }
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:scale-105 transition-all duration-300 text-white px-5 md:px-8 rounded-2xl flex items-center justify-center gap-3 disabled:opacity-60 disabled:hover:scale-100"
              >

                <FaPaperPlane />

                <span className="hidden sm:inline">
                  Send
                </span>

              </button>

            </div>

            <p className="text-xs text-gray-400 mt-3 text-center">
              Press Enter to send • AI responses may need verification
            </p>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}