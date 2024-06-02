import React, {useState} from 'react';
import PostInterface from "./components/PostInterface.jsx";
import {FolderTree} from "./components/FolderTree.jsx";
import DarkModeSwitch from "./components/DarkmodeSwitch.jsx";
import {useAuth, useSelectedItemContext, useTheme} from "./Context.jsx";
import PostArea from "./components/PostArea.jsx";
import TagArea from "./components/TagArea.jsx";
import Menu from "../public/Menu.jsx";
import {marked} from "marked";

const App = () => {

    const {githubAuthenticated} = useAuth();
    const {theme} = useTheme();
    const {selectedPost} = useSelectedItemContext();

    const [isMenuOpen, setIsMenuOpen] = useState(true);

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
                            {isMenuOpen && (
                                <div className="mt-1">
                                    <DarkModeSwitch/>
                                </div>
                            )}
                        </div>
                        {isMenuOpen && (
                            <FolderTree/>
                        )}
                    </div>
                    <div className="bs-md rounded-3 p-2 mb-3">
                        <TagArea/>
                    </div>
                </div>
                {/* Master view */}
                <div className={`col-lg-${getMasterViewColWidth()} mb-3`}>
                    <div className="bs-md rounded-3 p-3">
                        <PostArea />
                    </div>
                </div>
                {/* Detail area */}
                {selectedPost ? (
                    githubAuthenticated ? (
                        <div className={`col-lg-${isMenuOpen ? '5' : '6'} mb-3`}>
                            <div style={{position: 'sticky', top: '30px'}}>
                                <PostInterface/>
                            </div>
                        </div>
                    ) : (
                        <div className={`col-lg-${isMenuOpen ? '5' : '6'} mb-3`}>
                            <div className="bs-md rounded-3 p-3 px-5" style={{position: 'sticky', top: '30px'}}>
                                <div dangerouslySetInnerHTML={{__html: marked.parse(selectedPost.content)}}/>
                            </div>
                        </div>
                    )
                ) : null}
            </div>
        </div>
    );
};

export default App;
