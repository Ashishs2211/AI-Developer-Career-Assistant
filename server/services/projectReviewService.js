const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});


/* =========================================
   PROJECT REVIEWER
========================================= */

async function reviewProject(files) {

  const prompt = `
You are an experienced Software Architect and Senior Developer.

Review the following project structure.

Project Files:

${files.join("\n")}

Analyze the project structure carefully.

Return the response ONLY in this format:

# AI Project Review

## Project Score
<score>/100

## Strengths
- Point 1
- Point 2
- Point 3

## Weaknesses
- Point 1
- Point 2
- Point 3

## Missing Best Practices
- Point 1
- Point 2
- Point 3

## Folder Structure Review
- Point 1
- Point 2
- Point 3

## Suggestions
- Point 1
- Point 2
- Point 3

## Interview Questions
1. Question 1
2. Question 2
3. Question 3

Important:
The review must be based on the provided project files.
Do not invent files or technologies that are not visible in the project structure.
`;


  /* =========================================
     RETRY CONFIGURATION
  ========================================= */

  const delays = [
    2000,
    5000,
    10000,
  ];

  let lastError = null;


  /* =========================================
     AI REQUEST
  ========================================= */

  for (let attempt = 0; attempt < 3; attempt++) {

    try {

      console.log(
        `OpenRouter Project Review Request - Attempt ${
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

        const error =
          new Error(
            "AI returned an empty response."
          );

        error.status = 502;

        throw error;
      }


      console.log(
        "Project review generated successfully."
      );


      return result;


    } catch (error) {

      lastError = error;


      const status =
        error?.status ||
        error?.response?.status;


      console.error(
        "========== PROJECT REVIEW AI ERROR =========="
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
        "=============================================="
      );


      /* =====================================
         RATE LIMIT
      ===================================== */

      if (status === 429) {

        if (attempt < 2) {

          const delay =
            delays[attempt];

          console.log(
            `Provider rate limited. Retrying in ${
              delay / 1000
            } seconds...`
          );


          await new Promise(
            (resolve) =>
              setTimeout(resolve, delay)
          );


          continue;
        }


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
         OTHER ERRORS
      ===================================== */

      const serverError =
        new Error(
          error?.message ||
          "Failed to review project."
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
      "Failed to review project."
    );

  finalError.status =
    lastError?.status ||
    lastError?.response?.status ||
    500;

  throw finalError;
}


module.exports = {
  reviewProject,
};