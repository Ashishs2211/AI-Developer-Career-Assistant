const OpenAI = require("openai");


/* =========================================
   OPENROUTER CLIENT
========================================= */

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",

  // Prevent request from hanging forever
  timeout: 60000,

  // We handle retries manually
  maxRetries: 0,
});


/* =========================================
   HELPER - DELAY
========================================= */

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));


/* =========================================
   GENERATE MOCK INTERVIEW
========================================= */

async function generateInterview(role, experience) {

  /* =========================================
     VALIDATION
  ========================================= */

  if (!role || !role.trim()) {
    const error = new Error(
      "Job role is required."
    );

    error.status = 400;

    throw error;
  }


  if (!experience || !experience.trim()) {
    const error = new Error(
      "Experience is required."
    );

    error.status = 400;

    throw error;
  }


  /* =========================================
     PROMPT
  ========================================= */

  const prompt = `
You are a Senior Technical Interviewer.

Generate a mock interview for the following candidate.

Job Role: ${role.trim()}

Experience: ${experience.trim()}

IMPORTANT:
Return ONLY valid Markdown.
Follow the exact structure below.

Every question MUST be a separate numbered list item.
Never put multiple questions in the same paragraph.
Never write multiple questions on the same line.

# Interview Level

Write 2-3 sentences explaining the expected interview difficulty.

# Technical Questions

1. Write the first technical question.

2. Write the second technical question.

3. Write the third technical question.

4. Write the fourth technical question.

5. Write the fifth technical question.

# Problem Solving

1. Write the first coding or problem-solving question.

2. Write the second coding or problem-solving question.

# HR Questions

1. Write the first HR or behavioral question.

2. Write the second HR or behavioral question.

# Tips Before Interview

1. Write the first practical interview preparation tip.

2. Write the second practical interview preparation tip.

3. Write the third practical interview preparation tip.

4. Write the fourth practical interview preparation tip.

5. Write the fifth practical interview preparation tip.

STRICT RULES:

- Use the exact headings shown above.
- Each question must be a separate numbered item.
- Start every numbered item on a new line.
- Leave a blank line between numbered items.
- Never combine multiple questions into one paragraph.
- Do not provide answers to the questions.
- Do not add text before or after the required sections.
- Make questions appropriate for the specified job role and experience.
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
        `OpenRouter Interview Request - Attempt ${
          attempt + 1
        }/${MAX_ATTEMPTS}`
      );


      /* =====================================
         CALL OPENROUTER
      ===================================== */

      const completion =
        await client.chat.completions.create({

          model: "openrouter/free",

          messages: [
            {
              role: "system",
              content: `
You are a professional technical interviewer.

Generate complete mock interview questions.

Always return a complete response.

Follow the exact Markdown format requested.

Never return an empty response.

Never combine multiple questions into a single paragraph.
              `,
            },
            {
              role: "user",
              content: prompt,
            },
          ],

          temperature: 0.6,

          max_tokens: 1500,

        });


      /* =====================================
         DEBUG RESPONSE
      ===================================== */

      console.log(
        "OpenRouter finish reason:",
        completion?.choices?.[0]?.finish_reason
      );


      /* =====================================
         EXTRACT RESPONSE
      ===================================== */

      const result =
        completion
          ?.choices?.[0]
          ?.message
          ?.content
          ?.trim();


      /* =====================================
         EMPTY RESPONSE CHECK
      ===================================== */

      if (!result) {

        console.error(
          "OpenRouter returned empty content."
        );

        console.log(
          "Raw response:",
          JSON.stringify(
            completion,
            null,
            2
          )
        );


        const error =
          new Error(
            "AI returned an empty response."
          );

        error.status = 502;

        error.retryable = true;

        throw error;
      }


      /* =====================================
         VALID RESPONSE CHECK
      ===================================== */

      const isTooShort =
        result.length < 150;

      const hasTechnicalQuestions =
        result.toLowerCase().includes(
          "technical questions"
        );

      const hasInterviewLevel =
        result.toLowerCase().includes(
          "interview level"
        );

      const hasProblemSolving =
        result.toLowerCase().includes(
          "problem solving"
        );

      const hasHRQuestions =
        result.toLowerCase().includes(
          "hr questions"
        );


      if (
        isTooShort ||
        !hasTechnicalQuestions ||
        !hasInterviewLevel ||
        !hasProblemSolving ||
        !hasHRQuestions
      ) {

        const error =
          new Error(
            "AI returned an incomplete interview response."
          );

        error.status = 502;

        error.retryable = true;

        throw error;
      }


      /* =====================================
         SUCCESS
      ===================================== */

      console.log(
        "Mock interview generated successfully."
      );


      return result;


    } catch (error) {

      lastError = error;


      /* =====================================
         GET ERROR DETAILS
      ===================================== */

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
        "========== INTERVIEW AI ERROR =========="
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
        "Code:",
        error?.code
      );

      console.error(
        "========================================"
      );


      /* =====================================
         INVALID API KEY
      ===================================== */

      if (status === 401) {

        const authError =
          new Error(
            "AI service authentication failed."
          );

        authError.status = 401;

        throw authError;
      }


      /* =====================================
         CHECK IF RETRY IS NEEDED
      ===================================== */

      const shouldRetry =
        attempt < MAX_ATTEMPTS - 1 &&
        (
          status === 429 ||
          status === 502 ||
          status === 503 ||
          status === 504 ||
          error?.retryable === true ||
          error?.code === "ETIMEDOUT" ||
          error?.code === "ECONNRESET" ||
          error?.name ===
            "APIConnectionTimeoutError"
        );


      /* =====================================
         RETRY
      ===================================== */

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

        const rateLimitError =
          new Error(
            "AI service is currently busy. Please wait a moment and try again."
          );

        rateLimitError.status = 429;

        throw rateLimitError;
      }


      /* =====================================
         TIMEOUT
      ===================================== */

      if (
        error?.code === "ETIMEDOUT" ||
        error?.name ===
          "APIConnectionTimeoutError" ||
        message
          .toLowerCase()
          .includes("timeout")
      ) {

        const timeoutError =
          new Error(
            "AI service took too long to respond. Please try again."
          );

        timeoutError.status = 504;

        throw timeoutError;
      }


      /* =====================================
         OTHER ERROR
      ===================================== */

      const serverError =
        new Error(
          message ||
          "Failed to generate interview."
        );

      serverError.status =
        status || 500;

      throw serverError;
    }
  }


  /* =========================================
     FINAL ERROR
  ========================================= */

  const finalError =
    new Error(
      lastError?.message ||
      "Failed to generate interview."
    );

  finalError.status =
    lastError?.status ||
    lastError?.response?.status ||
    500;

  throw finalError;
}


/* =========================================
   EXPORT
========================================= */

module.exports = {
  generateInterview,
};