import React, { useEffect } from 'react';
import PostSummary from "./PostSummary.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import { useQuery } from 'react-query';
import { fetchByFolder, fetchFolders } from '../data/post.js';
import { usePostContext } from '../Context.jsx';

const PostArea = ({ onPostClick, parentDir, childDir, folderId }) => {

    const { selectedPost } = usePostContext();

    const { data: posts, isLoading, isError, refetch } = useQuery(
        ['posts', folderId],
        () => {
            if (folderId === 'folder-0') {
                return fetchFolders();
            } else {
                return fetchByFolder(folderId);
            }
        });

    useEffect(() => {
        if (selectedPost) {
            refetch();
        }
    }, [selectedPost, refetch]);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching posts</p>;

    return (
        <>
            <Breadcrumbs parentDir={parentDir} childDir={childDir} />
            {posts.map(post => (
                <PostSummary key={post.id} post={post} onPostClick={onPostClick} />
            ))}
        </>
    );
};

export default PostArea;
