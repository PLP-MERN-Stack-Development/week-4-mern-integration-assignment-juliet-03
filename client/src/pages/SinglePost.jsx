import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentSection from '../components/comments/commentSection';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error('Error fetching post:', err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (!post) return <p>Loading post...</p>;

  return (
    <div className="single-post">
      {post.image && (
        <img
          src={`/uploads/${post.image}`}
          alt={post.title}
          style={{ width: '100%', height: '300px', objectFit: 'cover' }}
        />
      )}
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <CommentSection postId={post._id} />
    </div>
  );
};

export default SinglePost;