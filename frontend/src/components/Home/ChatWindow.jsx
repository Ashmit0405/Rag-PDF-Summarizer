import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import ChatHeader from "./ChatHeader";
import SummarySection from "./SummarySection";
import QnaList from "./QnaList";
import MessageInput from "./MessageInput";

export default function ChatWindow({
  chat,
  qnas,
  onAsk,
  loading,
  error,
  onGenerateSummary,
}) {
  const [query, setQuery] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState("No Summary Available");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [persona, setPersona] = useState("");
  const [job, setJob] = useState("");

    useEffect(() => {
    if (chat?.summary) {
      setSummary(chat.summary);
      setShowSummary(true);
    } else {
      setSummary("No Summary Available");
      setShowSummary(false);
    }
  }, [chat]);

  if (!chat)
    return (
      <div className="flex-1 flex items-center justify-center mx-10">
        Select a chat to view
      </div>
    );

  const handleSend = () => {
    if (!query.trim()) return;
    onAsk(query);
    setQuery("");
  };

  const handleGenerateSummary = async () => {
    if (!onGenerateSummary) return;
    try {
      setSummaryLoading(true);
      const result = await onGenerateSummary(chat._id, persona, job);
      setSummary(result || "No summary generated.");
      setShowSummary(true);
    } catch {
      setSummary("Error generating summary.");
    } finally {
      setSummaryLoading(false);
    }
  };

  return (
    <Card className="flex flex-col flex-1 h-full p-4 space-y-3">
      <ChatHeader title={chat.title} description={chat.description} pdf_url={chat.pdf}/>

      <SummarySection
        persona={persona}
        job={job}
        setPersona={setPersona}
        setJob={setJob}
        handleGenerateSummary={handleGenerateSummary}
        showSummary={showSummary}
        setShowSummary={setShowSummary}
        summary={summary}
        summaryLoading={summaryLoading}
      />

      <QnaList qnas={qnas} loading={loading} error={error} />

      <MessageInput query={query} setQuery={setQuery} handleSend={handleSend} />
    </Card>
  );
}
