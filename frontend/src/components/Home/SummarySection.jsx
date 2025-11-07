import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import ExtractedSectionsList from "./ExtractedSectionsList.jsx";
import SubSectionAnalysisList from "./SubSectionAnalysisList.jsx";

export default function SummarySection({
  persona,
  job,
  setPersona,
  setJob,
  handleGenerateSummary,
  showSummary,
  setShowSummary,
  summary,
  summaryLoading,
}) {
  const hasSummaryData =
    summary &&
    (summary.extracted_sections?.length || summary.sub_section_analysis?.length);

  return (
    <div className="p-3 rounded-md border space-y-2">
      <div className="flex flex-col md:flex-row gap-2">
        <Input
          placeholder="Enter persona (e.g., Teacher, Student, Analyst)"
          value={persona}
          onChange={(e) => setPersona(e.target.value)}
        />
        <Input
          placeholder="Enter job context (e.g., For Report, For Presentation)"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between">
        <Button
          onClick={handleGenerateSummary}
          disabled={summaryLoading || !persona || !job}
        >
          {summaryLoading ? "Generating..." : "Generate Summary"}
        </Button>

        <Button
          onClick={() => setShowSummary(!showSummary)}
          className="flex items-center gap-1"
        >
          {showSummary ? (
            <>
              Hide Summary <ChevronUp size={16} />
            </>
          ) : (
            <>
              Show Summary <ChevronDown size={16} />
            </>
          )}
        </Button>
      </div>

      {showSummary && (
        <div className="bg-gray-50 p-3 rounded-md border mt-2">
          {summaryLoading ? (
            <p className="text-gray-500 text-center">Loading summary...</p>
          ) : hasSummaryData ? (
            <>
              <ExtractedSectionsList
                extractedSections={summary.extracted_sections}
              />
              <SubSectionAnalysisList
                subSectionAnalysis={summary.sub_section_analysis}
              />
            </>
          ) : (
            <p className="text-gray-500 text-center">No summary data found.</p>
          )}
        </div>
      )}
    </div>
  );
}