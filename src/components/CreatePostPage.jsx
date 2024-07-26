import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePostPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [cover, setCover] = useState("");
    const navigate = useNavigate();
    const backenUrl = "http://localhost:3000/posts";

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !content || !author || !cover) {
            alert("Please fill in all fields");
            return;
        }
        axios
            .post(backenUrl, { title, content, author, cover })
            .then(() => {
                navigate("/");
            })
            .catch((error) => console.error("Error creating post:", error));
    };

    return (
        <div>
            <h1>Create New Post</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <input type="text" placeholder="Cover Image URL" value={cover} onChange={(e) => setCover(e.target.value)} />
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
}

export default CreatePostPage;
