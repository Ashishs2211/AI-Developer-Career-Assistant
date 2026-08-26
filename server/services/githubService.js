const axios = require("axios");
const OpenAI = require("openai");

/* =========================================
   OPENROUTER CLIENT
========================================= */

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

/* =========================================
   FETCH GITHUB REPOSITORY
========================================= */

async function fetchRepository(repoUrl) {
  try {
    if (!repoUrl) {
      const error = new Error(
        "GitHub repository URL is required."
      );

      error.status = 400;

      throw error;
    }

    /* ===============================
       CLEAN URL
    =============================== */

    let cleanUrl = repoUrl.trim();

    cleanUrl = cleanUrl.replace(/\/+$/, "");

    /* ===============================
       VALIDATE URL
    =============================== */

    const githubPattern =
      /^https?:\/\/github\.com\/([^/]+)\/([^/]+)$/;

    const match = cleanUrl.match(githubPattern);

    if (!match) {
      const error = new Error(
        "Invalid GitHub repository URL. Example: https://github.com/username/repository"
      );

      error.status = 400;

      throw error;
    }

    const owner = match[1];
    const repo = match[2];

    /* ===============================
       FETCH REPOSITORY
    =============================== */

    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error(
      "========== GITHUB FETCH ERROR =========="
    );

    console.error(
      "Status:",
      error?.response?.status || error?.status
    );

    console.error(
      "Message:",
      error?.message
    );

    console.error(
      "========================================"
    );

    /* ===============================
       REPOSITORY NOT FOUND
    =============================== */

    if (error?.response?.status === 404) {
      const notFoundError = new Error(
        "GitHub repository not found. Make sure the repository is public and the URL is correct."
      );

      notFoundError.status = 404;

      throw notFoundError;
    }

    /* ===============================
       GITHUB RATE LIMIT
    =============================== */

    if (error?.response?.status === 403) {
      const githubLimitError = new Error(
        "GitHub API rate limit reached. Please try again later."
      );

      githubLimitError.status = 429;

      throw githubLimitError;
    }

    /* ===============================
       KEEP CUSTOM ERROR
    =============================== */

    if (error?.status) {
      throw error;
    }

    const githubError = new Error(
      "Unable to fetch GitHub repository."
    );

    githubError.status =
      error?.response?.status || 500;

    throw githubError;
  }
}

/* =========================================
   ANALYZE GITHUB REPOSITORY
========================================= */

async function analyzeRepository(repo) {
  const prompt = `
You are a Senior Software Architect.

Analyze this GitHub repository using ONLY the repository information provided below.

Repository Name:
${repo.name}

Description:
${repo.description || "No description provided"}

Primary Language:
${repo.language || "Not specified"}

Stars:
${repo.stargazers_count}

Forks:
${repo.forks_count}

Default Branch:
${repo.default_branch}

Repository Visibility:
${repo.visibility}

Created:
${repo.created_at}

Last Updated:
${repo.updated_at}

IMPORTANT INSTRUCTIONS:

- Provide a COMPLETE repository analysis.
- Do NOT return only a safety message.
- Do NOT return "User Safety: safe".
- Do NOT mention content moderation or safety classification.
- Return meaningful technical analysis.
- Base the analysis ONLY on the repository information provided.
- Do NOT invent technologies or features.

Return the response EXACTLY in this format:

# AI GitHub Repository Analysis

## Repository Score
Give a score out of 100 and a brief explanation.

## Strengths
- Point 1
- Point 2
- Point 3

## Weaknesses
- Point 1
- Point 2
- Point 3

## Technology Review
- Point 1
- Point 2
- Point 3

## Scalability
- Point 1
- Point 2
- Point 3

## Security Suggestions
- Point 1
- Point 2
- Point 3

## Performance Suggestions
- Point 1
- Point 2
- Point 3

## Interview Questions
1. Question 1
2. Question 2
3. Question 3
`;

  const delays = [2000, 5000, 10000];

  let lastError = null;

  /* ===============================
     AI REQUEST WITH RETRY
  =============================== */

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      console.log(
        `OpenRouter GitHub Analysis Request - Attempt ${attempt + 1}/3`
      );

      const completion =
        await client.chat.completions.create({
          model: "openrouter/free",

          messages: [
            {
              role: "system",
              content: `
You are a Senior Software Architect.

Your job is to provide detailed, structured, useful technical analysis.

Always follow the requested output format.

Never return only a safety classification or a short safety message.
              `,
            },
            {
              role: "user",
              content: prompt,
            },
          ],

          temperature: 0.7,

          max_tokens: 2000,
        });

      const result =
        completion?.choices?.[0]?.message?.content?.trim();

      /* ===============================
         CHECK EMPTY RESPONSE
      =============================== */

      if (!result) {
        const error = new Error(
          "AI returned an empty response."
        );

        error.status = 502;

        throw error;
      }

      /* ===============================
         CHECK INCOMPLETE RESPONSE
      =============================== */

      const isTooShort =
        result.length < 300;

      const isSafetyResponse =
        result.toLowerCase().includes("user safety");

      const hasScore =
        result.toLowerCase().includes(
          "repository score"
        );

      if (
        isTooShort ||
        isSafetyResponse ||
        !hasScore
      ) {
        const error = new Error(
          "AI returned an incomplete repository analysis."
        );

        error.status = 502;

        throw error;
      }

      /* ===============================
         SUCCESS
      =============================== */

      console.log(
        "GitHub AI analysis generated successfully."
      );

      return result;

    } catch (error) {
      lastError = error;

      const status =
        error?.status ||
        error?.response?.status;

      console.error(
        "========== GITHUB AI ERROR =========="
      );

      console.error(
        "Attempt:",
        `${attempt + 1}/3`
      );

      console.error(
        "Status:",
        status
      );

      console.error(
        "Message:",
        error?.message
      );

      console.error(
        "====================================="
      );

      /* ===============================
         INVALID API KEY
      =============================== */

      if (status === 401) {
        const authError = new Error(
          "OpenRouter API key is invalid or missing."
        );

        authError.status = 401;

        throw authError;
      }

      /* ===============================
         RETRY
      =============================== */

      if (attempt < 2) {
        const delay = delays[attempt];

        console.log(
          `Retrying AI request in ${delay / 1000} seconds...`
        );

        await new Promise((resolve) =>
          setTimeout(resolve, delay)
        );

        continue;
      }

      /* ===============================
         RATE LIMIT
      =============================== */

      if (status === 429) {
        const rateLimitError = new Error(
          "AI service is temporarily rate limited. Please wait and try again."
        );

        rateLimitError.status = 429;

        throw rateLimitError;
      }

      /* ===============================
         OTHER ERRORS
      =============================== */

      const serverError = new Error(
        error?.message ||
        "Failed to analyze GitHub repository."
      );

      serverError.status =
        status || 500;

      throw serverError;
    }
  }

  /* ===============================
     FINAL FALLBACK
  =============================== */

  const finalError = new Error(
    lastError?.message ||
    "Failed to generate complete GitHub analysis."
  );

  finalError.status =
    lastError?.status ||
    lastError?.response?.status ||
    500;

  throw finalError;
}

/* =========================================
   EXPORTS
========================================= */

module.exports = {
  fetchRepository,
  analyzeRepository,
};