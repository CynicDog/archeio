import React from 'react';
import PostSummary from "./PostSummary.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import { useQuery } from 'react-query';
import { fetchByFolder, fetchFolders } from '../data/post.js';

const PostArea = ({ onPostClick, parentDir, childDir, folderId }) => {
    const { data: posts, isLoading, isError } = useQuery(
        ['posts', folderId],
        () => {
            if (folderId === 'folder-0') {
                return fetchFolders();
            } else {
                return fetchByFolder(folderId);
            }
        });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching posts</p>;

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
