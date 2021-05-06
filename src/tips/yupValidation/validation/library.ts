import * as Yup from 'yup';

import { checkEmail } from './validators/checkEmail';

const YupCustom = Yup;

// paste a custom validators here
[checkEmail].forEach((validator) => {
    YupCustom.addMethod(validator.type, validator.name, validator.method);
});

export { YupCustom };
