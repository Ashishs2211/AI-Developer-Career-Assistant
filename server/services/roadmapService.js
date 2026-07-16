const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function generateCareerRoadmap(goal, level) {
  const prompt = `
You are an expert Career Mentor.

Create a learning roadmap.

Career Goal:
${goal}

Current Level:
${level}

Return the response in this format:

Learning Roadmap

Phase 1:
...

Phase 2:
...

Phase 3:
...

Skills to Learn:
-

Projects to Build:
-

Recommended Resources:
-

Estimated Timeline:

Final Advice:
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
  generateCareerRoadmap,
};