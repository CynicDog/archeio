import React, {useState} from 'react';
import {Spinner, TreeView} from '@patternfly/react-core';
import DarkModeSwitch from "./DarkmodeSwitch.jsx";
import FolderAdd from "../../public/FolderAdd.jsx";
import FolderInput from './FolderInput'; // Import the new component here
import Folder from "../../public/Folder.jsx";
import FolderOpened from "../../public/FolderOpened.jsx";
import {useQuery} from "react-query";
import {getFolders} from "../api/folder.js";

export const DirectoryArea = ({onSelectFolder}) => {

    const [showFolderInput, setShowFolderInput] = useState(false);
    const [activeItems, setActiveItems] = useState([]);

    const {data: folders = [], isLoading: isFolderLoading, refetch: setFolders} = useQuery(
        'folder',
        () => getFolders()
    )

    const onFolderSelect = (_event, treeViewItem) => {
        if (treeViewItem && !treeViewItem.children) {
            setActiveItems([treeViewItem]);
            const parent = folders.find(option => option.children && option.children.some(child => child.id === treeViewItem.id));
            onSelectFolder(parent ? parent.name : '', treeViewItem.name);
        }
    };

    const toggleFolderInput = () => {
        setShowFolderInput(!showFolderInput);
    };

    return (
        <div>
            <div className="d-flex justify-content-end m-2">
                <DarkModeSwitch />
            </div>
            {isFolderLoading ? (
                <div className="d-flex justify-content-center">
                    <Spinner />
                </div>
            ) : (
                <TreeView
                    data={folders}
                    activeItems={activeItems}
                    onSelect={onFolderSelect}
                    icon={<Folder/>}
                    expandedIcon={<FolderOpened/>} />
            )}
            <div className="btn border border-0 mb-3" onClick={toggleFolderInput}>
                <FolderAdd/>
            </div>
            {showFolderInput && (
                <FolderInput
                    folders={folders}
                    setFolders={setFolders}
                    setShowFolderInput={setShowFolderInput}
                />
            )}
        </div>
    );
};
