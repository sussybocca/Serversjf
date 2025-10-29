import { supabase } from "./supabaseClient.js";
import { useState } from "react";

export default function AddComment({ user, postId, onCommentAdded }) {
  const [content, setContent] = useState("");

  const handleComment = async () => {
    if (!user.two_step_enabled) {
      alert("Enable 2-step verification first!");
      return;
    }
    const { data, error } = await supabase.from("comments").insert([{ user_id: user.id, post_id: postId, content }]);
    if (error) return alert("Error adding comment");
    setContent("");
    onCommentAdded();
  };

  return (
    <div>
      <input placeholder="Comment..." value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={handleComment}>Comment</button>
    </div>
  );
}

