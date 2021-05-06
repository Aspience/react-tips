import { useContext } from 'react';

import { PageContextProps } from '../types';
import { PageContext } from './context';

export const usePageContext = (): PageContextProps => {
    const context = useContext(PageContext);

    if (!context) {
        throw Error(
            'Cannot find page context. Please make a sure that you are located on Page component'
        );
    }

    return context;
};
