import { StateWithFoo } from '../hors/withFoo/types';
import { BarState } from '../reducers/bar/types';

export type BaseReducerState = StateWithFoo;

interface BazState extends BaseReducerState {
    bar: string;
    baz: string;
}

export type RootState = {
    bar: BarState;
    baz: BazState;
};
