import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient.js";
import AddPost from "./AddPost.jsx";
import PostList from "./PostList.jsx";
import RegisterForm from "./RegisterForm.jsx";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!user) return <RegisterForm onRegister={setUser} />;

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <AddPost user={user} onPostAdded={fetchPosts} />
      <PostList posts={posts} user={user} refreshPosts={fetchPosts} />
    </div>
  );
}

