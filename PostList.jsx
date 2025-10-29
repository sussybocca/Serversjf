import AddComment from "./AddComment.jsx";
import CommentList from "./CommentList.jsx";

export default function PostList({ posts, user, refreshPosts }) {
  return (
    <div>
      {posts.map(post => (
        <div key={post.id} style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <CommentList postId={post.id} />
          <AddComment user={user} postId={post.id} onCommentAdded={refreshPosts} />
        </div>
      ))}
    </div>
  );
}

