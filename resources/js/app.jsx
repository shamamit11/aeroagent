import './bootstrap';
import "../css/app.scss";

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { ConfigProvider } from 'antd';
import theme from './theme';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        let page = pages[`./Pages/${name}.jsx`]
        page.default.layout = page.default.layout || (page => <>{page}</>)
        return page
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        const app = <ConfigProvider
            theme={theme}
        >
            <App {...props} />
        </ConfigProvider>;

        root.render(app);
    },
    progress: {
        color: '#4B5563',
    },
});