import React, {useState, useEffect} from 'react';
import {Spinner, TreeView} from '@patternfly/react-core';
import DarkModeSwitch from "./DarkmodeSwitch.jsx";
import FolderAdd from "../../public/FolderAdd.jsx";
import FolderEdit from './FolderEdit.jsx';
import Folder from "../../public/Folder.jsx";
import FolderOpened from "../../public/FolderOpened.jsx";
import {useQuery} from "react-query";
import {getFolders} from "../data/folder.js";
import {usePostContext} from "../Context.jsx";

export const FolderTree = ({onFolderSelect}) => {

    const { setSelectedPost } = usePostContext();

    const [showFolderInput, setShowFolderInput] = useState(false);
    const [activeItems, setActiveItems] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState(null);

    const {data: folders = [], isLoading: isFolderLoading, refetch: setFolders} = useQuery(
        'folder',
        () => getFolders(),
        {
            staleTime: 600_000 // 10 minutes
        }
    );

    const toggleFolderInput = () => {
        setShowFolderInput(!showFolderInput);
    };

    useEffect(() => {
        if (activeItems.length > 0) {
            const parent = findParent(activeItems[0]?.id, folders);
            setSelectedFolder(parent);
        } else {
            setSelectedFolder(null);
        }
    }, [activeItems]);

    return (
        <div>
            <div className="d-flex justify-content-end m-2">
                <DarkModeSwitch/>
            </div>
            {isFolderLoading ? (
                <div className="d-flex justify-content-center">
                    <Spinner/>
                </div>
            ) : (
                <div className="border rounded-3 p-2 my-3">
                    <TreeView
                        hasSelectableNodes
                        data={folders}
                        activeItems={activeItems}
                        onSelect={(_event, treeViewItem) => {
                            if (!treeViewItem.children) {
                                setActiveItems([treeViewItem]);
                                const parent = folders.find(option => option.children && option.children.some(child => child.id === treeViewItem.id));
                                onFolderSelect(parent ? parent.name : '', treeViewItem.name, treeViewItem.id);
                            } else {
                                onFolderSelect(treeViewItem.name, '', treeViewItem.id);
                                setSelectedFolder(treeViewItem);
                            }
                            setSelectedPost(null)
                        }}
                        icon={<Folder/>}
                        expandedIcon={<FolderOpened/>}/>
                    <div className="d-flex">
                        <div className="ms-auto btn border border-0" onClick={toggleFolderInput} >
                            <FolderAdd/>
                        </div>
                    </div>
                </div>
            )}
            {showFolderInput && (
                <FolderEdit
                    folders={folders}
                    setFolders={setFolders}
                    setShowFolderInput={setShowFolderInput}
                    selectedFolder={activeItems[0]?.name === 'All' ? null : selectedFolder}
                    setSelectedFolder={setSelectedFolder}
                />
            )}
        </div>
    );
};

const findParent = (childId, folders) => {
    for (let i = 0; i < folders.length; i++) {
        const folder = folders[i];
        if (folder.children && Array.isArray(folder.children)) {
            for (let j = 0; j < folder.children.length; j++) {
                const child = folder.children[j];
                if (child.id === childId) {
                    return folder;
                }
            }
        }
    }
    return null;
};
