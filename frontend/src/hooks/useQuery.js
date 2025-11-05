import { useState } from "react";
import { getchats,sendquery } from "@/api/apiLayer.js";

export function useQuery(chat_id) {
  const [qnas, setQnas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQnas = async () => {
    if (!chat_id) return;
    try {
      setLoading(true);
      const res = await getchats(chat_id);
      setQnas(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching QNAs");
    } finally {
      setLoading(false);
    }
  };

  const askQuery = async (query) => {
    try {
      setLoading(true);
      const res = await sendquery(chat_id, query);
      setQnas((prev) => [
        ...prev,
        { question: query, answer: res.data.answer },
      ]);
    } catch (err) {
      setError(err.response?.data?.message || "Error resolving query");
    } finally {
      setLoading(false);
    }
  };

  return { qnas, loading, error, fetchQnas, askQuery };
}
