import React from 'react';
import moment from 'moment';
import {useAuth, useSelectedItemContext} from '../Context.jsx';
import ThreeDots from "../../public/ThreeDots.jsx";
import Trash from "../../public/Trash.jsx";
import Pin from "../../public/Pin.jsx";
import Archive from "../../public/Archive.jsx";
import { deletePost } from "../data/post.js";
import {useQueryClient} from "react-query";

const PostSummary = ({ post }) => {

    const queryClient = useQueryClient();

    const { selectedPost, setSelectedPost } = useSelectedItemContext();
    const { githubAuthenticated } = useAuth();

    const handlePostClick = () => {
        if (selectedPost && selectedPost.id === post.id) {
            setSelectedPost(null); // Deselect the post if it is clicked again
        } else {
            setSelectedPost(post); // Select the new post
        }
    };

    const handleMenuClick = (event) => {
        event.stopPropagation();
    };

    const HandlePostDelete = async () => {
        await deletePost(selectedPost.id);
        setSelectedPost(null);
        await queryClient.invalidateQueries('tags');
    };

    const title = post.content.split('\n')[0];

    return (
        <div className="s-card my-3">
            <div className="s-post-summary" onClick={handlePostClick}>
                <div className="s-post-summary--stats">
                    <div className="s-post-summary--stats-item s-post-summary--stats-item__emphasized">
                        <span className="s-post-summary--stats-item-number">{post.votes}</span>
                        <span className="s-post-summary--stats-item-unit">votes</span>
                    </div>
                    <div className="s-post-summary--stats-item has-answers has-accepted-answer">
                        <svg aria-hidden="true" className="svg-icon iconCheckmarkSm" width="14" height="14"
                             viewBox="0 0 14 14">
                            <path d="M13 3.41 11.59 2 5 8.59 2.41 6 1 7.41l4 4z"></path>
                        </svg>
                        <span className="s-post-summary--stats-item-number">5</span>
                        <span className="s-post-summary--stats-item-unit">answers</span>
                    </div>
                    <div className="s-post-summary--stats-item is-supernova">
                        <span className="s-post-summary--stats-item-number">{post.views}</span>
                        <span className="s-post-summary--stats-item-unit">views</span>
                    </div>
                </div>
                <div className="s-post-summary--content">
                    <div>
                        <h3 className="s-post-summary--content-title">
                            <a className="text-secondary link-dark link-underline-opacity-0">
                                {title}
                            </a>
                        </h3>
                        <p className="s-post-summary--content-excerpt v-truncate3">
                            {post.content}
                        </p>
                        <div className="s-post-summary--meta">
                            <div className="s-post-summary--meta-tags">
                                {post.tags.map(tag => (
                                    <a key={tag.name} className="s-tag" href="#">{tag.name}</a>
                                ))}
                            </div>
                            <div className="s-user-card s-user-card__minimal">
                                <time className="s-user-card--time">{moment(post.timestamp).fromNow()}</time>
                            </div>
                        </div>
                    </div>
                    {githubAuthenticated && (
                        <div onClick={handleMenuClick}>
                            <div data-controller="s-modal" data-s-modal-return-element="#js-return-focus">
                                <button
                                    className="btn border border-0 s-post-summary--content-menu-button"
                                    type="button"
                                    id="js-return-focus"
                                    data-action="s-modal#show">
                                    <ThreeDots />
                                </button>
                                <aside
                                    className="s-modal"
                                    data-s-modal-target="modal"
                                    id="modal-base"
                                    tabIndex="-1"
                                    role="dialog"
                                    aria-labelledby="modal-title"
                                    aria-describedby="modal-description"
                                    aria-hidden="true">
                                    <div className="s-modal--dialog" role="document">
                                        <h3 className="s-modal--header fw-lighter pb-4" id="modal-title">Options</h3>
                                        <div className="s-btn s-btn__danger s-btn__xs fs-6" onClick={HandlePostDelete}>
                                            <Trash /> delete
                                        </div>
                                        <div className="s-btn s-btn__xs fs-6" aria-disabled="true">
                                            <Pin /> pin
                                        </div>
                                        <div className="s-btn s-btn__xs fs-6" aria-disabled="true">
                                            <Archive /> archive
                                        </div>
                                        <div className="d-flex gx8 s-modal--footer">
                                            <button
                                                className="ms-auto s-btn s-btn__xs"
                                                data-action="s-modal#hide">
                                                close
                                            </button>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostSummary;
