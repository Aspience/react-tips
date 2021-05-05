import { Reducer } from 'redux';
import { cloneDeep } from 'lodash';

import { decapsulateAction } from '../../helpers/decapsulateAction';

import { Config, FooState, StateWithFoo } from './types';
import { Actions } from './actions';

//region Reducer state
const initialState: FooState = {
    data: {
        foo: '',
    },
    selected: [],
    saved: [],
    selectedModified: false,
    loading: false,
    error: null,
};

export const withFooInitialState = <T>(
    baseInitialState: Exclude<T, '_foo'>
): T & StateWithFoo => {
    return {
        ...baseInitialState,
        _foo: cloneDeep(initialState),
    };
};
//endregion

//region HOR
export const withFooReducer = <S extends StateWithFoo>(config: Config) => (
    baseReducer: Reducer<S>
) => (state: S, nativeAction: Actions): S => {
    let newState = state;
    const { reducerName } = config;
    const action = decapsulateAction(`${reducerName}/_foo/`, nativeAction);

    switch (action.type) {
        case 'clear':
            newState = {
                ...newState,
                _foo: {
                    ...state._foo,
                    selected: [],
                },
            };
            break;
        case 'save':
            newState = {
                ...newState,
                _foo: {
                    ...state._foo,
                    saved: state._foo ? [...state._foo.selected] : [],
                },
            };
            break;
        case 'searchStart':
            newState = {
                ...newState,
                _foo: {
                    ...state._foo,
                    loading: true,
                    error: null,
                },
            };
            break;
        case 'searchSuccess':
            newState = {
                ...newState,
                _foo: {
                    ...state._foo,
                    data: action.result,
                    error: null,
                },
            };
            break;
        case 'searchFailure':
            newState = {
                ...newState,
                _foo: {
                    ...state._foo,
                    loading: false,
                    error: action.message,
                },
            };
            break;
    }

    return baseReducer(newState, action);
};
//endregion
