import React, {useState} from 'react';
import {saveFolder} from "../data/folder.js";
import {useQueryClient} from "react-query";

const FolderEdit = ({selectedFolder, setSelectedFolder, setShowFolderInput}) => {

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
        if (selectedFolder) {
            await queryClient.invalidateQueries(['folderPath', selectedFolder.id]);
        }

        setSelectedFolder(response);
        setNewFolder('');
        setShowFolderInput(false);
    };

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
        </div>
    );
};

export default FolderEdit;
