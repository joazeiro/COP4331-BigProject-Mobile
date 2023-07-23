import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchHandler = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <SearchContext.Provider value={[searchQuery, setSearchQuery]}>
            {children}
        </SearchContext.Provider>
    );
}