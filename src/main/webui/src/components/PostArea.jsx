import React, {useEffect} from 'react';
import PostSummary from "./PostSummary.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import {useQuery} from 'react-query';
import {fetchByFolder, fetchFolders} from '../data/post.js';
import {useSelectedItemContext} from '../Context.jsx';
import {Spinner} from "@patternfly/react-core";

const PostArea = () => {

    const { selectedPost, selectedFolder } = useSelectedItemContext();

    const {data: posts, isLoading, isError, refetch} = useQuery(
        [selectedFolder],
        () => {

            // TODO
            /*// triggered by clicking tags
            if (parentDir === 'tags') {
                return fetchPostsByTag(childDir);
            }*/

            // triggered by clicking folders
            if (selectedFolder.id === 'folder-0') {
                return fetchFolders();
            } else {
                return fetchByFolder(selectedFolder.id);
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
            <Breadcrumbs />
            {isLoading ? (
                <div className="d-flex justify-content-center">
                    <Spinner/>
                </div>
            ) : (
                posts.map(post => (
                    <PostSummary key={post.id} post={post} />
                ))
            )}
        </>
    );
};

export default PostArea;
