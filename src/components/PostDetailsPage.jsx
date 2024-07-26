import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import UpdatePostForm from "./UpdatePostForm";

function PostDetailsPage() {
    const [post, setPost] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedContent, setEditedContent] = useState("");



    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/posts/${id}`)
            .then((response) => {
                setPost(response.data);
                setEditedTitle(response.data.title);
                setEditedContent(response.data.content);
            })
            .catch((error) => console.error("Error fetching post:", error));
    }, [id]);

    const handleDelete = () => {
        axios
            .delete(`http://localhost:3000/posts/${id}`)
            .then(() => navigate("/"))
            .catch((error) => console.error("Error deleting post:", error));
    };


    const [showEditModal, setEditShowModal] = useState(false);

    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <Modal show={showEditModal} onClose={() => setEditShowModal(false)}>
                <h2 className="text-xl font-bold mb-4">Update Post</h2>
                <UpdatePostForm closeModal={() => setEditShowModal(false)} currentPost={post} setCurrentPost={setPost} />
            </Modal>
            <h1>{post.title}</h1>
            <img
                src={post.cover}
                alt={post.title}
                style={{ maxWidth: "400px" }}
            />
            <p>{post.content}</p>
            <p>Author: {post.author}</p>
            <p>Date: {new Date(post.date).toLocaleDateString()}</p>
            <button className="btn btn-primary mr-5" onClick={() => setEditShowModal(true)}>Edit</button>
            <button className="btn btn-error" onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default PostDetailsPage;
