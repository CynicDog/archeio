import React, { useState } from 'react';
import { useQuery } from 'react-query';
import PostAdd from '../../public/PostAdd.jsx';
import { useAuth, useSelectedItemContext } from '../Context.jsx';
import { savePost } from '../data/post.js';
import { fetchFolderPath } from '../data/folder.js';
import FolderEdit from './FolderEdit.jsx';
import AddCircle from '../../public/AddCircle.jsx';
import GithubAuthLabel from './GithubAuthLabel.jsx';

const Breadcrumbs = ({postRefetch}) => {
    const { githubAuthenticated } = useAuth();
    const { selectedFolder, setSelectedFolder } = useSelectedItemContext();

    const [showFolderInput, setShowFolderInput] = useState(false);
    const toggleFolderInput = () => {
        setShowFolderInput(!showFolderInput);
    };

    const { data: pathData } = useQuery(
        ['folderPath', selectedFolder?.id, selectedFolder?.name],
        () => {
            if (selectedFolder.id === 'tags') {
                return `Tags / ${selectedFolder.name}`;
            } else {
                return fetchFolderPath(selectedFolder?.id);
            }
        },
        {
            enabled: !!selectedFolder
        }
    );

    const handlePostAdd = async () => {
        let updatedPost = await savePost({
            postId: -1,
            content: '# Some awesome title',
            tags: null,
            folderId: selectedFolder.id
        });

        postRefetch();
    };

    return (
        <div className="bg-light-subtle border border-1 rounded-3 p-2">
            <div className="d-flex">
                <span className="text-body-secondary fs-3 fw-lighter">
                    {pathData}
                </span>
                {githubAuthenticated && !((selectedFolder?.name === 'All') || (selectedFolder.id === 'tags')) && (
                    <>
                        <div className="text-secondary btn border border-0 mx-3 my-1" onClick={toggleFolderInput}>
                            <AddCircle />
                        </div>
                        {showFolderInput && (
                            <FolderEdit
                                selectedFolder={selectedFolder}
                                setSelectedFolder={setSelectedFolder}
                                setShowFolderInput={setShowFolderInput}
                            />
                        )}
                    </>
                )}
                <GithubAuthLabel />
                {githubAuthenticated && (
                    <div className=" btn border border-0 my-1" onClick={handlePostAdd}>
                        <PostAdd />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Breadcrumbs;
