export const getFolders = async () => {
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

export const createFolder = async (folder) => {
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
