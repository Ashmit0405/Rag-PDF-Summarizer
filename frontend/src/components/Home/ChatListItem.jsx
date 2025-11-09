import { Button } from "@/components/ui/button"
import { X } from "lucide-react";

export default function ChatListItem({ chat, onSelectChat, ondeleleChat }) {
  return (
    <div className="flex items-center justify-between w-full gap-3">
      <Button
        className="flex-1 justify-start text-left px-4 py-2 text-white"
        onClick={() => onSelectChat(chat._id)}
      >
        {chat.title}
      </Button>
      <Button
        size="icon"
        className="text-red-500 hover:text-red-600"
        onClick={(e) => {
          e.stopPropagation();
          ondeleleChat(chat._id);
        }}
      >
        <X size={16} />
      </Button>
    </div>
  )
}
