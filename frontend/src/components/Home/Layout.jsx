import Sidebar from "./Sidebar"
import ProfileCard from "./ProfileCard"

export default function Layout({ children, chats, onSelectChat }) {
  return (
    <div className="flex h-screen">
      <Sidebar chats={chats} onSelectChat={onSelectChat} />
      <div className="flex-1 relative flex flex-col">
        <div className="absolute top-4 right-4">
          <ProfileCard/>
        </div>
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  )
}
