import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { login } from '../api';  // import the login function

const fields=loginFields;
let fieldsState = {};

fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
          const data = await login(loginState['email-address'], loginState.password);
          console.log(data);
          // handle successful login here
        } catch (error) {
          console.error(error);
          // handle failed login here
        }
    }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />

                )
            }
        </div>

        <FormExtra/>
        <FormAction handleSubmit={handleSubmit} text="LOGIN"/>

      </form>
    )
}
