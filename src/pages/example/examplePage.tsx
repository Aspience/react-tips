import React, { FC } from 'react';

import { FooContext } from '@src/store/hors/withFoo/context/context';
import { ComponentContainer } from '@src/components/component';

export const ExamplePage: FC = () => {
    return (
        <>
            <FooContext.Provider value={{ reducerName: 'bar' }}>
                <ComponentContainer />
            </FooContext.Provider>
            <FooContext.Provider value={{ reducerName: 'baz' }}>
                <ComponentContainer />
            </FooContext.Provider>
        </>
    );
};
