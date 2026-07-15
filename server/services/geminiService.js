const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});


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
async function fetchRepositoryDetails(owner, repo) {
  try {
    const [repoInfo, readme, languages] = await Promise.all([
      axios.get(`https://api.github.com/repos/${owner}/${repo}`),
      axios.get(`https://api.github.com/repos/${owner}/${repo}/readme`),
      axios.get(`https://api.github.com/repos/${owner}/${repo}/languages`)
    ]);

    return {
      repo: repoInfo.data,
      readme: Buffer.from(readme.data.content, "base64").toString("utf8"),
      languages: languages.data,
    };
  } catch (error) {
    throw new Error("Unable to fetch repository details.");
  }
}
module.exports = {
  analyzeResume,
};