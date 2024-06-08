import React, {useState} from 'react';
import {deleteFolder, saveFolder} from "../data/folder.js";
import {useQueryClient} from "react-query";

const FolderEdit = ({selectedFolder, setSelectedFolder, setShowFolderInput, posts}) => {

    const queryClient = useQueryClient();

    const [newFolder, setNewFolder] = useState('');

    const handleNewFolderNameChange = (event) => {
        setNewFolder(event.target.value);
    };

    const handleCreateFolder = async () => {
        if (newFolder.trim() === '') {
            return;
        }

        const folderData = selectedFolder
            ? {
                name: selectedFolder.name,
                id: selectedFolder.id,
                children: [
                    ...(Array.isArray(selectedFolder.children) ? selectedFolder.children : []),
                    {
                        name: newFolder,
                        id: null,
                        children: []
                    }
                ]
            }
            : {
                name: newFolder,
                id: null,
                children: []
            };

        const response = await saveFolder(folderData);

        // invalidate query key for fetching folders (thereby effectively refetching)
        await queryClient.invalidateQueries(['folder']);
        setSelectedFolder(response);

        setNewFolder('');
    };

    const handleDeleteFolder = async () => {

        const response = await deleteFolder(selectedFolder.id);

        if (!response) {
            window.location.reload();
            return;
        }

        // invalidate query key for fetching folders (thereby effectively refetching)
        await queryClient.invalidateQueries(['folder']);
        setSelectedFolder(response);

        setNewFolder('');
    }

    return (
        <div className="d-flex align-items-center">
            <input
                className="s-input"
                id="folder-name-input"
                type="text"
                placeholder="Enter folder name"
                value={newFolder}
                onChange={handleNewFolderNameChange} />
            <div
                className="s-btn s-btn__xs mx-2"
                aria-disabled={newFolder === ''}
                onClick={handleCreateFolder} >
                Create
            </div>
            {selectedFolder && (
                <div
                    className="s-btn s-btn__xs mx-2"
                    aria-disabled={posts?.length > 0}
                    onClick={handleDeleteFolder} >
                    Delete
                </div>
            )}
        </div>
    );
};

export default FolderEdit;
