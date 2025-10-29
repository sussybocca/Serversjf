import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient.js";

export default function CommentList({ postId }) {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const { data } = await supabase.from("comments").select("*").eq("post_id", postId);
    setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div style={{ marginLeft: 20 }}>
      {comments.map(c => <p key={c.id}><strong>{c.user_id}:</strong> {c.content}</p>)}
    </div>
  );
}

