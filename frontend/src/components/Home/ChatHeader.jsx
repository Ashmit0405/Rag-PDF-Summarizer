export default function ChatHeader({ title, description }) {
  return (
    <div>
      <h1 className="font-extrabold text-xl">{title}</h1>
      {description ? (
        <p className="font-semibold text-gray-700">Description: {description}</p>
      ) : (
        <p className="font-semibold text-gray-500">No Description</p>
      )}
    </div>
  );
}
