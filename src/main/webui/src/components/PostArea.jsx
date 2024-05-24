import PostSummary from "./PostSummary.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";

const PostArea = () => {

    return (
        <>
            <Breadcrumbs parentDir={"Technologies"} childDir={"Java"} />
            <PostSummary />
            <PostSummary />
            <PostSummary />
            <PostSummary />
            <PostSummary />
        </>
    )
}

export default PostArea;