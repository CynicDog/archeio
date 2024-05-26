import {createContext, useContext, useState} from "react";

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
const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [selectedPost, setSelectedPost] = useState(null);

    return (
        <PostContext.Provider value={{ selectedPost, setSelectedPost }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePostContext = () => useContext(PostContext);