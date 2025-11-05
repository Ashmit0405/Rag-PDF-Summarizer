import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import NewChatForm from "./NewChatForm"
import ChatListItem from "./ChatListItem.jsx"
import { useChats } from "@/hooks/useChats"

export default function Sidebar({ chats, onSelectChat }) {

  const {createChat}=useChats();

  const handleCreate=async(title,description,file)=>{
    try {
      await createChat(title,description,file);
    } catch (error) {
      console.log("Error creating the chat");
    }
  }

  return (
    <Card className="w-64 h-screen flex flex-col border-r">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Chats</h2>
        <NewChatForm handleCreate={handleCreate}/>
      </div>
      <ScrollArea className="flex-1">
        {chats.map((chat) => (
          <ChatListItem key={chat.id} chat={chat} onSelectChat={onSelectChat} />
        ))}
      </ScrollArea>
    </Card>
  )
}
