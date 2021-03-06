import { StringSchema } from 'yup';
import { CheckEmailMethodConfig } from '@src/validation/validators/checkEmail';

declare module 'yup' {
    interface StringSchema<T> {
        checkEmail(messageTaken: CheckEmailMethodConfig): StringSchema<T>;
    }
}
