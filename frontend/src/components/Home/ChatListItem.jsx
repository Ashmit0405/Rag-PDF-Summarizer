import { Button } from "@/components/ui/button"

export default function ChatListItem({ chat, onSelectChat }) {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start px-4 py-2 text-left text-white"
      onClick={() => onSelectChat(chat.id)}
    >
      {chat.title}
    </Button>
  )
}
