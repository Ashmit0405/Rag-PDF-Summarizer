import Layout from "@/components/Home/Layout";
import ChatWindow from "@/components/Home/ChatWindow";
import { useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import { useChats } from "@/hooks/useChats";
import { useSummary } from "@/hooks/useSummary";
import ProfileCard from "@/components/Home/ProfileCard";

export default function Home() {
  const [selectedChat, setSelectedChat] = useState(null);
  const { chats } = useChats();

  const { qnas, askQuery, loading, error } = useQuery(selectedChat?._id);
  const {fetchSummary}=useSummary();

  return (
    <>
      <div className="absolute top-4 right-4">
          <ProfileCard/>
        </div>
    <Layout
      chats={chats}
      onSelectChat={(id) => {
        const chat = chats.find((c) => c._id === id);
        setSelectedChat(chat);
      }}
    >
      <ChatWindow
        chat={selectedChat}
        qnas={qnas}
        onAsk={askQuery}
        loading={loading}
        error={error}
        onGenerateSummary={fetchSummary}
      />
    </Layout>
    </>
  );
}
