import React from 'react';
import PostSummary from "./PostSummary.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";

const PostArea = ({ onPostClick, parentDir, childDir }) => {
    const posts = [
        { id: 1, title: "Post 1" },
        { id: 2, title: "Post 2" },
        { id: 3, title: "Post 3" },
        { id: 4, title: "Post 4" },
        { id: 5, title: "Post 5" }
    ];

    return (
        <>
            <Breadcrumbs parentDir={parentDir} childDir={childDir} />
            {posts.map(post => (
                <PostSummary key={post.id} post={post} onClick={() => onPostClick(post)} />
            ))}
        </>
    );
};

export default PostArea;
