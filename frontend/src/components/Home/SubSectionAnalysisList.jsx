export default function SubSectionAnalysisList({ subSectionAnalysis }) {
  if (!subSectionAnalysis?.length) return null;

  return (
    <div className="space-y-2 mt-4">
      <h3 className="font-semibold text-gray-800">Sub-section Analysis</h3>
      <div className="space-y-2">
        {subSectionAnalysis.map((sub, idx) => (
          <div
            key={idx}
            className="p-2 border rounded-md bg-white shadow-sm text-sm"
          >
            <p>
              <span className="font-medium">Page:</span> {sub.page_number}
            </p>
            <p className="mt-1 text-gray-700 whitespace-pre-wrap">
              <span className="font-medium">Refined Text:</span> {sub.refined_text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}