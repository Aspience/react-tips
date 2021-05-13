import { Action } from 'redux';

export const searchStartAction = (): Action<'searchStart'> => ({
    type: 'searchStart',
});

export const searchSuccessAction = (
    result: any
): Action<'searchSuccess'> & { result: any } => ({
    type: 'searchSuccess',
    result,
});

export const searchFailureAction = (
    message: string
): Action<'searchFailure'> & { message: string } => ({
    type: 'searchFailure',
    message,
});

export const clearAction = (): Action<'clear'> => ({
    type: 'clear',
});

export const saveAction = (): Action<'save'> => ({
    type: 'save',
});

export type Actions =
    | ReturnType<typeof searchStartAction>
    | ReturnType<typeof searchSuccessAction>
    | ReturnType<typeof searchFailureAction>
    | ReturnType<typeof clearAction>
    | ReturnType<typeof saveAction>;
