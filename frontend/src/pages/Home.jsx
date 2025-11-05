import Layout from "@/components/Home/Layout"
import ChatWindow from "@/components/Home/ChatWindow"
import { useContext, useState } from "react"
import { useQuery } from "@/hooks/useQuery"
import { useChats } from "@/hooks/useChats"
import { AuthContext } from "@/context/authContext"

export default function Home() {
  const [selectedChat, setSelectedChat] = useState(null)
  const {qnas,askQuery} = useQuery(selectedChat?._id);
  const {chats}=useChats();

  const {user}=useContext(AuthContext);

  return (
    <Layout
      chats={chats}
      onSelectChat={(id) => {
        const chat = chats.find((c) => c._id === id);
        setSelectedChat(chat);
      }}
      user={user}
    >
      <ChatWindow chat={{ ...selectedChat, qnas }} onAsk={askQuery} />
    </Layout>
  )
}
