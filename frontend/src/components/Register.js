import { useState } from 'react';
import { registerFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";

const fields=registerFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Register(){
  const [registerState,setRegisterState]=useState(fieldsState);

  const handleChange=(e)=>setRegisterState({...registerState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(registerState)
    createAccount()
  }

  //handle Signup API Integration here
  const createAccount=()=>{

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
