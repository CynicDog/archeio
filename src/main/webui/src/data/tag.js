const username = window.location.pathname.split('/')[1];

export const fetchTags = () => {

    return fetch(`/api/tag/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch tags');
            }
            return response.json();
        })
        .catch(error => {
            console.log('Error fetching tags: ', error.message);
            throw error;
        })
}


export const fetchPostsByTag = (tagName) => {

    return fetch(`/api/tag//${username}/${tagName}/posts`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch tags');
            }
            return response.json();
        })
        .catch(error => {
            console.log('Error fetching tags: ', error.message);
            throw error;
        })
}