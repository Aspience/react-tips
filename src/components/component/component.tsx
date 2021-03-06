import React, { FC, useEffect } from 'react';
import {
    useClearFoo,
    useSaveFoo,
    useSearchFooService,
} from '@src/store/hors/withFoo/services';
import { FooState } from '@src/store/hors/withFoo/types';
import { useFooState } from '@src/store/hors/withFoo/states';

const Component: FC<{
    data: FooState;
    onSave: () => void;
    onClear: () => void;
}> = () => {
    return <div>ComponentFoo</div>;
};

export const ComponentContainer: FC = () => {
    useEffect(() => {
        search();
    }, []);

    const state = useFooState();
    const search = useSearchFooService();
    const saveHandler = useSaveFoo();
    const clearHandler = useClearFoo();

    return (
        <Component data={state} onSave={saveHandler} onClear={clearHandler} />
    );
};
