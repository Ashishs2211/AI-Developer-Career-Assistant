const OpenAI = require("openai");
const axios = require("axios");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});


/* =========================================
   RESUME ANALYZER
========================================= */

async function analyzeResume(resumeText) {

  try {

    const prompt = `
You are an expert ATS Resume Analyzer.

Analyze the resume.

Return your response ONLY in this format:

# ATS Resume Analysis

## ATS Score
<score>/100

## Strengths
- Point 1
- Point 2
- Point 3

## Weaknesses
- Point 1
- Point 2
- Point 3

## Missing Keywords
- Point 1
- Point 2

## Recommended Skills
- Point 1
- Point 2

## Improvement Suggestions
- Point 1
- Point 2

Resume:

${resumeText}
`;


    const completion =
      await client.chat.completions.create({

        model: "openrouter/free",

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
      "========== OPENROUTER ERROR =========="
    );

    console.error(
      "Status:",
      error?.status ||
        error?.response?.status
    );

    console.error(
      "Message:",
      error?.message
    );

    console.error(
      "======================================"
    );


    /* ===============================
       RATE LIMIT
    =============================== */

    if (
      error?.status === 429 ||
      error?.response?.status === 429
    ) {

      const rateLimitError = new Error(
        "AI service is temporarily rate limited. Please wait and try again."
      );

      rateLimitError.status = 429;

      throw rateLimitError;
    }


    /* ===============================
       INVALID API KEY
    =============================== */

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


    /* ===============================
       OTHER ERRORS
    =============================== */

    const serverError = new Error(
      error?.message ||
        "Failed to analyze resume."
    );

    serverError.status =
      error?.status ||
      error?.response?.status ||
      500;

    throw serverError;
  }
}


/* =========================================
   GITHUB REPOSITORY DETAILS
========================================= */

async function fetchRepositoryDetails(
  owner,
  repo
) {

  try {

    const [
      repoInfo,
      readme,
      languages
    ] = await Promise.all([

      axios.get(
        `https://api.github.com/repos/${owner}/${repo}`
      ),

      axios.get(
        `https://api.github.com/repos/${owner}/${repo}/readme`
      ),

      axios.get(
        `https://api.github.com/repos/${owner}/${repo}/languages`
      ),

    ]);


    return {

      repo: repoInfo.data,

      readme:
        Buffer
          .from(
            readme.data.content,
            "base64"
          )
          .toString("utf8"),

      languages:
        languages.data,

    };

  } catch (error) {

    throw new Error(
      "Unable to fetch repository details."
    );

  }
}


module.exports = {
  analyzeResume,
};