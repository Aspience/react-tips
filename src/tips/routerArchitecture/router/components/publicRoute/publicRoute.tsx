import React, { FC } from 'react';
import { Redirect, Route } from 'react-router';

import { PageProps } from '../page/types';
import { getMainPage } from '../../pages/utils/getMainPage';

export const PublicRoute: FC<{ page: PageProps }> = ({
    page: {
        route,
        routeAliases = [],
        exact,
        isOnlyGuest,
        isPrivate,
        component,
    },
}) => {
    const routes: string[] = [route, ...routeAliases];
    const isAuth = false; // TODO: connect into store

    if (isAuth && isOnlyGuest) {
        return <Redirect to={getMainPage()} />;
    }

    return (
        <>
            {routes.map((item) => (
                <Route
                    key={item}
                    exact={exact}
                    component={component}
                    path={item}
                />
            ))}
        </>
    );
};
