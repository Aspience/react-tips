import React, { FC } from 'react';
import { Router as RouterSource } from 'react-router';
import { Router } from './router/components/router';
import { History } from './router/utils/createHistory';

const App: FC = () => {
    const history = new History();
    return (
        <RouterSource history={history.getHistory()}>
            <Router />
        </RouterSource>
    );
};

export { App };
