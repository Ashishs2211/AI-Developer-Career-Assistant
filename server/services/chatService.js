const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateChatResponse = async (message) => {
  const prompt = `
You are an AI Career Assistant.

Help users with:
- Resume Review
- MERN Stack
- Java
- DSA
- Interview Preparation
- Career Guidance
- GitHub
- Projects

Question:
${message}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
  });

  return response.text;
};

module.exports = {
  generateChatResponse,
};