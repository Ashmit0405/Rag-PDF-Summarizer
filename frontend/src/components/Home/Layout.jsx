import Sidebar from "./Sidebar";

export default function Layout({ children, chats, onSelectChat }) {
  return (
    <div className="flex h-screen relative">
      <div className="w-64 border-r border-gray-200 bg-white">
        <Sidebar chats={chats} onSelectChat={onSelectChat} />
      </div>

      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
