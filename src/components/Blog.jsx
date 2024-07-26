import { Link } from "react-router-dom";
import path from 'path';

const Blog = ({ index, post }) => {

    const relativePath = path.relative('/opt/render/project/src/public', post.cover);

    console.log('post', post);
    return (
        <li className="card flex flex-col border border-gray-300 rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 flex flex-col gap-4">


                <img src={relativePath} alt="Cover image" className="w-full h-48 object-cover" />
                <time dateTime={post.date} className="text-gray-500 text-sm">
                    {new Date(post.date).toLocaleDateString()}
                </time>
                <h2 className="text-xl font-semibold text-gray-900">
                    {post.title}
                </h2>

                <h3 className="text-lg text-gray-700">
                    By {post.author}
                </h3>
                <p className="text-gray-800">
                    {post.content}
                </p>
                <div className="pt-4">
                    <Link to={`/post/${post.id}`} className="text-blue-500 hover:underline">
                        Read more
                    </Link>
                </div>
            </div>
        </li>
    );
};

export default Blog; 