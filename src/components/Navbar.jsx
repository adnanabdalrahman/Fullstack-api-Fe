import { Link, useOutletContext } from 'react-router-dom';

const Navbar = ({ setAddShowModal }) => {

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="btn btn-outline btn-info text-white">
                    Blogs
                </Link>
                <div className="flex-grow text-center">
                    <h1 className="text-2xl font-bold text-white">Welcome to our Full-Stack-Blog</h1>
                </div>
                <button className="btn btn-outline btn-info text-white" onClick={() => setAddShowModal(() => true)}>
                    Add Post
                </button>
            </div>
        </nav >
    );
};


export default Navbar;