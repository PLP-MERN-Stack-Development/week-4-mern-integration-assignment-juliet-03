import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);

  const fetchMyPosts = async () => {
    try {
      const res = await axios.get('/api/posts', {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      // Optional: filter posts by user if backend doesn’t already
      const filtered = res.data.filter(post => post.author === user.id);
      setMyPosts(filtered);
    } catch (err) {
      console.error('Failed to fetch user posts:', err);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchMyPosts();
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMyPosts(myPosts.filter(post => post._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div>
      <h2>📋 My Posts</h2>
      {myPosts.length === 0 && <p>No posts found.</p>}
      {myPosts.map(post => (
        <div key={post._id} className="post-card">
          <h3>{post.title}</h3>
          <Link to={`/edit/${post._id}`}>✏️ Edit</Link>
          <button onClick={() => handleDelete(post._id)}>🗑 Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;