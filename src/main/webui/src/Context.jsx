import {createContext, useContext, useEffect, useState} from "react";
import {
    getGithubAccessTokenFromCookie, getGithubAvatarFromCookie,
    getGithubUsernameFromCookie,
    removeGithubAccessTokenCookie, removeGithubAvatarCookie, removeGithubUsernameCookie
} from "./module/cookie.js";

// Theme Provider
const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}
export const useTheme = () => useContext(ThemeContext);
const SelectedItemContext = createContext();

export const SelectItemProvider = ({ children }) => {
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedFolder, setSelectedFolder] = useState({id: 'folder-0', name: 'All'})

    return (
        <SelectedItemContext.Provider value={{ selectedPost, setSelectedPost, selectedFolder, setSelectedFolder }}>
            {children}
        </SelectedItemContext.Provider>
    );
};

export const useSelectedItemContext = () => useContext(SelectedItemContext);



// Auth Provider
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [githubAuthenticated, setGithubAuthenticated] = useState(null);
    const [githubUsername, setGithubUsername] = useState(null);
    const [githubAvatar, setGithubAvatar] = useState(null);

    useEffect(() => {

        const githubAccessToken = getGithubAccessTokenFromCookie();
        if (githubAccessToken !== null) {
            sessionStorage.setItem("ACCESS_TOKEN", githubAccessToken);
            setGithubAuthenticated(true);
        }

        const githubUsername = getGithubUsernameFromCookie();
        if (githubUsername !== null) {
            setGithubUsername(githubUsername);
        }

        const githubAvatar = getGithubAvatarFromCookie();
        if (githubAvatar !== null) {
            setGithubAvatar(githubAvatar);
        }
    }, []);

    // TODO: empty state on sign out status
    const handleGithubSignOut = () => {

        sessionStorage.removeItem("ACCESS_TOKEN");

        removeGithubAccessTokenCookie();
        removeGithubUsernameCookie();
        removeGithubAvatarCookie();

        setGithubAuthenticated(null);
        setGithubUsername(null);
        setGithubAvatar(null);
    };

    return (
        <AuthContext.Provider value={{
            githubAuthenticated,
            setGithubAuthenticated,
            githubUsername,
            setGithubUsername,
            githubAvatar,
            handleGithubSignOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);