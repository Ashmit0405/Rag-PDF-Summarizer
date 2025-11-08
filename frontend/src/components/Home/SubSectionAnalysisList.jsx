import { Card,CardContent } from "../ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Badge } from "../ui/badge";

export default function SubSectionAnalysisList({ subSectionAnalysis }) {
  if (!subSectionAnalysis?.length) return null;

  return (
    <div className="space-y-3 mt-6">
      <h3 className="font-semibold text-gray-800 text-lg">Sub-section Analysis</h3>
      <div className="space-y-3">
        {subSectionAnalysis.map((sub, idx) => (
          <Card key={idx} className="shadow-sm border">
            <CardContent className="text-sm space-y-2 py-3">
              <p>
                <Badge variant="secondary">Page {sub.page_number}</Badge>
              </p>
              <Separator />
              <p className="text-gray-700 whitespace-pre-wrap">
                <span className="font-medium">Refined Text:</span> {sub.refined_text}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}