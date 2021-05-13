import { useCallback } from 'react';

import { useEncapsulatedDispatch } from './helpers/useEncapsulatedDispatch';
import {
    clearAction,
    saveAction,
    searchFailureAction,
    searchSuccessAction,
} from './actions';
import { useSearchApi } from './api';

export const useSearchFooService = () => {
    const dispatch = useEncapsulatedDispatch();
    const search = useSearchApi();

    return useCallback(() => {
        return search()
            .then((data) => {
                dispatch(searchSuccessAction(data));
                return data;
            })
            .catch((e) => {
                dispatch(searchFailureAction(e.message));
            });
    }, [dispatch, search]);
};

export const useClearFoo = () => {
    const dispatch = useEncapsulatedDispatch();

    return useCallback(() => {
        dispatch(clearAction());
    }, [dispatch]);
};

export const useSaveFoo = () => {
    const dispatch = useEncapsulatedDispatch();

    return useCallback(() => {
        dispatch(saveAction());
    }, [dispatch]);
};
