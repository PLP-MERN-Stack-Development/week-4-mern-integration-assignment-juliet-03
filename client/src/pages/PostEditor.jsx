import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';
import PostForm from '../components/PostForm';

export default function PostEditor() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const api = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) api.get(`/posts/${id}`).then(setPost);
  }, [id]);

  const handleSubmit = async (data) => {
    if (id) {
      await api.put(`/posts/${id}`, data);
    } else {
      await api.post('/posts', data);
    }
    navigate('/');
  };

  return <PostForm onSubmit={handleSubmit} initialData={post} />;
}