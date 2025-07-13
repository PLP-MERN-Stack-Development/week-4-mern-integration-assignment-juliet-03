// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useContext } from 'react';
// import { PostContext } from '../context/PostContext';

// // ✅ Validation schema
// const schema = yup.object().shape({
//   title: yup.string().required("Title is required"),
//   content: yup.string().required("Content is required"),
//   category: yup.string().required("Category is required"),
// });

// export default function PostForm({ editData, onSuccess }) {
//   const { createPost, updatePost, setPosts, posts } = useContext(PostContext);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting }
//   } = useForm({
//     defaultValues: editData || { title: "", content: "", category: "" },
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data) => {
//     try {
//       if (editData) {
//         const res = await updatePost(editData._id, data);
//         setPosts(posts.map(p => p._id === editData._id ? res.data : p));
//       } else {
//         const res = await createPost(data);
//         setPosts([res.data, ...posts]); // ✅ Optimistic update
//       }

//       reset();
//       onSuccess?.(); // Optional: close modal, redirect etc.

//     } catch (err) {
//       alert("❌ Failed to save post");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded-md max-w-xl mx-auto">
//       <h2 className="text-xl font-bold">{editData ? "Edit Post" : "Create New Post"}</h2>

//       <input
//         placeholder="Title"
//         {...register('title')}
//         className="w-full p-2 border rounded"
//       />
//       {errors.title && <p className="text-red-500">{errors.title.message}</p>}

//       <textarea
//         placeholder="Content"
//         {...register('content')}
//         rows="5"
//         className="w-full p-2 border rounded"
//       />
//       {errors.content && <p className="text-red-500">{errors.content.message}</p>}

//       <input
//         placeholder="Category"
//         {...register('category')}
//         className="w-full p-2 border rounded"
//       />
//       {errors.category && <p className="text-red-500">{errors.category.message}</p>}

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         {isSubmitting ? "Saving..." : editData ? "Update Post" : "Create Post"}
//       </button>
//     </form>
//   );
// }

import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PostForm = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    content: '',
    image: null,
  });

  const fetchPost = async () => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
      setForm({
        title: res.data.title,
        content: res.data.content,
        image: null,
      });
    } catch (err) {
      console.error('Failed to fetch post:', err);
    }
  };

  useEffect(() => {
    if (id) fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', form.title);
    data.append('content', form.content);
    if (form.image) data.append('image', form.image);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      if (id) {
        await axios.put(`/api/posts/${id}`, data, config);
      } else {
        await axios.post('/api/posts', data, config);
      }

      navigate('/');
    } catch (err) {
      console.error('Error submitting post:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? 'Edit Post' : 'Create Post'}</h2>
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Post Title"
        required
      />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Post Content"
        rows="5"
        required
      ></textarea>
      <input type="file" name="image" onChange={handleChange} accept="image/*" />
      <button type="submit">{id ? 'Update' : 'Create'} Post</button>
    </form>
  );
};

export default PostForm;