export const getGithubAccessTokenFromCookie = () => {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('access_token='));
    if (cookie) {
        return cookie.split('=')[1];
    }
    return null;
};

export const getGithubUsernameFromCookie = () => {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('github_username='));
    if (cookie) {

        return cookie
            .split('=')[1]
            .replace(/_/g, ' ');
    }
    return null;
};

export const getGithubAvatarFromCookie = () => {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('github_avatar='));
    if (cookie) {
        return cookie.split('=')[1];
    }
    return null;
};

export const removeGithubAccessTokenCookie = () => {
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

export const removeGithubUsernameCookie = () => {
    document.cookie = 'github_username=;';
};

export const removeGithubAvatarCookie = () => {
    document.cookie = 'github_avatar=;';
};