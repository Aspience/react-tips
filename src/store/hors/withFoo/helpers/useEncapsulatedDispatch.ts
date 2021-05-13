import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { Action } from 'redux';

import { encapsulateAction } from '../../../helpers/encapsulateAction';
import { useWithFooContext } from '../context/useWithFooContext';

export const useEncapsulatedDispatch = () => {
    const dispatch = useDispatch();
    const { reducerName } = useWithFooContext();

    if (reducerName === null) {
        throw new Error(
            'Reducer name cannot be a `null`. Please check WithFooContext.Provider props'
        );
    }

    return useCallback(
        <T extends Action>(action: T) => {
            dispatch(encapsulateAction(`${reducerName}/_foo/`, action));
        },
        [dispatch]
    );
};
