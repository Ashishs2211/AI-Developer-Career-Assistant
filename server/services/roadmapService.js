const OpenAI = require("openai");

/* =========================================
   OPENROUTER CLIENT
========================================= */

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});


/* =========================================
   GENERATE CAREER ROADMAP
========================================= */

async function generateCareerRoadmap(goal, level) {

  const prompt = `
You are an expert Career Mentor and Software Industry Guide.

Create a detailed and practical learning roadmap for the candidate.

Career Goal:
${goal}

Current Level:
${level}

Return your response ONLY in the following Markdown format:

# Career Roadmap

## Current Profile
Briefly explain the candidate's starting point based on their current level.

## Phase 1: Foundation
- Topic 1
- Topic 2
- Topic 3

Explain what the candidate should learn in this phase.

## Phase 2: Core Skills
- Topic 1
- Topic 2
- Topic 3

Explain what the candidate should learn in this phase.

## Phase 3: Advanced Skills
- Topic 1
- Topic 2
- Topic 3

Explain what the candidate should learn in this phase.

## Skills to Learn
- Skill 1
- Skill 2
- Skill 3
- Skill 4
- Skill 5

## Projects to Build
1. Project idea 1
2. Project idea 2
3. Project idea 3

For each project, briefly explain what skills it demonstrates.

## Recommended Resources
- Resource or learning platform 1
- Resource or learning platform 2
- Resource or learning platform 3

## Estimated Timeline
Provide a realistic timeline for completing the roadmap.

## Final Advice
Give practical advice for getting started, staying consistent, building projects, and preparing for jobs.

Important:
Make the roadmap practical, structured, and suitable for the candidate's stated level.
Do not give generic or extremely short answers.
`;


  try {

    console.log(
      `Generating roadmap for: ${goal} | Level: ${level}`
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

        max_tokens: 2000,

      });


    const result =
      completion?.choices?.[0]?.message?.content;


    if (!result) {

      const error = new Error(
        "AI returned an empty roadmap response."
      );

      error.status = 502;

      throw error;
    }


    console.log(
      "Career roadmap generated successfully."
    );


    return result;


  } catch (error) {

    const status =
      error?.status ||
      error?.response?.status;


    console.error(
      "========== ROADMAP AI ERROR =========="
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


    /* ===============================
       RATE LIMIT
    =============================== */

    if (status === 429) {

      const rateLimitError = new Error(
        "AI service is temporarily rate limited. Please wait a moment and try again."
      );

      rateLimitError.status = 429;

      throw rateLimitError;
    }


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
       EMPTY RESPONSE
    =============================== */

    if (status === 502) {

      throw error;
    }


    /* ===============================
       OTHER ERRORS
    =============================== */

    const serverError = new Error(
      error?.message ||
      "Failed to generate career roadmap."
    );

    serverError.status =
      status || 500;

    throw serverError;
  }
}


/* =========================================
   EXPORTS
========================================= */

module.exports = {
  generateCareerRoadmap,
};