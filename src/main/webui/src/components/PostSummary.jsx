import React from 'react';

const PostSummary = ({ post, onClick }) => {

    return (
        <div className="s-card my-3">
            <div className="s-post-summary">
                <div className="s-post-summary--stats">
                    <div className="s-post-summary--stats-item s-post-summary--stats-item__emphasized">
                        <span className="s-post-summary--stats-item-number">95</span>
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
                        <span className="s-post-summary--stats-item-number">104k</span>
                        <span className="s-post-summary--stats-item-unit">views</span>
                    </div>
                </div>
                <div className="s-post-summary--content">
                    <h3 className="s-post-summary--content-title">
                        <a className="text-secondary link-dark link-underline-opacity-0" onClick={onClick}>
                            {post.title}
                        </a>
                    </h3>
                    <p className="s-post-summary--content-excerpt">
                        In the spirit of type safety associated with the CriteriaQuery JPA 2.0 also has an API to support Metamodel representation of entities.
                    </p>
                    <div className="s-post-summary--meta">
                        <div className="s-post-summary--meta-tags">
                            <a className="s-tag" href="#">java</a>
                            <a className="s-tag" href="#">hibernate</a>
                            <a className="s-tag" href="#">jpa</a>
                            <a className="s-tag" href="#">annotation-processing</a>
                            <a className="s-tag" href="#">metamodel</a>
                        </div>
                        <div className="s-user-card s-user-card__minimal">
                            <time className="s-user-card--time">asked about 2 minutes ago</time>
                        </div>
                    </div>
                    <a href="#" className="s-btn s-btn__muted s-post-summary--content-menu-button">
                        <svg aria-hidden="true" className="svg-icon iconEllipsisVertical" width="17" height="18" viewBox="0 0 17 18">
                            <path d="M7 4.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m0 5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M8.5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"></path>
                        </svg>
                        <span className="v-visible-sr">menu</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PostSummary;
