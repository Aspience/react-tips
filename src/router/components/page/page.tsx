import { FC, useEffect, useState, Suspense } from 'react';
import { Helmet } from 'react-helmet';

import { getLayout } from '@src/router/layouts/utils/getLayout';

import { PageProps, PageTitleTemplates, PageContextProps } from './types';
import { PageContext } from './context';
import { processTitle, titleHasTemplates } from './utils/processTitle';

export const Page: FC<PageProps> = ({
    component: Component,
    title,
    titleTemplates,
    layout = 'main',
}) => {
    const [pageTitle, setPageTitle] = useState(title);

    const [
        titleTemplatesValues,
        setTitleTemplatesValues,
    ] = useState<PageTitleTemplates | null>(null);

    useEffect(() => {
        if (titleHasTemplates(title)) {
            setPageTitle('Loading');
        }
    }, []);

    useEffect(() => {
        if (titleTemplates) {
            setPageTitle(title);
        }
    }, [titleTemplates]);

    const setTitleTemplatesHandler = (titles: PageTitleTemplates) =>
        setTitleTemplatesValues(titles);

    const contextProps: PageContextProps = {
        setPageTitleTemplates: setTitleTemplatesHandler,
    };

    const Layout = getLayout(layout);

    return (
        <PageContext.Provider value={contextProps}>
            <Helmet title={processTitle(pageTitle, titleTemplatesValues)} />
            <Layout>
                <Suspense fallback={<span>Loading</span>}>
                    <Component />
                </Suspense>
            </Layout>
        </PageContext.Provider>
    );
};
