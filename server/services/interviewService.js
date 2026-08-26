const OpenAI = require("openai");


/* =========================================
   OPENROUTER CLIENT
========================================= */

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});


/* =========================================
   GENERATE MOCK INTERVIEW
========================================= */

async function generateInterview(
  role,
  experience
) {

  const prompt = `
You are a Senior Technical Interviewer.

Generate a mock interview for the following candidate.

Job Role:
${role}

Experience:
${experience}

Return the response ONLY in this format:

# Interview Level

Explain the expected interview difficulty.

# Technical Questions

Question 1:

Question 2:

Question 3:

Question 4:

Question 5:

# Problem Solving

Give 2 coding/problem-solving questions.

# HR Questions

Give 2 HR/behavioral questions.

# Tips Before Interview

Give 5 practical interview preparation tips.

Important:
Make the questions appropriate for the specified job role and experience level.
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

  for (
    let attempt = 0;
    attempt < 3;
    attempt++
  ) {

    try {

      console.log(
        `OpenRouter Interview Request - Attempt ${
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


      /* ===============================
         CHECK RESPONSE
      =============================== */

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
        "Mock interview generated successfully."
      );


      return result;


    } catch (error) {

      lastError = error;


      const status =
        error?.status ||
        error?.response?.status;


      console.error(
        "========== INTERVIEW AI ERROR =========="
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
        "========================================"
      );


      /* ===============================
         RATE LIMIT
      =============================== */

      if (status === 429) {

        if (attempt < 2) {

          const delay =
            delays[attempt];

          console.log(
            `AI provider rate limited. Retrying in ${
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
            "AI service is temporarily rate limited. Please wait a little and try again."
          );

        rateLimitError.status = 429;

        throw rateLimitError;
      }


      /* ===============================
         INVALID API KEY
      =============================== */

      if (status === 401) {

        const authError =
          new Error(
            "OpenRouter API key is invalid or missing."
          );

        authError.status = 401;

        throw authError;
      }


      /* ===============================
         OTHER ERRORS
      =============================== */

      const serverError =
        new Error(
          error?.message ||
            "Failed to generate interview."
        );

      serverError.status =
        status || 500;

      throw serverError;
    }
  }


  /* =========================================
     FINAL FALLBACK
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