const username = window.location.pathname.split('/')[1] || 'CynicDog';

export const fetchUser = () => {
    return fetch(`/api/user/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log('Error fetching user: ', error.message);
            throw error;
        });
}
