export default function ExtractedSectionsList({ extractedSections }) {
  if (!extractedSections?.length) return null;

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-800">Extracted Sections</h3>
      <div className="space-y-2">
        {extractedSections.map((sec, idx) => (
          <div
            key={idx}
            className="p-2 border rounded-md bg-white shadow-sm text-sm"
          >
            <p>
              <span className="font-medium">Title:</span> {sec.section_title}
            </p>
            <p>
              <span className="font-medium">Page:</span> {sec.page_number}
            </p>
            <p>
              <span className="font-medium">Importance:</span>{" "}
              {sec.importance_rank}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}