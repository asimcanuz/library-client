import React, { createContext, PropsWithChildren, useState } from 'react';

// Define the type for your sidebar context
type SidebarContextType = {
    isOpen: boolean;
    toggleSidebar: () => void;
};

// Create the sidebar context
export const SidebarContext = createContext<SidebarContextType>({
    isOpen: false,
    toggleSidebar: () => {},
});

// Create the sidebar context provider component
export const SidebarProvider: React.FC = ({ children }:PropsWithChildren) => {
    const [isOpen, setIsOpen] = useState(Boolean(localStorage.getItem("collapse")) ||false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};