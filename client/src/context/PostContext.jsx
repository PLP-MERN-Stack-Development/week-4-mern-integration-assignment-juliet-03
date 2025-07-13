import React, { createContext, useState, useEffect } from 'react';
import {
  fetchPosts, createPost, updatePost, deletePost,
  fetchCategories, createCategory
} from '../services/api';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const postsRes = await fetchPosts();
      const categoriesRes = await fetchCategories();
      setPosts(postsRes.data);
      setCategories(categoriesRes.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load data');
      setLoading(false);
    }
  };

  return (
    <PostContext.Provider value={{
      posts,
      setPosts,
      categories,
      setCategories,
      fetchPosts,       // ✅ exposed now
      createPost,
      updatePost,
      deletePost,
      createCategory,
      loading,
      error
    }}>
      {children}
    </PostContext.Provider>
  );
};
