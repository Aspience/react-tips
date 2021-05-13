import { useSelector } from 'react-redux';

import { useWithFooContext } from './context/useWithFooContext';
import { FooState } from './types';

export const useFooState = (): FooState => {
    const { reducerName } = useWithFooContext();
    const appState = useSelector((state) => state);

    if (reducerName === null) {
        throw new Error(
            'Reducer name cannot be a `null`. Please check WithFooContext.Provider props'
        );
    }
    const fooState = appState[reducerName]._foo;

    if (!fooState) {
        throw new Error(
            `Wrap your reducer ${reducerName} via "withFooReducer" HOR`
        );
    }

    return fooState;
};
