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


  /* =========================================
     RETRY CONFIGURATION
  ========================================= */

  const delays = [
    2000,   // 2 seconds
    5000,   // 5 seconds
    10000,  // 10 seconds
  ];


  let lastError = null;


  /* =========================================
     TRY AI REQUEST
  ========================================= */

  for (let attempt = 0; attempt < 3; attempt++) {

    try {

      console.log(
        `OpenRouter Resume Request - Attempt ${
          attempt + 1
        }/3`
      );


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


      /* =====================================
         CHECK RESPONSE
      ===================================== */

      const result =
        completion?.choices?.[0]?.message?.content;


      if (!result) {

        const emptyResponseError =
          new Error(
            "AI returned an empty response."
          );

        emptyResponseError.status = 502;

        throw emptyResponseError;
      }


      console.log(
        "Resume AI response received successfully."
      );


      return result;


    } catch (error) {

      lastError = error;


      const status =
        error?.status ||
        error?.response?.status;


      console.error(
        "========== OPENROUTER ERROR =========="
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
        "======================================"
      );


      /* =====================================
         RATE LIMIT - RETRY
      ===================================== */

      if (status === 429) {

        if (attempt < 2) {

          const delay =
            delays[attempt];

          console.log(
            `OpenRouter rate limited. Retrying in ${
              delay / 1000
            } seconds...`
          );


          await new Promise(
            (resolve) =>
              setTimeout(resolve, delay)
          );


          continue;
        }


        /* ================================
           ALL RETRIES FAILED
        ================================= */

        const rateLimitError =
          new Error(
            "AI service is temporarily rate limited. Please wait and try again."
          );

        rateLimitError.status = 429;

        throw rateLimitError;
      }


      /* =====================================
         INVALID API KEY
      ===================================== */

      if (status === 401) {

        const authError =
          new Error(
            "OpenRouter API key is invalid or missing."
          );

        authError.status = 401;

        throw authError;
      }


      /* =====================================
         OTHER ERROR
      ===================================== */

      const serverError =
        new Error(
          error?.message ||
            "Failed to analyze resume."
        );

      serverError.status =
        status || 500;

      throw serverError;
    }
  }


  /* =========================================
     FALLBACK
  ========================================= */

  const finalError =
    new Error(
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

    const [
      repoInfo,
      readme,
      languages,
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

    console.error(
      "GitHub Repository Error:",
      error
    );


    throw new Error(
      "Unable to fetch repository details."
    );
  }
}


/* =========================================
   EXPORTS
========================================= */

module.exports = {
  analyzeResume,
  fetchRepositoryDetails,
};