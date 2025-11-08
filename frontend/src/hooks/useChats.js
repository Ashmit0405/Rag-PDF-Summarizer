import { useState, useEffect, useCallback } from "react";
import { gethistory, uploadIngest, deletechat } from "@/api/apiLayer.js";

export function useChats() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChats = useCallback(async () => {
    try {
      setLoading(true);
      const res = await gethistory();
      setChats(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching chats");
    } finally {
      setLoading(false);
    }
  }, []);

  const createChat = useCallback(
    async (title, description, file) => {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("pdf", file);

        const res = await uploadIngest(formData);
        setChats((prev) => [res.data, ...prev]);
        await fetchChats();
        return res.data;
      } catch (err) {
        setError(err.response?.data?.message || "Error creating chat");
      }
    },
    [fetchChats]
  );

  const removeChat = useCallback(
    async (id) => {
      try {
        await deletechat(id);
        setChats((prev) => prev.filter((chat) => chat._id !== id));
        await fetchChats();
      } catch (err) {
        setError(err.response?.data?.message || "Error deleting chat");
      }
    },
    [fetchChats]
  );

  useEffect(() => {
    fetchChats();
    const interval=setInterval(fetchChats,2000);
    return ()=>clearInterval(interval)
  }, [fetchChats]);

  return { chats, loading, error, fetchChats, createChat, removeChat };
}
