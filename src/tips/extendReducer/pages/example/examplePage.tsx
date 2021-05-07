import React, { FC } from 'react';

import { FooContext } from '../../store/hors/withFoo/context/context';
import { ComponentContainer } from '../../components';

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
