import React from 'react';

import { Link } from 'react-router-dom';

function BlogBag({ posts }) {
    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post._id}>
                        <Link to={post._id}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BlogBag;