export default function QnaItem({ qna }) {
  return (
    <div className="space-y-1">
      <p className="font-semibold">Q: {qna.question}</p>
      <p className="text-muted-foreground">A: {qna.answer}</p>
    </div>
  )
}
