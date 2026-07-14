const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});


async function analyzeResume(resumeText) {
  try {
    const prompt = `
You are an expert ATS Resume Analyzer.

Analyze the following resume and return:

ATS Score:
Strengths:
Weaknesses:
Missing Keywords:
Recommended Skills:
Improvement Suggestions:

Resume:
${resumeText}
`;

    const completion = await client.chat.completions.create({
      model:"google/gemma-4-26b-a4b-it:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return completion.choices[0].message.content;

  } catch (error) {
    console.error("========== OPENROUTER ERROR ==========");
    console.error(error);
    console.error("======================================");
    throw error;
  }

  return completion.choices[0].message.content;
}

module.exports = {
  analyzeResume,
};