import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useOutletContext } from "react-router-dom";
import Blog from "./Blog";
import Modal from "./Modal";
import AddPostForm from "./AddPostForm";


function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:3000/posts")
            .then((response) => {
                console.log(response.data)
                setPosts(response.data)
            })
            .catch((error) => console.error("Error fetching posts:", error));
    }, []);

    const { showAddModal, setAddShowModal } = useOutletContext();

    return (
        <>
            <Modal show={showAddModal} onClose={() => setAddShowModal(false)}>
                <h2 className="text-xl font-bold mb-4">Add Post</h2>
                <AddPostForm closeModal={() => setAddShowModal(false)} setPosts={setPosts} />
            </Modal>
            <ul className="posts pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {posts.map((post, index) => (
                    <Blog key={index} post={post} />
                ))}
            </ul>
        </>
    );
}

export default Home;
