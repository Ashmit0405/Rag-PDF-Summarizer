import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function QnaItem({ qna }) {
  const isCustomer = qna.role === "customer";
  let parsed = null;

  try {
    if (typeof qna.content === "string" && qna.content.trim().startsWith("{")) {
      parsed = JSON.parse(qna.content);
    } else if (typeof qna.content === "object" && qna.content.answer) {
      parsed = qna.content;
    }
  } catch {
    parsed = null;
  }

  return (
    <div
      className={`flex ${isCustomer ? "justify-end" : "justify-start"} w-full mb-4`}
    >
      <Card
        className={`max-w-[75%] ${
          isCustomer
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-100 text-gray-900 rounded-bl-none"
        } shadow-md`}
      >
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            {isCustomer ? "You" : "Assistant"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {parsed ? (
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium">Answer:</p>
                <p className="whitespace-pre-wrap">{parsed.answer}</p>
              </div>

              {parsed.rationale && (
                <div>
                  <Separator className={`${isCustomer ? "bg-white/30" : "bg-gray-300"} my-2`} />
                  <p className="font-medium">Rationale:</p>
                  <p className="opacity-90 whitespace-pre-wrap">
                    {parsed.rationale}
                  </p>
                </div>
              )}

              {parsed.chunks_used?.length > 0 && (
                <Accordion type="single" collapsible className="mt-2">
                  <AccordionItem value="sources">
                    <AccordionTrigger className="text-xs underline opacity-80 text-white">
                      View {parsed.chunks_used.length} Source Chunks
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 mt-2">
                        {parsed.chunks_used.map((chunk, i) => (
                          <Card
                            key={chunk.id || i}
                            className={`p-2 ${
                              isCustomer ? "bg-blue-500/20" : "bg-gray-50"
                            }`}
                          >
                            <p className="text-xs whitespace-pre-line">
                              {chunk.text.slice(0, 250)}
                              {chunk.text.length > 250 && "..."}
                            </p>
                            <div className="flex justify-between text-[10px] mt-1 opacity-80">
                              <Badge variant="outline">Page {chunk.page_number}</Badge>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </div>
          ) : (
            <p className="whitespace-pre-wrap text-sm">{qna.content}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}