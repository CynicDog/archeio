import React, {useState} from 'react';
import {saveFolder} from "../data/folder.js";
import {useQueryClient} from "react-query";

const FolderEdit = ({selectedFolder, setSelectedFolder, setShowFolderInput}) => {

    const queryClient = useQueryClient();

    const [newChild, setNewChild] = useState('');

    const handleChildNameChange = (event) => {
        setNewChild(event.target.value);
    };

    const handleSaveFolders = async () => {
        if (newChild.trim() === '') {
            return;
        }

        const folderData = {
            name: selectedFolder.name,
            id: selectedFolder.id,
            children: [
                ...(Array.isArray(selectedFolder.children) ? selectedFolder.children : []),
                {
                    name: newChild,
                    id: null,
                    children: []
                }
            ]
        };

        const response = await saveFolder(folderData);

        // invalidate query key for fetching folders (thereby effectively refetching)
        await queryClient.invalidateQueries(['folder']);
        await queryClient.invalidateQueries(['folderPath', selectedFolder.id]);

        setSelectedFolder(response);

        setNewChild('');
        setShowFolderInput(false);
    };

    return (

        <div className="d-flex align-items-center ">
            <input
                className="s-input"
                id="folder-name-input"
                type="text"
                placeholder="Enter folder name"
                value={newChild}
                onChange={(event) => handleChildNameChange(event)}/>
            <div
                className="s-btn s-btn__xs mx-2"
                aria-disabled={(newChild === '')}
                onClick={handleSaveFolders}>
                Create
            </div>
        </div>
    );
};

export default FolderEdit;
