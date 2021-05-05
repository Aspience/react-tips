import { createContext } from 'react';

import { RootState } from '../../../types';

export type FooContextProps = {
    reducerName: keyof RootState | null;
};

export const FooContext = createContext<FooContextProps>({
    reducerName: null,
});
