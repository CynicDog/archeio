import React, {useState, useEffect} from 'react';
import {Spinner, TreeView} from '@patternfly/react-core';
import FolderAdd from "../../public/FolderAdd.jsx";
import Folder from "../../public/Folder.jsx";
import FolderOpened from "../../public/FolderOpened.jsx";
import {useQuery} from "react-query";
import {fetchFolders} from "../data/folder.js";
import {useSelectedItemContext} from "../Context.jsx";

export const FolderTree = () => {

    const { setSelectedPost, setSelectedFolder } = useSelectedItemContext();

    const [showFolderInput, setShowFolderInput] = useState(false);
    const [activeItems, setActiveItems] = useState([]);

    const {data: folders = [], isLoading: isFolderLoading, refetch: setFolders} = useQuery(
        'folder',
        () => fetchFolders(),
        {
            staleTime: 600_000 // 10 minutes
        }
    );

    const toggleFolderInput = () => {
        setShowFolderInput(!showFolderInput);
    };

    return (
        <div>
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
                            setSelectedFolder(treeViewItem);
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
            {/*TODO: move to Breadcrumbs to edit per folder */}
            {/*{showFolderInput && (
                <FolderEdit
                    folders={folders}
                    setFolders={setFolders}
                    setShowFolderInput={setShowFolderInput}
                    selectedFolder={activeItems[0]?.name === 'All' ? null : selectedFolder}
                    setSelectedFolder={setSelectedFolder}
                />
            )}*/}
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
