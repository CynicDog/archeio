// TODO: user domain integration

export const fetchFolderPath = async (folderId) => {
    const response = await fetch(`/api/folder/${folderId}/path`);
    return await response.text();
}

export const fetchFolders = async () => {
    const response = await fetch('/api/folder');
    const folders = await response.json();

    const filterFolders = (folder) => {
        if (folder.children.length === 0) {
            return { id: folder.id, name: folder.name };
        } else {
            const filteredChildren = folder.children.map(child => filterFolders(child));
            return { id: folder.id, name: folder.name, children: filteredChildren, defaultExpanded: true };
        }
    };

    const endFolders = folders.map(folder => filterFolders(folder));

    return endFolders;
};

export const saveFolder = async (folder) => {
    const response = await fetch('/api/folder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(folder)
    });

    if (!response.ok) {
        throw new Error('Failed to create folder');
    }

    return await response.json();
};

export const deleteFolder = async (parent, child) => {
    const requestBody = { parent: parent, child: child };
    const response = await fetch('/api/folder', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        throw new Error('Failed to create folder');
    }
};
