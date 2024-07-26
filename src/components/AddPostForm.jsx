import { useState } from "react";
import axios from "axios";
import { useNotification } from '../context/NotificationContext';

const AddPostForm = ({ fetchPosts, closeModal, setMessage, currentPost }) => {
  const { showNotification } = useNotification();
  const [post, setPost] = useState(currentPost ? currentPost :
    {
      title: '',
      content: '',
      author: '',
      cover: null,
    });
  const backenUrl = "https://fullstack-blog-be.onrender.com/posts";
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (event) => {  //function to update every the Post state, updating the field that changes
    const { name, value, files } = event.target;
    if (name === 'cover') {
      const selectedFile = files[0];
      if (selectedFile && selectedFile.size < 2000000) { // Check file size (e.g., < 2MB)
        setPost(prevState => ({
          ...prevState,
          cover: selectedFile
        }));

      } else {
        setErrorMessage('File is too large or not selected');
      }
    }
    else {
      setPost(previousPost => (
        {
          ...previousPost,
          [name]: value
        }
      ));
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('cover', post.cover);
    formData.append('title', post.title);
    formData.append('content', post.content);
    formData.append('author', post.author);

    axios.post(backenUrl, formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      })
      .then(() => {
        closeModal();
        setPost({ title: '', content: '', author: '', cover: '' });
        fetchPosts();
        showNotification('Operation was successful!', 'success');
      })
      .catch((error) => console.error("Error creating post:", error));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input type="text" value={post.title} onChange={handleInputChange} name="title"
          className="mt-1 bg-white block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        <label className="block   text-sm font-medium text-gray-700">Author</label>
        <input type="text" value={post.author} onChange={handleInputChange} name="author"
          className="mt-1 bg-white block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">content</label>
        <textarea
          name="content"
          value={post.content}
          onChange={handleInputChange}
          className="mt-1 bg-white  block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
          placeholder="Content"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Cover</label>
        <input
          type="file"
          name="cover"
          onChange={handleInputChange}
          className="mt-1 block bg-white w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
      <button type="submit" className="btn btn-outline btn-info text-white" >
        Add Post
      </button>

    </form>
  );
};


export default AddPostForm;