import { Action } from 'redux';

export const decapsulateAction = <T extends Action>(
    encapsulateTerm: string,
    action: T
): T => ({ ...action, type: action.type.replace(encapsulateTerm, '') });
