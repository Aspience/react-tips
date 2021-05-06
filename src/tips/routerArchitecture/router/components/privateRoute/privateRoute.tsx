import React, { FC } from 'react';
import { Redirect, Route } from 'react-router';

import { PageProps } from '../page/types';
import { getLoginPage } from '@tips/routerArchitecture/router/pages/utils/getLoginPage';

export const PrivateRoute: FC<{ page: PageProps }> = ({
    page: { route, routeAliases = [], exact, isPrivate, component },
}) => {
    const routes: string[] = [route, ...routeAliases];
    const isAuth = false; // TODO: connect into store

    if (!isAuth && isPrivate) {
        return <Redirect to={getLoginPage()} />;
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
