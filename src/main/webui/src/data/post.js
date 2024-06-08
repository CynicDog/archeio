// default user page as 'CynicDog'
const username = window.location.pathname.split('/')[1] || 'CynicDog';

export const savePost = ({ postId, content, tags, folderId }) => {

    return fetch(`/api/post/${username}/${postId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content, tags, folderId })
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

    return fetch(`/api/post/${username}/${folderId}`)
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

export const fetchPosts = () => {

    return fetch(`/api/post/${username}`)
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

export const deletePost = async (postId) => {

    return fetch(`/api/post/${username}/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if(!response.ok) {
                throw new Error('Failed to delete folder');
            }
        })
        .catch(error => {
            return undefined;
        });
};
