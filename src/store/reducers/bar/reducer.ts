import { Reducer, compose } from 'redux';

import { BarState } from './types';
import { withFooInitialState, withFooReducer } from '../../hors/withFoo';

const initialState = withFooInitialState<BarState>({
    property: 'value',
});

const barReducerBase: Reducer<BarState> = (state = initialState, action) => {
    switch (action) {
        default:
            return state;
    }
};

export const barReducer = compose<Reducer<BarState>>(
    withFooReducer({ reducerName: 'bar' })
)(barReducerBase);
