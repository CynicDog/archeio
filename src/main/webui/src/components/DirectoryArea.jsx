import React, {useState} from 'react';
import {TreeView} from '@patternfly/react-core';
import FolderIcon from '@patternfly/react-icons/dist/esm/icons/folder-icon';
import FolderOpenIcon from '@patternfly/react-icons/dist/esm/icons/folder-open-icon';
import DarkModeSwitch from "./DarkmodeSwitch.jsx";
import FolderAdd from "../../public/FolderAdd.jsx";

export const DirectoryArea = () => {

    const [showFolderInput, setShowFolderInput] = useState(false);
    const [activeItems, setActiveItems] = useState();

    const onSelect = (_event, treeViewItem) => {
        if (treeViewItem && !treeViewItem.children) {
            setActiveItems([treeViewItem]);
        }
        console.log(treeViewItem.id);
    };

    const toggleFolderInput = () => {
        setShowFolderInput(!showFolderInput);
    };

    const options = [
        {
            name: 'All',
            id: 'folder-tree-0'
        },
        {
            name: 'Technologies',
            id: 'folder-tree-1',
            action: <></>,
            children: [
                {name: 'Java', id: 'folder-tree-1-1'},
                {name: 'C#', id: 'folder-tree-1-2'},
                {name: 'JS', id: 'folder-tree-1-3'}
            ],
            defaultExpanded: true
        },
        {
            name: 'Cloud',
            id: 'folder-tree-2',
            children: [
                {name: 'Google Cloud Platform', id: 'folder-tree-2-1'},
                {name: 'Azure', id: 'folder-tree-2-2'}
            ],
            defaultExpanded: true
        },
        {
            name: 'Container / Orchestration',
            id: 'folder-tree-3',
            children: [
                {name: 'Docker', id: 'folder-tree-3-1'},
                {name: 'k8s', id: 'folder-tree-3-2'}
            ],
            defaultExpanded: true
        }
    ];

    return (
        <div>
            <div className="d-flex justify-content-end m-2">
                <DarkModeSwitch/>
            </div>
            <TreeView
                data={options}
                activeItems={activeItems}
                onSelect={onSelect}
                icon={<FolderIcon/>}
                expandedIcon={<FolderOpenIcon/>} />
            <div className="btn border border-0 mb-3" onClick={toggleFolderInput}>
                <FolderAdd/>
            </div>
            {showFolderInput && (
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
                        placeholder="Enter your input here"/>
                    <div className="d-flex justify-content-end">
                        <div className="s-btn s-btn__xs">
                            create
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
