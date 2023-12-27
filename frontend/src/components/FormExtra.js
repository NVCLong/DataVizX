export default function FormExtra(){
        return(
                <div className="flex items-center justify-between drop-shadow-lg">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4"
                    />

                    <label htmlFor="remember-me" className="text-1xl ml-2 text-white rounded-lg border-gray-300 focus:ring-cyan-600">
                        Don't ask again
                    </label>
                </div>

                <div>
                    <a href="/forget" className="text-1xl text-neutral-300 hover:text-cyan-200 drop-shadow-lg">
                        Forgot your password?
                    </a>
                </div>
            </div>

        )
}
