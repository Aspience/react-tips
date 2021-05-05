import { RootState } from '../tips/extendReducer/store/types';

declare module 'react-redux' {
    interface DefaultRootState extends RootState {}
}
