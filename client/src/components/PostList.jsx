// import { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { PostContext } from '../context/PostContext';

// export default function PostList() {
//   const {
//     posts,
//     loading,
//     error,
//     fetchPosts,
//     deletePost,
//     setPosts,
//   } = useContext(PostContext);

//   const navigate = useNavigate();

//   // Fetch posts on component mount
//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this post?')) return;

//     try {
//       await deletePost(id);
//       // Optimistically update UI
//       setPosts((prev) => prev.filter((post) => post._id !== id));
//     } catch (err) {
//       alert('Failed to delete post');
//     }
//   };

//   if (loading) return <p className="text-gray-600">Loading posts...</p>;
//   if (error) return <p className="text-red-500">Error: {error}</p>;

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold mb-4">All Posts</h1>

//       {posts.length === 0 ? (
//         <p className="text-gray-500">No posts available.</p>
//       ) : (
//         posts.map((post) => (
//           <div
//             key={post._id}
//             className="border border-gray-300 p-4 rounded shadow hover:shadow-md transition"
//           >
//             <h2 className="text-xl font-semibold">{post.title}</h2>
//             <p className="text-gray-700 mt-2">{post.content}</p>
//             <p className="text-sm text-blue-600 mt-1">Category: {post.category && post.category.name ? post.category.name : ''}</p>

//             <div className="flex gap-4 mt-3">
//               <button
//                 onClick={() => navigate(`/edit/${post._id}`)}
//                 className="px-4 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(post._id)}
//                 className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import Pagination from '../UI/Pagination';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const postsPerPage = 5;

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/posts');
      setPosts(res.data.reverse()); // Show newest first
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Pagination logic
  const indexOfLast = page * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div>
      {currentPosts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default PostList;