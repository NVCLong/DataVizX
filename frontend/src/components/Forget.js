import { useState } from 'react';
import { forgetFields } from "../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import { forgetPassword } from '../api/api';

const fields = forgetFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Forget() {
    const [forgetState, setForgetState] = useState(fieldsState);
    const [error, setError] = useState(null);  // state to handle errors

    const handleChange = (e) => {
        setForgetState({ ...forgetState, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const data = await forgetPassword(forgetState['forgot-password']);
          console.log(data);
          // handle successful password reset here
          alert('Password reset successful! Please check your email for further instructions.');
        } catch (error) {
          console.error(error);
          // handle failed password reset here
          setError('Password reset failed. Please try again.');
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
            {error && <p>{error}</p>}
            <FormAction handleSubmit={handleSubmit} text="FORGET" />
        </form>
    );
}
