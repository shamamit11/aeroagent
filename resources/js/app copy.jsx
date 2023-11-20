import './bootstrap';
import "../css/app.scss";

import React from 'react'
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';


createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        //root.render(<App {...props} />);
        root.render(React.createElement(App, props))
    },
    progress: {
        color: '#4B5563',
    },
});
