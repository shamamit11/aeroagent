import './bootstrap';
import "../css/app.scss";

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { ConfigProvider } from 'antd';
import en from 'antd/locale/en_US';
import ar from 'antd/locale/ar_EG';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

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
        const currentLocale = props.initialPage.props.locale;

        const app = <ConfigProvider locale={props.currentLocale === 'ar' ? ar : en} direction={ currentLocale === 'ar' ? 'rtl' : 'ltr'}>
            <App {...props} />
        </ConfigProvider>;

        root.render(app);
    },
    progress: {
        color: '#4B5563',
    },
});