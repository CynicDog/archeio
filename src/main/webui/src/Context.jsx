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

// Selected Item Provider
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