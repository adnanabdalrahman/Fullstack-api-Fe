import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNotification } from '../context/NotificationContext';

// const backenUrl = "http://localhost:3000/posts";
const backenUrl = "https://fullstack-blog-be.onrender.com";



const UpdatePostForm = ({ closeModal, currentPost, setCurrentPost }) => {
    const [post, setPost] = useState(currentPost);
    const { id } = useParams();
    const { showNotification } = useNotification();

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
                showNotification('File is too large or not selected.', 'error');
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


    const handleUpdate = (e) => {
        e.preventDefault();
        console.log('post', post);
        axios.put(`${backenUrl}/${id}`, post)
            .then((response) => {
                console.log('response', response.data);
                setCurrentPost(response.data.post);
                closeModal();
                showNotification('File updated successfully.', 'success');
            })
            .catch((error) => {
                showNotification('Error updating post.', 'error');
                console.error("Error updating post:", error)
            });
    };


    return (
        <form onSubmit={handleUpdate} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" value={post.title} onChange={handleInputChange} name="title"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                <label className="block text-sm font-medium text-gray-700">Author</label>
                <input type="text" value={post.author} onChange={handleInputChange} name="author"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">content</label>
                <textarea
                    name="content"
                    value={post.content}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <button type="submit" className="bg-teal-900 text-white px-4 py-2 rounded">
                Update Post
            </button>
        </form>
    );
};


export default UpdatePostForm;