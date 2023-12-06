export default function FormExtra(){
        return(
                <div className="flex items-center justify-between ">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4"
                    />

                    <label htmlFor="remember-me" className="ml-2 block text-sm text-white drop-shadow-lg">
                        Remember me
                    </label>
                </div>

                <div className="text-sm">
                    <a href="/forget" className="font-medium text-white hover:text-purple-500 drop-shadow-lg">
                        Forgot your password?
                    </a>
                </div>
            </div>

        )
}
