import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

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
