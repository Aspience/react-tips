import React, { FC } from 'react';
import { Redirect, Route } from 'react-router';

import { getLoginPage } from '@src/router/pages/utils/getLoginPage';

import { PageProps } from '../page/types';
import { Page } from '@src/router/components/page';

export const PrivateRoute: FC<{ page: PageProps }> = ({ page }) => {
    const { route, routeAliases = [], exact, isPrivate, component } = page;
    const routes: string[] = [route, ...routeAliases];
    const isAuth = false; // TODO: connect into store

    if (!isAuth && isPrivate) {
        return <Redirect to={getLoginPage()} />;
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
