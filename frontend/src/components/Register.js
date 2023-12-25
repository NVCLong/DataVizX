import { useState } from 'react';
import { registerFields } from "../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import { register } from '../api';  // import the register function

const fields=registerFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id]='');

export default function Register(){
  const [registerState,setRegisterState]=useState(fieldsState);

  const handleChange=(e)=>setRegisterState({...registerState,[e.target.id]:e.target.value});

  const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      const data = await register(registerState.username, registerState['email-address'], registerState.password);
      console.log(data);
      // handle successful registration here
    } catch (error) {
      console.error(error);
      // handle failed registration here
    }
  }

  return(
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {
          fields.map(field=>
            <Input
              key={field.id}
              handleChange={handleChange}
              value={registerState[field.id]}
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
        <FormAction handleSubmit={handleSubmit} text="SIGNUP" />
      </div>
    </form>
  )
}
