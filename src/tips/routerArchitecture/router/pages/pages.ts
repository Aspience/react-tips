import LoginPage from './../../pages/login';
import RootPage from './../../pages/root';
import { PageProps } from './../components/page/types';

export const pages: PageProps[] = [
    {
        name: 'login',
        title: 'Login',
        route: '/login',
        routeAliases: ['/auth'],
        component: LoginPage,
        isOnlyGuest: true,
        layout: 'full',
        isPrivate: false,
    },
    {
        name: 'root',
        title: '%template - Main page',
        titleTemplates: ['template'],
        route: '/',
        component: RootPage,
    },
];
