import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import UpdatePostForm from "./UpdatePostForm";
import { useNotification } from '../context/NotificationContext';
// const backenUrl = "http://localhost:3000/posts";
const backenUrl = "https://fullstack-blog-be.onrender.com/posts";



function PostDetailsPage() {
    const [post, setPost] = useState(null);
    const { showNotification } = useNotification();
    const { id } = useParams();
    const navigate = useNavigate();





    useEffect(() => {
        axios
            .get(`${backenUrl}/${id}`)
            .then((response) => {
                setPost(response.data);
            })
            .catch((error) => console.error("Error fetching post:", error));
    }, [id]);

    const handleDelete = () => {
        axios
            .delete(`${backenUrl}/${id}`)
            .then(() => {
                navigate("/");
                showNotification('Post deleted successfuly.', 'success');
            })
            .catch((error) => {
                showNotification('Error deleting post.', 'error');
                console.error("Error deleting post:", error)
            });
    };


    const [showEditModal, setEditShowModal] = useState(false);

    if (!post) return <div>Loading...</div>;
    const fullPath = post.cover;

    const baseDir = '/opt/render/project/src/public';

    const relativePath = "https://fullstack-blog-be.onrender.com" + fullPath.replace(baseDir, '');
    return (
        <div className="mx-auto p-4 bg-white shadow-lg rounded-lg">
            <Modal show={showEditModal} onClose={() => setEditShowModal(false)}>
                <h2 className="text-xl font-bold mb-4">Update Post</h2>
                <UpdatePostForm closeModal={() => setEditShowModal(false)} currentPost={post} setCurrentPost={setPost} />
            </Modal>
            <img
                src={relativePath}
                alt={post.title}
                className="w-full max-w-lg mx-auto mb-4 rounded-lg shadow-md"
            />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
            <p className="text-lg text-gray-700 mb-4">{post.content}</p>
            <p className="text-sm text-gray-600 mb-2">Author: {post.author}</p>
            <p className="text-sm text-gray-600">Date: {new Date(post.date).toLocaleDateString()}</p>
            <div className="mt-6 flex space-x-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={() => setEditShowModal(true)}
                >
                    Edit
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default PostDetailsPage;
