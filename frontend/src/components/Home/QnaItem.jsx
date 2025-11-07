export default function QnaItem({ qna }) {
  const isCustomer = qna.role === "customer";

  return (
    <div
      className={`flex ${
        isCustomer ? "justify-end" : "justify-start"
      } w-full`}
    >
      <div
        className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-sm ${
          isCustomer
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-900 rounded-bl-none"
        }`}
      >
        <p className="whitespace-pre-wrap text-sm">{qna.content}</p>
      </div>
    </div>
  );
}
