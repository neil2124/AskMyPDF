import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const API_KEY = process.env.GOOGLE_API_KEY!;
const BASE_URL = "https://generativelanguage.googleapis.com/v1";

export async function getEmbeddings(text: string): Promise<number[]> {
  try {
    // Clean the text - replace newlines with spaces, similar to original
    const cleanedText = text.replace(/\n/g, " ");

    // Get the embedding model
    const model = genAI.getGenerativeModel({ model: "embedding-001" });

    // Generate embedding
    const result = await model.embedContent(cleanedText);
    
    // Extract the embedding values
    const embedding = result.embedding.values;

    return embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }

}

//Models i can use
export async function listGeminiModels() {
  const res = await fetch(`${BASE_URL}/models`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });

  if (!res.ok) {
    throw new Error(`List models failed: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  // json.models is an array of { name: string; version: string; supportedMethods: string[]; … }
  return json.models as Array<{
    name: string;
    supportedMethods: string[];
    [k: string]: any;
  }>;
}

