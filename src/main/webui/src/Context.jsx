import {createContext, useContext, useEffect, useState} from "react";

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

    const [auth, setAuth] = useState(false);

    useEffect(() => {

        const isAdmin = document.cookie.split('; ')
                .find(row => row.startsWith('isAdmin='))?.split('=')[1];

        if (isAdmin === 'true') {
            setAuth(true);
        } else {
            setAuth(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);