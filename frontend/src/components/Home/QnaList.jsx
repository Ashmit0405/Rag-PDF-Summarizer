import QnaItem from "./QnaItem.jsx";

export default function QnaList({ qnas, loading, error }) {
  return (
    <div className="flex-1 overflow-y-auto mb-4 space-y-3">
      {loading ? (
        <div className="text-gray-500 text-center">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : qnas && qnas.length > 0 ? (
        qnas.map((qna, i) => <QnaItem key={i} qna={qna} />)
      ) : (
        <div className="text-gray-500 text-center">No Q&As yet.</div>
      )}
    </div>
  );
}
