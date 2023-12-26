const loginFields=[
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email-address",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"
    }
]
const forgetFields=[
    {
        labelText:"Forgot Password",
        labelFor:"forgot-password",
        id:"forgot-password",
        name:"forgot-password",
        type:"email",
        autoComplete:"off",
        isRequired:false,
        placeholder:"Enter your email"
    }
]

const registerFields=[
    {
        labelText:"Username",
        labelFor:"username",
        id:"username",
        name:"userName",
        type:"text",
        autoComplete:"username",
        isRequired:true,
        placeholder:"Username"
    },
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email-address",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"
    },
    {
        labelText:"Confirm Password",
        labelFor:"confirm-password",
        id:"confirm-password",
        name:"confirm-password",
        type:"password",
        autoComplete:"confirm-password",
        isRequired:true,
        placeholder:"Confirm Password"
    }
]

export {loginFields,registerFields,forgetFields}
