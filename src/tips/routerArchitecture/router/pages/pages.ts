import { DeepReadonly } from '@shared/helpers/types/DeepReadonly';

import LoginPage from './../../pages/login';
import RootPage from './../../pages/root';
import { PageProps } from './../components/page/types';

export const pages: DeepReadonly<PageProps[]> = [
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
        title: 'Main page',
        route: '/',
        component: RootPage,
    },
];
