export const DB_NAME="RAG_PDF"

export const options={
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
}