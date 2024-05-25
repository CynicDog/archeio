import React, { useState, useEffect } from 'react';
import CloseCircle from "../../public/CloseCircle.jsx";
import {deleteFolder, saveFolder} from "../api/folder.js";

const FolderEdit = ({ folders, setFolders, setShowFolderInput, selectedFolder, setSelectedFolder }) => {

    const [newParent, setNewParent] = useState('');
    const [newChildren, setNewChildren] = useState(['']);

    useEffect(() => {
        if (selectedFolder) {
            setNewParent(selectedFolder.name);
            setNewChildren(selectedFolder.children.map(child => child.name));
        } else {
            setNewParent('');
            setNewChildren(['']);
        }
    }, [selectedFolder]);

    const handleNewFolderNameChange = (event) => {
        setNewParent(event.target.value);
    };

    const handleAddSubFolder = () => {
        setNewChildren([...newChildren, '']);
    };

    const handleSubFolderNameChange = (event, index) => {
        const updatedSubFolderNames = [...newChildren];
        updatedSubFolderNames[index] = event.target.value;
        setNewChildren(updatedSubFolderNames);
    };

    const resetForm = () => {
        setNewParent('');
        setNewChildren(['']);
        setSelectedFolder(null);
    };

    const handleRemoveSubFolder = async (index) => {

        let deletedFolder = selectedFolder.children[index];

        if (newChildren.filter(name => name.trim() !== '').length > 1) {
            if (deletedFolder && deletedFolder?.name !== '') {
                await deleteFolder(selectedFolder, deletedFolder);
                setFolders(folders.filter(folder => folder.id !== deletedFolder.id));
            }

            const updatedSubFolderNames = [...newChildren];
            updatedSubFolderNames.splice(index, 1);

            setNewChildren(updatedSubFolderNames);
        }
    };

    const handleSaveFolders = async () => {
        if (newParent.trim() === '' || newChildren.length === 0 || newChildren.some(name => name.trim() === '')) {
            return;
        }

        const folderData = {
            name: newParent,
            id: selectedFolder ? selectedFolder.id : `folder-${folders.length}`,
            children: newChildren.map((subFolderName, index) => ({
                name: subFolderName,
                id: selectedFolder ? selectedFolder.id + `-${index + 1}` : `folder-${folders.length}-${index + 1}`
            }))
        };

        const response = await saveFolder(folderData);
        setFolders([...folders, response]);

        setShowFolderInput(false);

        resetForm();
    };

    return (
        <div className="d-flex gy4 fd-column bg-light-subtle border rounded-3 p-2">
            <label className="s-label" htmlFor="folder-name-input">
                {selectedFolder ? "Edit Folder" : "Add Folder"}
            </label>
            <p className="s-description mtn2 mb0">
                {selectedFolder ? "Update your folder details to keep everything neat and tidy." : "Give your folder a name that speaks volumes!"}
            </p>
            <input
                className="s-input"
                id="folder-name-input"
                type="text"
                placeholder="Enter folder name"
                value={newParent}
                onChange={handleNewFolderNameChange}/>
            {newChildren.map((subFolderName, index) => (
                <div key={index} className="d-flex align-items-center">
                    {newChildren?.length > 1 && (
                        <div
                            className="btn border border-0 text-secondary px-2"
                            onClick={() => handleRemoveSubFolder(index)}>
                            <CloseCircle />
                        </div>
                    )}
                    <input
                        className="s-input mr-2"
                        type="text"
                        placeholder="Enter subFolder name"
                        value={subFolderName}
                        onChange={(event) => handleSubFolderNameChange(event, index)}/>
                </div>
            ))}
            <div className="d-flex justify-content-between">
                <div className="s-btn s-btn__xs" onClick={handleAddSubFolder}>
                    Add Sub
                </div>
                <div className="d-flex">
                    <div
                        className="s-btn s-btn__xs mr-2"
                        onClick={resetForm} >
                        Clear
                    </div>
                    <div
                        className="s-btn s-btn__xs"
                        aria-disabled={!newChildren.length || newChildren.some(name => name.trim() === '')}
                        onClick={handleSaveFolders} >
                        {selectedFolder ? "Update" : "Create"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FolderEdit;
