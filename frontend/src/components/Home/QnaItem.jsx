export default function QnaItem({ qna }) {
  return (
    <div className="space-y-1">
      <p className={qna.role==="customer"?"font-extrabold":"font-medium"}>{qna.content}</p>
    </div>
  )
}
