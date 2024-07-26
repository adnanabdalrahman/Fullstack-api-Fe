import { Link, useOutletContext } from 'react-router-dom';

const Navbar = ({ setAddShowModal }) => {

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg"> 
                    <button className="btn btn-outline btn-info text-white">
                    Blogs
                    </button>
                </Link>
                <div className="text-white text-lg font-bold"> <h1>Welcome to our Fullstack-Blog-App</h1> </div>
                <div className="flex space-x-4">
                    <button className="btn btn-outline btn-info text-white" onClick={() => setAddShowModal(() => true)}>Add Post</button>
                </div>
            </div>
        </nav >
    );
};


export default Navbar;