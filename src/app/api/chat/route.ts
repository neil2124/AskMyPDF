import { GoogleGenerativeAI } from "@google/generative-ai";
import { getContext } from "@/lib/context";
import { db } from "@/lib/db";
import { chats, messages as _messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // Ensure compatibility with database operations

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: Request) {
  try {
    const { messages, chatId } = await req.json();

    // ✅ Validate chatId before DB query
    if (!chatId || isNaN(Number(chatId))) {
      return NextResponse.json({ error: "Invalid chatId" }, { status: 400 });
    }

    const _chats = await db.select().from(chats).where(eq(chats.id, chatId));
    if (_chats.length !== 1) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    const fileKey = _chats[0].fileKey;
    const lastMessage = messages[messages.length - 1];

    // ✅ Handle potential errors in getContext
    let context = "";
    try {
      context = await getContext(lastMessage.content, fileKey);
      // console.log("Context retrieved:", context);
    } catch (err) {
      console.error("Error getting context:", err);
    }

    // ✅ Limit context length to avoid token issues
    const truncatedContext = context.substring(0, 3000);

    // ✅ Improved prompt structure
    const prompt = `
    You are an advanced AI assistant with deep knowledge in various fields. 
    Your task is to answer user queries based on the provided CONTEXT BLOCK.
    If the CONTEXT BLOCK contains relevant information, respond using it directly.
    If the CONTEXT BLOCK does not provide an answer, say: 
    "I'm sorry, but I don't have enough information to answer that."
    Do not make up facts that are not in the context.

    ### CONTEXT BLOCK:
    ${truncatedContext}
    ### END OF CONTEXT BLOCK

    Now, answer the following user question using only the context provided:
    "${lastMessage.content}"
    `;

    // ✅ Use Gemini API with system instructions
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent({
      contents: [
        { role: "user", parts: [{ text: "You are an AI assistant who strictly follows the provided context." }] },
        { role: "user", parts: [{ text: prompt }] },
      ],
    });

    // ✅ Extract response text
    const completion = result.response.text();
    console.log(completion);

    // ✅ Save user message in DB
    await db.insert(_messages).values({
      chatId,
      content: lastMessage.content,
      role: "user",
    });

    // ✅ Save AI message in DB
    await db.insert(_messages).values({
      chatId,
      content: completion,
      role: "system",
    });

    return new Response(completion, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
