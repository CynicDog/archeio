import React, { useState } from 'react';
import CloseCircle from "../../public/CloseCircle.jsx";
import {createFolder} from "../api/folder.js";

const FolderInput = ({ folders, setFolders, setShowFolderInput }) => {
    const [newFolderName, setNewFolderName] = useState('');
    const [subfolderNames, setSubfolderNames] = useState(['']);

    const handleNewFolderNameChange = (event) => {
        setNewFolderName(event.target.value);
    };

    const handleCreateFolder = async () => {
        if (newFolderName.trim() === '' || subfolderNames.length === 0 || subfolderNames.some(name => name.trim() === '')) {
            return;
        }

        const newFolder = {
            name: newFolderName,
            id: `folder-${folders.length}`,
            children: subfolderNames.map((subfolderName, index) => ({
                name: subfolderName,
                id: `folder-${folders.length}-${index + 1}`
            }))
        };

        const response = await createFolder(newFolder);

        setFolders([...folders, response]);
        setNewFolderName('');
        setShowFolderInput(false);
        setSubfolderNames(['']);
    };

    const handleAddSubfolder = () => {
        setSubfolderNames([...subfolderNames, '']);
    };

    const handleSubfolderNameChange = (event, index) => {
        const updatedSubfolderNames = [...subfolderNames];
        updatedSubfolderNames[index] = event.target.value;
        setSubfolderNames(updatedSubfolderNames);
    };

    const handleRemoveSubfolder = (index) => {
        const updatedSubfolderNames = [...subfolderNames];
        updatedSubfolderNames.splice(index, 1);
        setSubfolderNames(updatedSubfolderNames);
    };

    return (
        <div className="d-flex gy4 fd-column">
            <label className="s-label" htmlFor="folder-name-input">
                Add Folder
            </label>
            <p className="s-description mtn2 mb0">
                Give your folder a name that speaks volumes!
            </p>
            <input
                className="s-input"
                id="folder-name-input"
                type="text"
                placeholder="Enter folder here"
                value={newFolderName}
                onChange={handleNewFolderNameChange}/>
            {subfolderNames.map((subfolderName, index) => (
                <div key={index} className="d-flex align-items-center">
                    <input
                        className="s-input mr-2"
                        type="text"
                        placeholder="Enter subfolder name"
                        value={subfolderName}
                        onChange={(event) => handleSubfolderNameChange(event, index)}/>
                    <div
                        className="btn border border-0 text-secondary px-2"
                        onClick={() => handleRemoveSubfolder(index)} >
                        <CloseCircle />
                    </div>
                </div>
            ))}
            <div className="d-flex justify-content-between">
                <div className="s-btn s-btn__xs" onClick={handleAddSubfolder}>
                    Add Sub
                </div>
                <div
                    className={`s-btn s-btn__xs ${subfolderNames.length === 0 || subfolderNames.some(name => name.trim() === '') ? 'disabled' : ''}`}
                    aria-disabled={!subfolderNames.length || subfolderNames.some(name => name.trim() === '')}
                    onClick={handleCreateFolder} >
                    Create
                </div>
            </div>
        </div>
    );
};

export default FolderInput;
