import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSideBar";
import PDFViewer from "@/components/PDFViewer";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";
// import { listGeminiModels } from "@/lib/embeddings";

type Props = {
  params: Promise<{ chatId: string }>; // 🔹 Ensure `params` is awaited
};

// ✅ Move async logic to fetch data before rendering
async function fetchChatData(chatId: string) {
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");

  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats?.length) return redirect("/");

  const chat = _chats.find((chat) => chat.id === parseInt(chatId));
  if (!chat) return redirect("/");

  const isPro = await checkSubscription();
  //Models available
  // const models = await listGeminiModels();
  // console.log(models);
  return { _chats, currentChat: chat, isPro };


}

export default async function ChatPage({ params }: Props) {
  const { chatId } = await params; // 🔹 Await `params` before using it
  const data = await fetchChatData(chatId);
  if (!data) return null;

  const { _chats, currentChat, isPro } = data;

  return (
<div className="h-screen w-screen flex">
  {/* Sidebar (Fixed) */}
  <div className="w-1/5 bg-gray-900 text-white p-4 overflow-y-auto h-full">
    <ChatSideBar chats={_chats} chatId={parseInt(chatId)} isPro={isPro} />
  </div>

  {/* Main Content */}
  <div className="flex-1 flex h-full">
    {/* PDF Viewer */}
    <div className="flex-1 p-4 overflow-hidden">
      <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
    </div>

    {/* Chat Section */}
    <div className="w-1/3 border-l border-gray-200 p-4 flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto">
        <ChatComponent chatId={parseInt(chatId)} />
      </div>
    </div>
  </div>
</div>



  );
}
