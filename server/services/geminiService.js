const OpenAI = require("openai");
const axios = require("axios");

/* =========================================
   OPENROUTER CLIENT
========================================= */

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",

  // Prevent AI request from hanging too long
  timeout: 50000,

  // We handle retries manually below
  maxRetries: 0,
});

/* =========================================
   HELPER - DELAY
========================================= */

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));


/* =========================================
   RESUME ANALYZER
========================================= */

async function analyzeResume(resumeText) {

  if (!resumeText || !resumeText.trim()) {
    const error = new Error(
      "Resume text is required."
    );

    error.status = 400;

    throw error;
  }


  /* =========================================
     LIMIT VERY LARGE RESUMES
  ========================================= */

  const cleanResumeText =
    resumeText.trim().slice(0, 15000);


  /* =========================================
     PROMPT
  ========================================= */

  const prompt = `
You are an expert ATS Resume Analyzer.

Analyze the resume provided below.

Provide useful and realistic feedback based ONLY on
the information available in the resume.

Do not invent skills, experience, projects, education,
or achievements that are not present.

Return your response ONLY in this Markdown format:

# ATS Resume Analysis

## ATS Score
Give a score out of 100 and a short explanation.

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
- Point 3

## Recommended Skills
- Point 1
- Point 2
- Point 3

## Improvement Suggestions
- Point 1
- Point 2
- Point 3

Resume:

${cleanResumeText}
`;


  /* =========================================
     RETRY CONFIGURATION
  ========================================= */

  const MAX_ATTEMPTS = 2;

  const delays = [
    3000,
  ];

  let lastError = null;


  /* =========================================
     AI REQUEST
  ========================================= */

  for (
    let attempt = 0;
    attempt < MAX_ATTEMPTS;
    attempt++
  ) {

    try {

      console.log(
        `OpenRouter Resume Request - Attempt ${
          attempt + 1
        }/${MAX_ATTEMPTS}`
      );


      const completion =
        await client.chat.completions.create({

          model: "openrouter/free",

          messages: [
            {
              role: "system",
              content: `
You are a professional ATS Resume Analyzer.

Always provide a complete and useful resume analysis.

Follow the exact Markdown structure requested by the user.

Do not return empty responses.
Do not return safety classifications.
              `,
            },
            {
              role: "user",
              content: prompt,
            },
          ],

          temperature: 0.5,

          max_tokens: 1200,

        });


      /* =====================================
         EXTRACT RESPONSE
      ===================================== */

      const result =
        completion?.choices?.[0]?.message?.content?.trim();


      /* =====================================
         CHECK EMPTY RESPONSE
      ===================================== */

      if (!result) {

        const error = new Error(
          "AI returned an empty response."
        );

        error.status = 502;

        throw error;
      }


      /* =====================================
         CHECK VALID RESPONSE
      ===================================== */

      const isTooShort =
        result.length < 100;

      const hasATSAnalysis =
        result.toLowerCase().includes(
          "ats resume analysis"
        );

      const hasScore =
        result.toLowerCase().includes(
          "ats score"
        );


      if (
        isTooShort ||
        !hasATSAnalysis ||
        !hasScore
      ) {

        const error = new Error(
          "AI returned an incomplete resume analysis."
        );

        error.status = 502;

        throw error;
      }


      console.log(
        "Resume AI response generated successfully."
      );


      return result;


    } catch (error) {

      lastError = error;

      const status =
        error?.status ||
        error?.response?.status;

      const message =
        error?.message ||
        "Unknown AI error";


      /* =====================================
         LOG ERROR
      ===================================== */

      console.error(
        "========== OPENROUTER RESUME ERROR =========="
      );

      console.error(
        "Attempt:",
        `${attempt + 1}/${MAX_ATTEMPTS}`
      );

      console.error(
        "Status:",
        status
      );

      console.error(
        "Message:",
        message
      );

      console.error(
        "============================================="
      );


      /* =====================================
         INVALID API KEY
      ===================================== */

      if (status === 401) {

        const authError = new Error(
          "AI service authentication failed."
        );

        authError.status = 401;

        throw authError;
      }


      /* =====================================
         RETRY TEMPORARY ERRORS
      ===================================== */

      const shouldRetry =
        attempt < MAX_ATTEMPTS - 1 &&
        (
          status === 429 ||
          status === 502 ||
          status === 503 ||
          status === 504 ||
          error?.code === "ETIMEDOUT" ||
          error?.code === "ECONNRESET" ||
          error?.name === "APIConnectionTimeoutError"
        );


      if (shouldRetry) {

        const delay =
          delays[attempt] || 3000;

        console.log(
          `Temporary AI error. Retrying in ${
            delay / 1000
          } seconds...`
        );

        await sleep(delay);

        continue;
      }


      /* =====================================
         RATE LIMIT
      ===================================== */

      if (status === 429) {

        const rateLimitError = new Error(
          "AI service is currently busy. Please wait a moment and try again."
        );

        rateLimitError.status = 429;

        throw rateLimitError;
      }


      /* =====================================
         AI TIMEOUT
      ===================================== */

      if (
        error?.code === "ETIMEDOUT" ||
        error?.name === "APIConnectionTimeoutError" ||
        message.toLowerCase().includes("timeout")
      ) {

        const timeoutError = new Error(
          "AI service took too long to respond. Please try again."
        );

        timeoutError.status = 504;

        throw timeoutError;
      }


      /* =====================================
         OTHER ERROR
      ===================================== */

      const serverError = new Error(
        message ||
        "Failed to analyze resume."
      );

      serverError.status =
        status || 500;

      throw serverError;
    }
  }


  /* =========================================
     FINAL FALLBACK
  ========================================= */

  const finalError = new Error(
    lastError?.message ||
    "Failed to analyze resume."
  );

  finalError.status =
    lastError?.status ||
    lastError?.response?.status ||
    500;

  throw finalError;
}


/* =========================================
   GITHUB REPOSITORY DETAILS
========================================= */

async function fetchRepositoryDetails(
  owner,
  repo
) {

  try {

    const headers = {
      Accept:
        "application/vnd.github+json",
    };


    const [
      repoInfo,
      readme,
      languages,
    ] = await Promise.all([

      axios.get(
        `https://api.github.com/repos/${owner}/${repo}`,
        {
          headers,
          timeout: 15000,
        }
      ),

      axios.get(
        `https://api.github.com/repos/${owner}/${repo}/readme`,
        {
          headers,
          timeout: 15000,
        }
      ),

      axios.get(
        `https://api.github.com/repos/${owner}/${repo}/languages`,
        {
          headers,
          timeout: 15000,
        }
      ),

    ]);


    return {

      repo: repoInfo.data,

      readme:
        readme?.data?.content
          ? Buffer
              .from(
                readme.data.content,
                "base64"
              )
              .toString("utf8")
          : "",

      languages:
        languages.data || {},

    };


  } catch (error) {

    console.error(
      "========== GITHUB REPOSITORY ERROR =========="
    );

    console.error(
      "Status:",
      error?.response?.status
    );

    console.error(
      "Message:",
      error?.message
    );

    console.error(
      "============================================="
    );


    const githubError = new Error(
      "Unable to fetch repository details."
    );

    githubError.status =
      error?.response?.status ||
      500;

    throw githubError;
  }
}


/* =========================================
   EXPORTS
========================================= */

module.exports = {
  analyzeResume,
  fetchRepositoryDetails,
};