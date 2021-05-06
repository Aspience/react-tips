import React, { FC, useEffect } from 'react';

import { usePageContext } from '../../router/components/page';

const RootPage: FC = () => {
    const { setPageTitleTemplates } = usePageContext();

    useEffect(() => {
        setTimeout(() => {
            setPageTitleTemplates({
                template: "Hey, I'm async title from PageComponent",
            });
        }, 5000);
    }, []);

    return <div />;
};

export { RootPage };
