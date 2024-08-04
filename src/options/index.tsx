import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '../contexts/ThemeContext';
import '../utils/i18n';
import Options from './options';
import './options.css';

const root = createRoot(document.getElementById('root')!);

root.render(
    <React.StrictMode>
        <ThemeProvider>
            <Options />
        </ThemeProvider>
    </React.StrictMode>
);
