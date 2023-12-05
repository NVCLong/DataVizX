import * as React from "react";
export default function Form() {
    return (
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-300">
            <h1 className="text-5xl font-semibold">DataVizX</h1>
            <p className="font-medium text-lg text-gray-500 mt-4">Welcome back! Please enter your details.</p>
            <div className="mt-8">
                <div>
                    <label className="text-lg font-medium" htmlFor="email">Email</label>
                    <input className="w-full border-2 border-gray-300 focus:outline-none focus:border-indigo-500 rounded-md py-2 px-4 mt-2"
                    type="email"
                    placeholder="Enter your email" />
                </div>

                <div>
                <label className="text-lg font-medium" htmlFor="password">Password</label>
                    <input className="w-full border-2 border-gray-300 focus:outline-none focus:border-indigo-500 rounded-md py-2 px-4 mt-2"
                    type="password"
                    placeholder="Enter your password" />
                </div>
                <div className="mt-8 flex justify-between items-center">
                    <div>
                        <input
                        type="checkbox"
                        id="remember" />
                        <label className="ml-2 font-medium text-base" htmlFor="remember">Don't ask again</label>
                    </div>
                    <button className="font-medium text-base text-violet-500">Forgot password</button>
                </div>

                <div className="mt-8 flex flex-col gap-y-4">
                    <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-violet-500 text-white text-lg font-bold"> Login </button>
                </div>

                <div className="mt-8 flex justify-center items-center">
                    <p className="font-medium text-base">Don't have an account?</p>
                    <button className="font-medium text-base text-violet-500 ml-2">Sign up</button>
                </div>
            </div>
        </div>
    )
}
