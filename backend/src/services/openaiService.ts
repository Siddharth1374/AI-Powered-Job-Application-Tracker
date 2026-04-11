import Groq from "groq-sdk";
import { ParsedJobData } from "../types/application";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Safe JSON parser — strips markdown fences if model wraps response
const parseJsonSafely = <T>(content: string): T => {
  try {
    const cleaned = content.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    throw new Error(`AI returned invalid JSON: ${content}`);
  }
};

export const parseJobDescription = async (
  jobDescription: string
): Promise<ParsedJobData> => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY missing in .env");
  }

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "Extract structured job data and return ONLY valid JSON. No explanation, no markdown."
      },
      {
        role: "user",
        content: `Extract these fields and return as JSON only:
companyName, role, requiredSkills (array), niceToHaveSkills (array), seniority, location

Job Description:
${jobDescription}`
      }
    ]
  });

  const content = response.choices[0].message.content || "";
  return parseJsonSafely<ParsedJobData>(content);
};

export const generateResumeSuggestions = async (
  jobDescription: string,
  role?: string,
  company?: string
): Promise<string[]> => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY missing in .env");
  }

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "Generate resume bullet points. Return ONLY valid JSON. No explanation, no markdown."
      },
      {
        role: "user",
        content: `Generate 3–5 resume bullet points.

Role: ${role || ""}
Company: ${company || ""}

Job Description:
${jobDescription}

Return JSON exactly like this:
{"suggestions":["bullet 1", "bullet 2", "bullet 3"]}`
      }
    ]
  });

  const content = response.choices[0].message.content || "";
  const parsed = parseJsonSafely<{ suggestions: string[] }>(content);
  return parsed.suggestions;
};