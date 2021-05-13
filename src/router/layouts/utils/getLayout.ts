import { ComponentType } from 'react';

import { Layout } from '../types';
import { LayoutFull } from '../layoutFull';
import { LayoutMain } from '../layoutMain';

export const getLayout = (layout: Layout): ComponentType => {
    const map: Record<Layout, ComponentType> = {
        full: LayoutFull,
        main: LayoutMain,
    };

    return map[layout];
};
