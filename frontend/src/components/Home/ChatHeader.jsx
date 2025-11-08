export default function ChatHeader({ title, description, pdf_url }) {
  return (
    <div>
      <h1 className="font-extrabold text-xl">{title}</h1>
      {description ? (
        <p className="font-semibold text-gray-700">Description: {description}</p>
      ) : (
        <p className="font-semibold text-gray-500">No Description</p>
      )}

      {pdf_url && (
        <a
          href={pdf_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm font-medium"
        >
          View PDF
        </a>
      )}
    </div>
  );
}
