import { passProps } from '@audentio/utils/src/passProps';
import { throttle } from '@audentio/utils/src/throttle';
import React, { Component } from 'react';
import { FormProps, FormState, FormValue } from './types';

const initialFormState: FormState = {
    isValid: true,
    touchedAll: false,
    value: {},
    errors: {},
    touched: {},
};

/**
 * [click here](https://github.com/Audentio/react-components/blob/master/app/components/Form/README.md) for documentation
 *
 * @param {Function} onSubmit called with form data when form is submitted
 * @param {boolean} debug will render serliazed form state if true
 * @param {Function} onChange called whenever any field changes
 * @param {object} value pass to render controlled form and manage state yourself
 */
export class Form extends Component<FormProps, FormState> {
    static getDerivedStateFromProps(nextProps: FormProps, prevState: FormState) {
        // if value is passed we need to update local state to use it
        if (nextProps.value) {
            return {
                value: nextProps.value,
            };
        }

        return {};
    }

    state = initialFormState;

    componentDidMount() {
        const { initialValue, onChange } = this.props;

        // update form value to use initialValue
        if (initialValue && Object.keys(initialValue).length > 0) {
            if (onChange) {
                onChange({
                    value: initialValue,
                    isUserInput: false,
                });
            } else {
                // eslint-disable-next-line
                this.setState({
                    value: initialValue,
                });
            }
        }
    }

    componentWillUnmount() {
        clearTimeout(this.formUpdateTimer);
    }

    // validator object shape
    validator: { [name: string]: import('yup').Schema<any> } = {};

    __formRef: React.RefObject<HTMLFormElement> = React.createRef();

    formUpdateTimer: NodeJS.Timer = null;

    formID: string = Math.random()
        .toString(32)
        .slice(2);

    /**
     * map form children and pass required props to form fields (anything with name prop)
     *
     * @param children Form children
     * @param initial Initial call. lets us reset validator
     */
    renderFields(children: React.ReactNode, initial?: boolean): React.ReactNode {
        if (initial) {
            this.validator = {};
        }

        return React.Children.map(children, (child: React.ReactElement<any>) => {
            if (typeof child !== 'object' || child === null) {
                // not a react component/element
                // render as-is
                return child;
            }

            // child is input
            // because why would you ever pass name to anything else :D
            if (child.props.name) {
                const { value: formValue } = this.state;
                const { name, schema } = child.props;

                // if value in state is undefined, try using initialValue
                const value =
                    formValue[child.props.name] === undefined ? child.props.initialValue : formValue[child.props.name];

                if (schema) {
                    // add input schema to validator
                    this.validator[name] = schema;
                }

                // pass error to field if form is invalid
                let errors = [];
                const isTouched = this.state.touched[child.props.name] || this.state.touchedAll;

                // Errors prop is passed
                if (this.props.errors) {
                    const errorContainer = this.props.errors[child.props.name];

                    if (errorContainer && errorContainer.length) {
                        const [errorValue, fieldErrors] = errorContainer;

                        // current value matches error value
                        // show errors for that value
                        if (value === errorValue) {
                            errors = fieldErrors || [];
                        }
                    }
                }

                if (!this.state.isValid && isTouched) {
                    const _errors = this.state.errors[child.props.name];

                    if (_errors) {
                        errors = errors.concat(this.state.errors[child.props.name]);
                    }
                }

                // pass child in to detect initial value onChange
                const onChange = childValue => this.onFieldChange(childValue, child);

                return React.cloneElement(child, {
                    onChange,
                    noValidate: true, // disable native validation
                    errors: !this.props.disabled && !child.props.disabled && errors,
                    isFetching: this.props.isFetching || child.props.isFetching,

                    // render isFetching as disabled, until all input fields support isFetching
                    // TODO: maybe change this in the future
                    disabled: this.props.disabled || child.props.disabled || this.props.isFetching,

                    // allow inputs to trigger a form update
                    // reads values from all inputs and triggers onChange on form
                    triggerFormUpdate: this.updateForm,

                    id: `${this.formID}__${child.props.name}`,

                    value,
                });
            }

            // disable submit button if form value is invalid
            // @ts-ignore
            if (child.type && child.type.name === this.props.buttonTypeName && child.props.type === 'submit') {
                return React.cloneElement(child, {
                    disabled:
                        (!this.state.isValid && this.state.touchedAll) || this.props.disabled || child.props.disabled,
                    isFetching: this.props.isFetching,
                });
            }

            // no need to waste cycles on non-input nodes with no nested children
            if (typeof child.props.children !== 'object') {
                return child;
            }

            // recurse until we hit inputs or string children
            return React.cloneElement(child, {
                children: this.renderFields(child.props.children),
            });
        });
    }

    /**
     * Form fields may be removed based on many factors
     * this function gets rid of removed field's values from form value
     * so we can submit data without manually filtering
     */
    getSubmitValue(__formValue?: FormValue, __children?: React.ReactChild) {
        const children = __children === undefined ? this.props.children : __children;
        let formValue = __formValue || {};

        React.Children.forEach(children, (child: any) => {
            if (typeof child !== 'object' || child === null) {
                // not a react component/element
                return;
            }

            // a wild input appeared
            if (child.props.name) {
                const { name, skipOnSubmit } = child.props;

                let value = this.state.value[name];

                // use Input's own value transformer
                if (child.type && child.type.getSubmitValue) {
                    value = child.type.getSubmitValue(value, child.props);
                }

                if (!skipOnSubmit) {
                    formValue[name] = value;
                }

                return;
            }

            // no need to recurse further
            if (typeof child.props.children !== 'object') {
                return;
            }

            // recurse
            React.Children.forEach(child.props.children, nestedChild => {
                const values = this.getSubmitValue(formValue, nestedChild);

                if (values && typeof values === 'object') {
                    formValue = Object.assign(formValue, values);
                }
            });
        });

        return formValue;
    }

