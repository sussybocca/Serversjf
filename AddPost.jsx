import { supabase } from "./supabaseClient.js";
import { useState } from "react";

export default function AddPost({ user, onPostAdded }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePost = async () => {
    if (!user.two_step_enabled) {
      alert("Enable 2-step verification first!");
      return;
    }
    const { data, error } = await supabase.from("posts").insert([{ user_id: user.id, title, content }]);
    if (error) return alert("Error posting");
    setTitle(""); setContent("");
    onPostAdded();
  };

  return (
    <div>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={handlePost}>Post</button>
    </div>
  );
}

