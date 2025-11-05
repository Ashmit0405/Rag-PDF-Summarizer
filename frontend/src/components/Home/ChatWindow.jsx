import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import QnaItem from "./QnaItem.jsx"

export default function ChatWindow({ chat, onAsk }) {
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
      <div className="flex-1 overflow-y-auto mb-4 space-y-3">
        {chat.qnas.map((qna, i) => (
          <QnaItem key={i} qna={qna} />
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Ask something..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </Card>
  );
}

