import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newText, setNewText] = useState('');
  const { user } = useContext(AuthContext);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/comments/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newText.trim()) return;

    try {
      await axios.post(
        `/api/comments/${postId}`,
        { text: newText },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setNewText('');
      fetchComments();
    } catch (err) {
      console.error('Failed to post comment:', err);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      {comments.map((c) => (
        <div key={c._id}>
          <strong>{c.username}</strong>
          <p>{c.text}</p>
        </div>
      ))}

      {user ? (
        <form onSubmit={handleSubmit}>
          <textarea
            rows="3"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Write a comment..."
            required
          />
          <button type="submit">Post Comment</button>
        </form>
      ) : (
        <p>You must be logged in to comment.</p>
      )}
    </div>
  );
};

export default CommentSection;