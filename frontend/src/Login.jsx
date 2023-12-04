import React, {useState} from 'react';
import { Register } from './Register';
export const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        // Prevents default behaviour of submit button
        e.preventDefault();
        console.log("Email: " + email);
    }
    return (
        <div className='auth-form-container'>
            <form className='login-form' onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="studentID@hcmiu.edu.vn" id="email" name="email"/>

            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="***************" id="password" name="password"/>

            <button type="submit">Login</button>
        </form>

        <button onClick={ () => props.onFormSwitch('Register')}>Don't have an account? Register here.</button>

        </div>

    )
}
