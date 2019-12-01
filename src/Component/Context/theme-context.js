import React from 'react';
export const themes = {
    light: {
        color: '#666666'
    },
    dark: {
        color: '#222222'
    }
}

export const ThemeContext = React.createContext(themes.dark);