export default function PostView({ post }) {
  return (
    <div className="post-view">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}