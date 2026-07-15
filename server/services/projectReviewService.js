const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function reviewProject(files) {
  const prompt = `
You are an experienced Software Architect.

Review the following project structure.

Project Files:

${files.join("\n")}

Return the response in this format:

Project Score: /100

Strengths:
-

Weaknesses:
-

Missing Best Practices:
-

Folder Structure Review:
-

Suggestions:
-

Interview Questions:
-
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
  reviewProject,
};