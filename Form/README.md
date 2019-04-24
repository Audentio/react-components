# < Form >

To reduce boilerplate, Form automatically passes handlers and states to input fields.
Input fields are identified by name prop (any element in form that has name prop passed will be treated like input unless it's a label or a non-input html element).

Form can be controlled by `onChange` and `value` props if you want to store state in parent component. However, in most cases just using `onSubmit` should suffice as you only need the data for some async action on submit.

```jsx
<Form
    onSubmit={({ value }) => {
        console.log('username:', value.username);
        console.log('website:', value.website);
    }}
>
    <Input type="text" name="username" />
    <Input type="url" name="website" />

    <Button type="submit">Submit</Button>
</Form>
```

## Transforming values

Some inputs might need to store value in a different format like immutable for faster access onChange.
To make sure this value gets converted/serialized before submission, add a static method called `getSubmitValue` on your Input components

This avoids having to transform value onChange which can cause performance issues if transform is expensive (usually is)

```jsx
class MyInput extends Component<MyInputProps> {
    static getSubmitValue = (value, props) => {
        return value.toString();
    }
```

## Validation

Form handles validation for its fields. This is facilitated by the `schema` prop on Input fields (no change is required on the input field itself for this, other than adding proper type so TS doesnt throw errors).

**`schema` prop**

schema prop must be `yup` schema. `utils.inputSchemas` contains some defaults like email, username, password

```jsx
import { number } from 'yup';
import { inputSchemas } from 'utils';

<Input schema={inputSchemas.email} name="email" />
<Input schema={number().lessThan(5)} name="custom" />
```

### Validating with `ref(fieldname: string)`

Sometimes you want to use another field's value in validation (e.g. password confirmation)

```jsx
import { string } from 'yup';
import { inputSchemas } from 'utils';

<Form>
    <Input name="mypasswordfield" schema={inputSchemas.password} />
    <Input name="confirmpassword" schema={string().oneOf([ref('mypasswordfield'), 'Passwords must match'])} />
</Form>;
```

**How does this even work?**

Form creates an object shape using schema props from all fields and uses that shape to validate the whole form state. This allows us to use object context reference. Read more here https://github.com/jquense/yup#yuprefpath-string-options--contextprefix-string--ref

## TODO

-   Count total fields and automatically set "touchedAll" so submit button is disabled as soon as all fields show error
-   On submit scroll to first error field if it's not in viewport
