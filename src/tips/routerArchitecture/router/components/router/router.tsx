import React, { FC } from 'react';
import { Switch } from 'react-router';

import { pages } from '../../pages';
import { PrivateRoute } from '../../components/privateRoute';
import { PublicRoute } from '../../components/publicRoute';

export const Router: FC = () => {
    return (
        <Switch>
            {pages.map((page) =>
                page.isPrivate ? (
                    <PrivateRoute key={page.name} page={page} />
                ) : (
                    <PublicRoute key={page.name} page={page} />
                )
            )}
        </Switch>
    );
};
