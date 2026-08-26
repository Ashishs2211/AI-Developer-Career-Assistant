const OpenAI = require("openai");

/* =========================================
   OPENROUTER CLIENT
========================================= */

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

/* =========================================
   GENERATE CHAT RESPONSE
========================================= */

const generateChatResponse = async (message) => {
  try {
    const completion = await client.chat.completions.create({
      model: "openrouter/free",

      messages: [
        {
          role: "system",
          content: `
You are an AI Career Assistant.

You help users with:

- Resume Review
- MERN Stack Development
- Java
- DSA
- Interview Preparation
- Career Guidance
- GitHub Projects
- Web Development
- Programming

Give clear, helpful, practical answers.

Use proper headings and bullet points when useful.
Do not return safety classifications.
`,
        },
        {
          role: "user",
          content: message,
        },
      ],

      temperature: 0.7,

      max_tokens: 1000,
    });

    const response =
      completion?.choices?.[0]?.message?.content?.trim();

    if (!response) {
      const error = new Error(
        "AI returned an empty response."
      );

      error.status = 502;

      throw error;
    }

    return response;

  } catch (error) {

    console.error(
      "========== CHAT AI ERROR =========="
    );

    console.error(
      "Status:",
      error?.status || error?.response?.status
    );

    console.error(
      "Message:",
      error?.message
    );

    console.error(
      "=================================="
    );

    throw error;
  }
};

module.exports = {
  generateChatResponse,
};