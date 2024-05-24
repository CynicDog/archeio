import ArticleInterface from "./components/ArticleInterface.jsx";
import {DirectoryArea} from "./components/DirectoryArea.jsx";
import DarkModeSwitch from "./components/DarkmodeSwitch.jsx";
import {useTheme} from "./Context.jsx";
import PostSummary from "./components/PostSummary.jsx";
import TagArea from "./components/TagArea.jsx";
import PostArea from "./components/PostArea.jsx";

const App = () => {

    const { theme } = useTheme();

    return (
        <div className={`container-fluid p-3 ${theme === "dark" ? "theme-dark__forced" : ""}`} >
            <div className="row mt-4">
                <div className="col-lg-2">
                    <div className="bs-md rounded-3 p-2 mb-3">
                        <DirectoryArea />
                    </div>
                    <div className="bs-md rounded-3 p-2 mb-3">
                        <TagArea />
                    </div>
                </div>
                <div className="col-lg-5 mb-3">
                    <div className="bs-md rounded-3 p-3">
                        <PostArea />
                    </div>
                </div>
                <div className="col-lg-5 mb-3">
                    <ArticleInterface />
                </div>
            </div>
        </div>
    );
};

export default App;
