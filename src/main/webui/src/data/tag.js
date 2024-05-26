export const fetchTags = () => {

    return fetch('/api/tag')
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

    return fetch(`/api/tag/${tagName}/posts`)
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