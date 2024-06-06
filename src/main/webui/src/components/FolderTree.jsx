import React, {useState, useEffect} from 'react';
import {Spinner, TreeView} from '@patternfly/react-core';
import Folder from "../../public/Folder.jsx";
import FolderOpened from "../../public/FolderOpened.jsx";
import {useQuery} from "react-query";
import {fetchFolders} from "../data/folder.js";
import {useSelectedItemContext} from "../Context.jsx";
import AddCircle from "../../public/AddCircle.jsx";
import FolderEdit from "./FolderEdit.jsx";

export const FolderTree = () => {

    const { selectedFolder, setSelectedPost, setSelectedFolder } = useSelectedItemContext();
    const [activeItems] = useState([]);

    const {data: folders = [], isLoading: isFolderLoading} = useQuery(
        ['folder'],
        () => fetchFolders(),
        {
        }
    );

    const [showFolderInput, setShowFolderInput] = useState(false);
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
                <div className="border rounded-3 p-2 my-3 overflow-auto">
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
                        <div className="ms-auto text-secondary btn border border-0 my-1" onClick={toggleFolderInput}>
                            <AddCircle />
                        </div>
                    </div>
                    {showFolderInput && (
                        <FolderEdit
                            selectedFolder={null}
                            setSelectedFolder={setSelectedFolder}
                            setShowFolderInput={setShowFolderInput}
                        />
                    )}
                </div>
            )}
        </div>
    );
};