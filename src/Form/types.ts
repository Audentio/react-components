import { Schema } from 'yup';

export interface FormValue {
    [key: string]: any;
}

export interface formCallback {
    value: FormValue;
    name?: string;
    submitValue?: FormValue;
    isValid?: boolean;
    isUserInput?: boolean;
}

export interface FormProps {
    children: React.ReactNode;

    /**
     * __isFetching__
     *
     * Passes isFetching to all form fields (and submit button)
     * Input components need to handle fetch state
     */
    isFetching?: boolean;

    /**
     * __disabled__
     *
     * Passes isFetching to all form fields (buttons)
     * Input components need to handle disabled state
     */
    disabled?: boolean;

    /**
     * __value__
     *
     * Object that holds form data. Pass it to render controlled form.
     * If not passed, form will manage its own state
     */
    value?: FormValue;

    /**
     * __initialValue__
     *
     * Initial value for form. Only used at mount, does not get used once form is mounted
     * on mount it becomes form value
     */
    initialValue?: FormValue;

    /**
     * __onSubmit__
     *
     * @param {Object} value – form data object
     * @param {boolean} isValid - is form valid
     */
    onSubmit?: (args: formCallback) => void;

    autoComplete?: string;

    /**
     * __onReset__
     *
     * @param {Object} e – event object
     */
    onReset?: (e: React.FormEvent<HTMLFormElement>) => void;

    /**
     * __onChange__
     *
     * @param {Object} value – form data object
     * @param {boolean} isValid - is form valid
     */
    onChange?: (args: formCallback) => void;

    /**
     * Debug mode
     * renders serialized form state at end of form
     */
    debug?: boolean;

    className?: string;
    style?: React.CSSProperties;

    // Errors object
    // generally server-side errors
    errors?: FormErrors;

    formless?: boolean;
    handleDots?: boolean;

    /**
     * Define Button.type.name
     * @default - button
     */
    buttonTypeName?: string;
}

export interface FormErrors {
    // formFieldName: [errorValue, [errorStrings]]
    [name: string]: [string, Array<string>];
}

export interface FormState {
    value: FormValue;
    errors: Object;
    touched: Object;
    touchedAll: boolean;
    isValid: boolean;
}

export interface FormFieldProps {
    name: string;
    disabled?: boolean;

    /**
     *
     * Validation schema
     * not used directly by input. <Form> uses it for validation
     */
    schema?: Schema<any>;

    /**
     * Validation errors
     * array of error messages
     */
    errors?: Array<string>;

    onChange?: (d: { name: string; value: any }) => void;
    onBlur?: Function;
    triggerFormUpdate?: Function;

    /**
     * Skip value in Form's onSubmit prop
     * this lets you use create inputs solely for dynamic fields
     */
    skipOnSubmit?: boolean;
}
