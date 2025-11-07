import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MessageInput({ query, setQuery, handleSend }) {
  return (
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
  );
}
