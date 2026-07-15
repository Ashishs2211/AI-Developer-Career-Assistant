const axios = require("axios");

async function fetchRepository(repoUrl) {
  try {
    // Extract username and repository name
    const parts = repoUrl.replace("https://github.com/", "").split("/");

    const owner = parts[0];
    const repo = parts[1];

    // GitHub API
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`
    );

    return response.data;
  } catch (error) {
    throw new Error("Unable to fetch GitHub repository.");
  }
}

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function analyzeRepository(repo) {
  const prompt = `
You are a Senior Software Architect.

Analyze this GitHub repository.

Repository Name:
${repo.name}

Description:
${repo.description}

Primary Language:
${repo.language}

Stars:
${repo.stargazers_count}

Forks:
${repo.forks_count}

Default Branch:
${repo.default_branch}

Return your response in this format:

Repository Score: /100

Strengths:
-

Weaknesses:
-

Technology Review:
-

Scalability:
-

Security Suggestions:
-

Performance Suggestions:
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
  fetchRepository,
  analyzeRepository,
};