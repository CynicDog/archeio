import React, { useState } from 'react';
import ArticleInterface from "./components/ArticleInterface.jsx";
import { DirectoryArea } from "./components/DirectoryArea.jsx";
import DarkModeSwitch from "./components/DarkmodeSwitch.jsx";
import { useTheme } from "./Context.jsx";
import PostArea from "./components/PostArea.jsx";
import TagArea from "./components/TagArea.jsx";

const App = () => {
    const { theme } = useTheme();
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedFolder, setSelectedFolder] = useState({ parentDir: '', childDir: '' });

    const handlePostClick = (post) => {
        if (selectedPost && selectedPost.id === post.id) {
            setSelectedPost(null); // Deselect the post if it is clicked again
        } else {
            setSelectedPost(post); // Select the new post
        }
    };

    const handleFolderSelect = (parentDir, childDir) => {
        setSelectedFolder({ parentDir, childDir });
    };

    return (
        <div className={`container-fluid p-3 ${theme === "dark" ? "theme-dark__forced" : ""}`}>
            <div className="row mt-4">
                {/* Menu sidebar */}
                <div className="col-lg-2">
                    <div className="bs-md rounded-3 p-2 mb-3">
                        <DirectoryArea onSelectFolder={handleFolderSelect} />
                    </div>
                    <div className="bs-md rounded-3 p-2 mb-3">
                        <TagArea />
                    </div>
                </div>
                {/* Master view */}
                <div className={`col-lg-${selectedPost ? 5 : 8} mb-3`}>
                    <div className="bs-md rounded-3 p-3">
                        <PostArea
                            onPostClick={handlePostClick}
                            parentDir={selectedFolder.parentDir}
                            childDir={selectedFolder.childDir}
                        />
                    </div>
                </div>
                {/* Detail area */}
                {selectedPost && (
                    <div className="col-lg-5 mb-3">
                        <ArticleInterface initialContent={selectedPost.title} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
