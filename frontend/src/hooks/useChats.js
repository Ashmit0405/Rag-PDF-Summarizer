import { useState, useEffect } from "react";
import {gethistory,uploadIngest,deletechat} from "@/api/apiLayer.js"

export function useChats() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChats = async () => {
    try {
      setLoading(true);
      const res = await gethistory();
      setChats(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching chats");
    } finally {
      setLoading(false);
    }
  };

  const createChat = async (title, description, file) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("pdf", file);

      const res = await uploadIngest(formData);
      setChats((prev) => [res.data, ...prev]);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error creating chat");
    }
  };

  const removeChat = async (id) => {
    try {
      await deletechat(id);
      setChats((prev) => prev.filter((chat) => chat._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting chat");
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return { chats, loading, error, fetchChats, createChat, removeChat };
}
