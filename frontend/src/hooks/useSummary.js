import { useState } from "react";
import { get_summary } from "@/api/apiLayer.js"

export function useSummary() {
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSummary = async (chat_id, persona, job) => {
        try {
            setLoading(true);
            const res = await get_summary(chat_id, persona, job);
            setSummary(res.data.summary);
        } catch (err) {
            setError(err.response?.data?.message || "Error fetching summary");
        } finally {
            setLoading(false);
        }
    };

    return { summary, loading, error, fetchSummary };
}