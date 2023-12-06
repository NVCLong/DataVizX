export default function FormAction({
    handleSubmit,
    type='Button',
    action='submit',
    text
}){
    return(
        <>
        {
            type==='Button' ?
            <button
                type={action}
                className="group relative w-full flex justify-center px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-purple-500 hover:scale-[1.01] ease-in-out active:scale-[.98] active:duration-75 transition-all py-3 mt-10 drop-shadow-lg"
                onSubmit={handleSubmit}
            >
                {text}
            </button>
            :
            type==='ForgotPassword' ?
            <form onSubmit={handleSubmit}>
                <button
                    type={action}
                    className="group relative w-full flex justify-center px-4 border border-transparent text-sm font-medium rounded-xl text-white hover:scale-[1.01] ease-in-out active:scale-[.98] active:duration-75 transition-all py-3 mt-1 drop-shadow-lg"
                >
                    {text}
                </button>
            </form>
            :
            <></>
        }
        </>
    )
}
