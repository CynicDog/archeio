export const sendToServer = ({ postId, content, tags }) => {

    return fetch(`/api/post/${postId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content, tags })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to save data');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error saving data:', error.message);
        });
};

export const fetchByFolder = (folderId) => {

    return fetch(`/api/post/${folderId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching posts:', error.message);
            throw error;
        });
};

export const fetchFolders = () => {

    return fetch(`/api/post`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching posts:', error.message);
            throw error;
        });
};