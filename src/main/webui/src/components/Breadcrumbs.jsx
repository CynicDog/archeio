import React from 'react';
import ChevronRight from "../../public/ChevronRight.jsx";
import PostAdd from "../../public/PostAdd.jsx";
import {usePostContext} from "../Context.jsx";
import {savePost} from "../data/post.js";

const Breadcrumbs = ({parentDir, childDir, folderId}) => {

    const { selectedPost, setSelectedPost } = usePostContext();

    const handlePostAdd = async () => {

        let updatedPost = await savePost({ postId: -1, content: '# Some awesome title', tags: null, folderId: folderId });

        setSelectedPost(updatedPost);
    }

    return (
        <div className="bg-light-subtle border border-1 rounded-3 p-2">
            <div className="d-flex">
                <span className="text-body-secondary fs-3 fw-lighter">
                    {parentDir === '' ? (
                        <>All</>
                    ) : (
                        <>
                            {parentDir} {' '}
                            {(parentDir !== '') && (childDir !== '') && (
                                <>
                                    <ChevronRight/> {' '}
                                </>
                            )}
                            {childDir} {' '}
                        </>
                    )}
                </span>
                {parentDir !== 'tags' && (
                    <div className="ms-auto btn border border-0 my-1" onClick={handlePostAdd}>
                        <PostAdd />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Breadcrumbs
