import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaUser,
  FaPaperPlane,
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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error("Please type a message.");
      return;
    }

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = message;

    setMessage("");

    try {
      setLoading(true);

      const response = await sendMessage(currentMessage);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: response.data.reply,
        },
      ]);
    } catch (error) {
      console.log(error);
console.log(error.response);

        toast.error(
        error.response?.data?.message ||
        error.message ||
        "Unable to get AI response."
        );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>

      <div className="max-w-5xl mx-auto">

        {/* Hero */}

        <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 text-white shadow-2xl p-10 mb-8">

          <h1 className="text-5xl font-bold">
            🤖 AI Career Assistant
          </h1>

          <p className="mt-5 text-blue-100 text-lg leading-8">
            Ask career questions, get interview help,
            resume advice, DSA guidance,
            project suggestions and much more.
          </p>

        </div>

        {/* Chat Container */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden">

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-5">

            <h2 className="text-2xl font-bold">
              AI Conversation
            </h2>

          </div>

          <div className="h-[500px] overflow-y-auto p-8 space-y-5">

        {messages.map((msg, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`flex ${
      msg.sender === "user"
        ? "justify-end"
        : "justify-start"
    }`}
  >
    <div
      className={`max-w-[75%] rounded-3xl px-6 py-4 shadow-lg ${
        msg.sender === "user"
          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
          : "bg-slate-100 dark:bg-slate-800 dark:text-white"
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        {msg.sender === "user" ? (
          <FaUser className="text-lg" />
        ) : (
          <FaRobot className="text-lg text-indigo-600" />
        )}

        <span className="font-semibold">
          {msg.sender === "user"
            ? "You"
            : "AI Assistant"}
        </span>
      </div>

      <p className="whitespace-pre-wrap leading-7">
        {msg.text}
      </p>
    </div>
  </motion.div>
))}

{loading && (
  <LoadingCard text="AI is thinking..." />
)}

<div ref={bottomRef}></div>

</div>

<div className="border-t dark:border-slate-700 p-6 flex gap-4">

  <input
    type="text"
    placeholder="Ask anything..."
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        handleSend();
      }
    }}
    className="flex-1 rounded-2xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button
  onClick={handleSend}
  disabled={loading}
  className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:scale-105 transition-all duration-300 text-white px-8 rounded-2xl flex items-center gap-3 disabled:opacity-60"
>
  <FaPaperPlane />
  Send
</button>

</div>

</div>

</div>

</DashboardLayout>
);
}