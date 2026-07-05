import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

export async function generateWithGemini({
    prompt,
    type,
    tone,
    length,
}) {
    const fullPrompt = `
You are an expert creative writing assistant.

Generate a ${length.toLowerCase()} ${type.toLowerCase()}.

Tone:
${tone}

Prompt:
${prompt}

Return only the generated text.
`;

    const result = await model.generateContent(fullPrompt);

    return result.response.text();
}