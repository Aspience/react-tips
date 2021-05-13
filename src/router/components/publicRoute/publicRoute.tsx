import React, { FC } from 'react';
import { Redirect, Route } from 'react-router';

import { PageProps } from '../page/types';
import { getMainPage } from '../../pages/utils/getMainPage';
import { Page } from '@src/router/components/page';

export const PublicRoute: FC<{ page: PageProps }> = ({ page }) => {
    const {
        route,
        routeAliases = [],
        exact,
        isOnlyGuest,
        isPrivate,
        component,
    } = page;
    const routes: string[] = [route, ...routeAliases];
    const isAuth = false; // TODO: connect into the storage

    if (isAuth && isOnlyGuest) {
        return <Redirect to={getMainPage()} />;
    }

    return (
        <>
            {routes.map((item) => (
                <Route key={item} exact={exact} path={item}>
                    <Page {...page} />
                </Route>
            ))}
        </>
    );
};
