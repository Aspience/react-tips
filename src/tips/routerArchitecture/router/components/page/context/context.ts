import { createContext } from 'react';

import { PageContextProps } from './../types';

const PageContext = createContext<PageContextProps>({
    setPageTitleTemplates: () => {},
});
PageContext.displayName = 'PageContext';

export { PageContext };