    // update form and read values from input
    // used for input autofill fix
    updateForm = () => {
        if (this.__formRef && !this.formUpdateTimer && this.__formRef.current) {
            // update form in 300ms
            // assuming autofill finishes within this window
            this.formUpdateTimer = setTimeout(() => {
                const inputs = this.__formRef.current.querySelectorAll(`input[id*="${this.formID}"]`);

                const newValue = Object.assign({}, this.state.value);

                if (!inputs.length) return;

                [].forEach.call(inputs, (input: HTMLInputElement) => {
                    const inputName = input.getAttribute('id').replace(`${this.formID}__`, '');

                    newValue[inputName] = input.value;
                });

                const { onChange } = this.props;

                if (onChange) {
                    // Controlled form. call onChange to trigger update
                    // we'll still use value from state (since it's updated by getDerivedStateFromProps)
                    onChange({
                        value: newValue,
                        isValid: false,
                        isUserInput: true,
                    });
                } else {
                    // uncontrolled form
                    // manage own state
                    this.setState({
                        value: newValue,
                    });
                }

                // reset timer
                clearTimeout(this.formUpdateTimer);
                this.formUpdateTimer = null;
            }, 300);
        }
    };

    onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const { onSubmit } = this.props;

        e.preventDefault();
        e.stopPropagation();

        // make sure form value is valid
        const { isValid, errors } = await this.getValidation(this.state.value);

        if (isValid) {
            if (onSubmit) {
                onSubmit({
                    value: this.getSubmitValue(),
                });
            }
        } else {
            this.setState({
                isValid,
                errors,
                touchedAll: true,
            });
        }
    };

    onReset = (e: React.FormEvent<HTMLFormElement>) => {
        const { onReset, onChange, initialValue } = this.props;

        if (onReset) onReset(e);

        if (!e.defaultPrevented) {
            if (onChange) {
                onChange({ value: initialValue || {}, isUserInput: true });
            } else {
                this.setState(initialFormState);
            }
        }
    };

    /**
     * Convert validationErrors into object of input name keys and error values
     * this way we don't have to validation.inner.find() in renderFields
     */
    getValidationState(validationErrors) {
        const errors = {};

        validationErrors.inner.forEach(field => {
            errors[field.path] = field.errors;
        });

        return errors;
    }

    /**
     * Validate form using objectschema generated by `renderFields`
     */
    getValidation(value: FormValue): Promise<{ isValid: boolean; errors: any }> {
        return new Promise(resolve => {
            // quit early if there's nothing to validate
            if (Object.keys(this.validator).length === 0) {
                resolve({ isValid: true, errors: null });
                return;
            }

            import('yup')
                .then(yup => {
                    return yup.object().shape(this.validator);
                })
                .then(formSchema => {
                    formSchema
                        .validate(value, { abortEarly: false })
                        .then(() => {
                            const result = {
                                isValid: true,
                                errors: null,
                            };

                            this.setState(result);
                            resolve(result);
                        })
                        .catch(validationErrors => {
                            const result = {
                                isValid: false,
                                errors: this.getValidationState(validationErrors),
                            };

                            this.setState(result);
                            resolve(result);
                        });
                });
        });
    }

    /**
     * validate form and update state
     * throttled so it can be called on fast-triggering events
     */
    validate: (value: FormValue) => void = throttle(async value => {
        const { isValid, errors } = await this.getValidation(value);

        this.setState({ isValid, errors });
    }, 500);

    onFieldBlur = ({ name }) => {
        this.setState(state => ({
            touched: Object.assign({}, state.touched, {
                [name]: true,
            }),
        }));

        this.validate(this.state.value);
    };

    /**
     * Field change handler
     * - is passed to every form field by `renderFields` method
     * - called by form fields when change occurs
     */
    onFieldChange = ({ name, value }, ele) => {
        const { onChange } = this.props;

        const newValue: FormValue = Object.assign({}, this.state.value, {
            [name]: value,
        });

        setTimeout(() => {
            // need to run validation *after* the update from field change
            // since that can potentially change schema
            // if anyone has better ideas i'm all ears - tushar
            this.validate(newValue);
        }, 100);

        if (onChange) {
            // Controlled form. call onChange to trigger update
            // we'll still use value from state (since it's updated by getDerivedStateFromProps)
            onChange({
                value: newValue,
                name,
                isValid: false,
                isUserInput: true,
            });
        } else {
            // uncontrolled form
            // manage own state
            this.setState({
                value: newValue,
            });
        }
    };

    /**
     * Render state as indented JSON
     * <pre> to preserve whitespace
     */
    renderDebugState() {
        return <pre>{JSON.stringify(this.state, null, 4)}</pre>;
    }

    render() {
        const { children, debug, className, style: inlineStyle, autoComplete, formless = false, ...rest } = this.props;
        /** noValidate to disable native validation. we'll use our own thank you very much */

        if (formless) {
            return (
                <div style={inlineStyle} className={className}>
                    {this.renderFields(children, true)}

                    {debug && __DEV__ && this.renderDebugState()}
                </div>
            );
        }

        return (
            <form
                ref={this.__formRef}
                style={inlineStyle}
                className={className}
                noValidate
                onReset={this.onReset}
                onSubmit={this.onSubmit}
                autoComplete={autoComplete}
                {...passProps(rest)}
            >
                {this.renderFields(children, true)}

                {debug && __DEV__ && this.renderDebugState()}
            </form>
        );
    }
}
