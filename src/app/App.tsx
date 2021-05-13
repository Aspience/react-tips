import React, { FC } from 'react';
import { Router as RouterSource } from 'react-router';
import { Helmet } from 'react-helmet';

import { Router } from '@src/router/components/router';
import { History } from '@src/router/utils/createHistory';

const history = new History();

export const App: FC = () => {
    return (
        <RouterSource history={history.getHistory()}>
            <Helmet defaultTitle="Page" titleTemplate="%s - Application" />
            <Router />
        </RouterSource>
    );
};
