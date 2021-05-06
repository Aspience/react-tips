import * as Yup from 'yup';

export type CheckEmailMethodConfig = {
    takenMessage: string;
    defaultMessage?: string;
};

type ErrorResponse = {
    response: {
        data: {
            errorKey: 'EMAIL_EXISTS';
        };
    };
};

const validatorName = 'checkEmail';
const checkEmail = {
    name: validatorName,
    type: Yup.string,
    method: (config: CheckEmailMethodConfig) => {
        const processedList = new Map();

        return Yup.string().test(
            validatorName,
            config,
            function validateEmail(value) {
                if (!value) {
                    return true;
                }
                if (processedList.has(value)) {
                    return processedList.get(value);
                }

                return fetch(`/auth/check-email/?email=${value}`, {
                    method: 'get',
                })
                    .then(() => {
                        processedList.set(value, true);
                        return true;
                    })
                    .catch((error: ErrorResponse) => {
                        const { errorKey } = error.response.data;
                        let message;

                        switch (errorKey) {
                            case 'EMAIL_EXISTS':
                                message = config.takenMessage;
                                break;
                            default:
                                message =
                                    config.defaultMessage ||
                                    'Email is not valid. Please, contact support';
                        }

                        const yupError = this.createError({
                            path: this.path,
                            message,
                        });
                        processedList.set(value, yupError);

                        return yupError;
                    });
            }
        );
    },
};

export { checkEmail };
