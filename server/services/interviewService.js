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

Interview Level:

Question 1:

Question 2:

Question 3:

Question 4:

Question 5:

Tips Before Interview:
`;

  const completion = await client.chat.completions.create({
    model: "google/gemma-4-26b-a4b-it:free",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return completion.choices[0].message.content;
}

module.exports = {
  generateInterview,
};