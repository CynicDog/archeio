// default user page as 'CynicDog'
const username = window.location.pathname.split('/')[1] || 'CynicDog';

export const fetchFolderPath = async (folderId) => {
    const response = await fetch(`/api/folder/${username}/${folderId}/path`);
    return await response.text();
}

export const fetchFolders = async () => {
    const response = await fetch(`/api/folder/${username}`);
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
    const response = await fetch(`/api/folder/${username}`, {
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

export const deleteFolder = async (folderId) => {

    return fetch(`/api/folder/${username}/${folderId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if(!response.ok) {
                throw new Error('Failed to delete folder');
            }
            return response.json();
        })
        .catch(error => {
            return undefined;
        });
};
