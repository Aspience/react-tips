import { Action } from 'redux';

export const encapsulateAction = <T extends Action>(
    encapsulateTerm: string,
    action: T
): T => ({ ...action, type: `${encapsulateTerm}${action.type}` });
