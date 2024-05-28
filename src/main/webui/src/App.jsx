import React, {useState} from 'react';
import PostInterface from "./components/PostInterface.jsx";
import {FolderTree} from "./components/FolderTree.jsx";
import DarkModeSwitch from "./components/DarkmodeSwitch.jsx";
import {useSelectedItemContext, useTheme} from "./Context.jsx";
import PostArea from "./components/PostArea.jsx";
import TagArea from "./components/TagArea.jsx";
import Menu from "../public/Menu.jsx";

const App = () => {
    const {theme} = useTheme();
    const {selectedPost, setSelectedPost} = useSelectedItemContext();
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const handlePostClick = (post) => {
        if (selectedPost && selectedPost.id === post.id) {
            setSelectedPost(null); // Deselect the post if it is clicked again
        } else {
            setSelectedPost(post); // Select the new post
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const getMasterViewColWidth = () => {
        if (isMenuOpen) {
            return selectedPost ? '5' : '9';
        } else {
            return selectedPost ? '5' : '10';
        }
    };

    return (
        <div className={`container-fluid p-3 ${theme === "dark" ? "theme-dark__forced" : ""}`}>
            <div className="row mt-4">
                {/* Menu sidebar */}
                <div className={`col-lg-${isMenuOpen ? '2' : '1'}`}>
                    <div className="bs-md rounded-3 p-2 mb-3">
                        <div className="d-flex justify-content-between m-2">
                            <div className="btn border border-0" onClick={toggleMenu}>
                                <Menu/>
                            </div>
                            <div className="mt-1">
                                <DarkModeSwitch/>
                            </div>
                        </div>
                        {isMenuOpen && (
                            <FolderTree />
                        )}
                    </div>
                    <div className="bs-md rounded-3 p-2 mb-3">
                        <TagArea />
                    </div>
                </div>
                {/* Master view */}
                <div className={`col-lg-${getMasterViewColWidth()} mb-3`}>
                    <div className="bs-md rounded-3 p-3">
                        <PostArea onPostClick={handlePostClick}/>
                    </div>
                </div>
                {/* Detail area */}
                {selectedPost && (
                    <div className={`col-lg-${isMenuOpen ? '5' : '6'} mb-3`}>
                        <div style={{position: 'sticky', top: '30px'}}>
                            <PostInterface
                                initialContent={selectedPost.content}
                                postId={selectedPost.id}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
