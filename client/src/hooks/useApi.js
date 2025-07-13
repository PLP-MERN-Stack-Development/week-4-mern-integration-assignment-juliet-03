// import axios from 'axios';

// const useApi = () => {
//   const instance = axios.create({
//     baseURL: '/api', // proxy handles this
//   });

//   return {
//     get: (url) => instance.get(url).then(res => res.data),
//     post: (url, data) => instance.post(url, data).then(res => res.data),
//     put: (url, data) => instance.put(url, data).then(res => res.data),
//     delete: (url) => instance.delete(url).then(res => res.data),
//   };
// };

// export default useApi;

import axios from 'axios';

const useApi = () => {
  // Get token from localStorage (or any secure place you store it)
  const token = localStorage.getItem('token');

  const instance = axios.create({
    baseURL: '/api',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  // Generic requests
  const get = (url) => instance.get(url).then(res => res.data);
  const post = (url, data) => instance.post(url, data).then(res => res.data);
  const put = (url, data) => instance.put(url, data).then(res => res.data);
  const del = (url) => instance.delete(url).then(res => res.data);

  // For file/image upload
  const upload = (url, fileData) => {
    const formData = new FormData();
    for (let key in fileData) {
      formData.append(key, fileData[key]);
    }

    return instance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token ? `Bearer ${token}` : '',
      },
    }).then(res => res.data);
  };

  return { get, post, put, delete: del, upload };
};

export default useApi;