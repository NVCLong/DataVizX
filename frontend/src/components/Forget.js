import { useState } from 'react';
import { forgetFields } from "../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import { forgetPassword } from '../api';  // import the forgetPassword function

const fields = forgetFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Forget() {
    const [forgetState, setForgetState] = useState(fieldsState);

    const handleChange = (e) => {
        setForgetState({ ...forgetState, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const data = await forgetPassword(forgetState['forgot-password']);
          console.log(data);
          // handle successful password reset here
        } catch (error) {
          console.error(error);
          // handle failed password reset here
        }
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {fields.map((field) => (
                    <Input
                        key={field.id}
                        handleChange={handleChange}
                        value={forgetState[field.id]}
                        labelText={field.labelText}
                        labelFor={field.labelFor}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        isRequired={field.isRequired}
                        placeholder={field.placeholder}
                    />
                ))}
            </div>
            <FormAction handleSubmit={handleSubmit} text="FORGET" />
        </form>
    );
}
