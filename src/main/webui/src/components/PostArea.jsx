import React, {useEffect} from 'react';
import PostSummary from "./PostSummary.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import {useQuery} from 'react-query';
import {fetchByFolder, fetchPosts} from '../data/post.js';
import {useSelectedItemContext} from '../Context.jsx';
import {Spinner} from "@patternfly/react-core";
import {fetchPostsByTag} from "../data/tag.js";

const PostArea = () => {

    const { selectedFolder } = useSelectedItemContext();

    const {data: posts, isLoading, isError, refetch} = useQuery(
        [selectedFolder],
        () => {
            if (selectedFolder.id === 'tags') {
                return fetchPostsByTag(selectedFolder.name)
            }
            else if (selectedFolder.name === 'All') {
                return fetchPosts();
            } else {
                return fetchByFolder(selectedFolder.id);
            }
        });

    if (isError) return <p>Error fetching posts</p>;

    return (
        <>
            <Breadcrumbs postRefetch={refetch}/>
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
