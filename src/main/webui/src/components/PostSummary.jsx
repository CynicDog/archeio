import React from 'react';
import moment from 'moment';
import { useSelectedItemContext } from '../Context.jsx';

const PostSummary = ({ post }) => {

    const { selectedPost, setSelectedPost } = useSelectedItemContext();

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
                        <svg aria-hidden="true" className="svg-icon iconCheckmarkSm" width="14" height="14" viewBox="0 0 14 14">
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
                    <div onClick={handleMenuClick}>
                        <a href="#" className="s-btn s-btn__muted s-post-summary--content-menu-button">
                            <svg aria-hidden="true" className="svg-icon iconEllipsisVertical" width="17" height="18" viewBox="0 0 17 18">
                                <path d="M7 4.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m0 5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M8.5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"></path>
                            </svg>
                            <span className="v-visible-sr">menu</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostSummary;
