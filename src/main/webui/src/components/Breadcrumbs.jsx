import PostAdd from "../../public/PostAdd.jsx";
import { useSelectedItemContext } from "../Context.jsx";
import { savePost } from "../data/post.js";
import { fetchFolderPath } from "../data/folder.js";
import {useQuery} from "react-query";

const Breadcrumbs = () => {
    const { setSelectedPost, selectedFolder } = useSelectedItemContext();

    const { data: pathData, isLoading, isError } = useQuery(
        ['folderPath', selectedFolder?.id],
        () => fetchFolderPath(selectedFolder?.id),
        {
            enabled: !!selectedFolder
        }
    );

    const handlePostAdd = async () => {
        let updatedPost = await savePost({ postId: -1, content: '# Some awesome title', tags: null, folderId: selectedFolder.id });
        setSelectedPost(updatedPost);
    };

    return (
        <div className="bg-light-subtle border border-1 rounded-3 p-2">
            <div className="d-flex">
                <span className="text-body-secondary fs-3 fw-lighter">
                    {pathData}
                </span>
                <div className="ms-auto btn border border-0 my-1" onClick={handlePostAdd}>
                    <PostAdd />
                </div>
            </div>
        </div>
    );
};

export default Breadcrumbs;
