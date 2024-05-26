import React, {useEffect} from 'react';
import PostSummary from "./PostSummary.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import {useQuery} from 'react-query';
import {fetchByFolder, fetchFolders} from '../data/post.js';
import {usePostContext} from '../Context.jsx';
import {Spinner} from "@patternfly/react-core";
import {fetchPostsByTag} from "../data/tag.js";

const PostArea = ({onPostClick, parentDir, childDir, folderId}) => {

    const { selectedPost } = usePostContext();

    const {data: posts, isLoading, isError, refetch} = useQuery(
        [parentDir, childDir],
        () => {

            // triggered by clicking tags
            if (parentDir === 'tags') {
                return fetchPostsByTag(childDir);
            }

            // triggered by clicking folders
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

    if (isError) return <p>Error fetching posts</p>;

    return (
        <>
            <Breadcrumbs parentDir={parentDir} childDir={childDir}/>
            {isLoading ? (
                <div className="d-flex justify-content-center">
                    <Spinner/>
                </div>
            ) : (
                posts.map(post => (
                    <PostSummary key={post.id} post={post} onPostClick={onPostClick}/>
                ))
            )}
        </>
    );
};

export default PostArea;
