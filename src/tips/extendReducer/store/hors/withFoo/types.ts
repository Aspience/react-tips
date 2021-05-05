import { RootState } from '../../types';
import { Result } from '../../../types';

export type Config = {
    reducerName: keyof RootState;
};

export type StateWithFoo = {
    _foo?: FooState;
};

export type FooState = {
    data: Result;
    selected: number[];
    saved: number[];
    selectedModified: boolean;
    loading: boolean;
    error: string | null;
};
