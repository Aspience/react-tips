import { useContext } from 'react';

import { FooContextProps, FooContext } from './context';

export const useWithFooContext = (): FooContextProps => {
    const context = useContext(FooContext);

    if (!context) {
        throw new Error(
            'Cannot find WithReducer context. Please make a sure that you are located on the children of WithReducerProvider'
        );
    }
    return context;
};
