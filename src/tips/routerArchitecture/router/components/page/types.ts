import {
    ComponentType,
    ForwardRefExoticComponent,
    LazyExoticComponent,
} from 'react';
import { Layout } from '../../layouts/types';

export type PageTitleTemplates = Record<string, string>;

export type PageContextProps = {
    setPageTitleTemplates: (titles: PageTitleTemplates) => void;
};

export type PageProps = {
    name: string;
    title: string;
    titleTemplates?: string[];
    route: string;
    routeAliases?: string[];
    params?: string[];
    exact?: boolean;
    component:
        | LazyExoticComponent<any>
        | ComponentType
        | ForwardRefExoticComponent<any>;
    layout?: Layout;
    isPrivate?: boolean;
    isOnlyGuest?: boolean;
};
