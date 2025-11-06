import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import QnaItem from "./QnaItem.jsx";

export default function ChatWindow({ chat, qnas, onAsk, loading, error }) {
  const [query, setQuery] = useState("");

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

  return (
    <Card className="flex flex-col flex-1 h-full p-4">
      <h1 className="font-extrabold ">{chat.title}</h1>
      {chat.description.length>0?<p className="font-semibold">Description: {chat.description}</p>:<p className="font-semibold">No Description</p>}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3">
        {loading ? (
          <div className="text-gray-500 text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : qnas && qnas.length > 0 ? (
          qnas.map((qna, i) => <QnaItem key={i} qna={qna} />)
        ) : (
          <div className="text-gray-500 text-center">No Q&As yet.</div>
        )}
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Ask something..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSend} disabled={!query.trim()}>
          Send
        </Button>
      </div>
    </Card>
  );
}
