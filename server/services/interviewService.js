const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function generateInterview(role, experience) {
  const prompt = `
You are a Senior Technical Interviewer.

Generate a mock interview for the following candidate.

Job Role:
${role}

Experience:
${experience}

Return the response in this format:

# Interview Level

Explain the expected interview difficulty.

# Technical Questions

Question 1:

Question 2:

Question 3:

Question 4:

Question 5:

# Problem Solving

Give 2 coding/problem-solving questions.

# HR Questions

Give 2 HR/behavioral questions.

# Tips Before Interview

Give 5 practical interview preparation tips.
`;

  try {
    const completion =
      await client.chat.completions.create({
        model: "google/gemma-4-26b-a4b-it:free",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.7,

        max_tokens: 1500,
      });

    const result =
      completion?.choices?.[0]?.message?.content;

    if (!result) {
      const error = new Error(
        "AI returned an empty response."
      );

      error.status = 502;

      throw error;
    }

    return result;

  } catch (error) {

    console.error(
      "OpenRouter Interview Error:",
      error?.status,
      error?.message
    );

    /* ================= 429 ================= */

    if (
      error?.status === 429 ||
      error?.response?.status === 429
    ) {
      const rateLimitError = new Error(
        "AI service is temporarily rate limited. Please wait a little and try again."
      );

      rateLimitError.status = 429;

      throw rateLimitError;
    }

    /* ================= 401 ================= */

    if (
      error?.status === 401 ||
      error?.response?.status === 401
    ) {
      const authError = new Error(
        "OpenRouter API key is invalid or missing."
      );

      authError.status = 401;

      throw authError;
    }

    /* ================= OTHER ERRORS ================= */

    const serverError = new Error(
      error?.message ||
        "Failed to generate interview."
    );

    serverError.status =
      error?.status ||
      error?.response?.status ||
      500;

    throw serverError;
  }
}

module.exports = {
  generateInterview,
};