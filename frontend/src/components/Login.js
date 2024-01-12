import { useEffect, useState } from "react";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const fields = loginFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.name] = ""));

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState);
    const [error, setError] = useState(null); // state to handle errors
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // state to handle loading status

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // eslint-disable-next-line
            const data = await login(loginState["email"], loginState.password);
            // handle successful login here
            alert("Login successfully!");
            navigate("/ChartListPage");
        } catch (error) {
            setError(error.message);
            console.error(error);
            // handle failed login here
            alert("Login failed. Please try again.");
        }
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {fields.map((field) => (
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
                ))}
            </div>

            {error && <p>{error}</p>}
            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text="LOGIN" />
        </form>
    );
}
