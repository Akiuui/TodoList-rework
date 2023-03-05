import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/ContextAuth";

function LoginRework() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')

    const emailinput = useRef()
    const passwordinput = useRef()
    const loadingcircleref = useRef();
    const loginpref = useRef();
    const submitref = useRef();

    const { signIn } = useContext(UserContext)

    const navigate = useNavigate();

    async function SignIn(e) {
        e.preventDefault();

        try {
            loginpref.current.classList.add('hidden');
            loadingcircleref.current.classList.remove('hidden');
            await signIn(email, password)
            console.log("signed in")

            navigate('/todo')
        } catch (err) {
            loginpref.current.classList.remove('hidden');
            loadingcircleref.current.classList.add('hidden');
            console.log("Ovo je catch greska ", err.message)
            if (err.message === 'Firebase: Error (auth/user-not-found).') {
                alert('User is not found')
            }
            if (err.message === 'Firebase: Error (auth/wrong-password).') {
                alert('The password is not correct')
            }
            if (err.message === 'Firebase: Error (auth/network-request-failed).') {
                alert('Network timeout')
            }
        }
    }

    return <div className="w-screen h-screen bg-gray-300 flex justify-center items-center bg-gradient-to-b from-blue-400 to-blue-600">

        <div className="w-[70%] h-[80%]  shadow-lg bg-white">

            <div className="w-[40%] h-full rounded-r-3xl float-left bg-blue-300">
                Aleksa


            </div>

            <div className="w-[60%]  h-[35%] float-right px-4 pt-6">
                <div tabIndex="0" className="my-4 flex justify-center items-center border-2 border-gray-400 h-[2.5rem] rounded-md bg-white font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg fill="#002bd6" height="1.5625rem" width="1.5625rem" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 210 210" xmlSpace="preserve" stroke="#002bd6"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokelinejoint="round"></g><g id="SVGRepo_iconCarrier"> <path d="M0,105C0,47.103,47.103,0,105,0c23.383,0,45.515,7.523,64.004,21.756l-24.4,31.696C133.172,44.652,119.477,40,105,40 c-35.841,0-65,29.159-65,65s29.159,65,65,65c28.867,0,53.398-18.913,61.852-45H105V85h105v20c0,57.897-47.103,105-105,105 S0,162.897,0,105z"></path> </g></svg>
                    <p className="ml-2 text-md">Continue with Google</p>
                </div>
                <div tabIndex="0" className="my-4 flex justify-center items-center border-2 border-gray-400 h-[2.5rem] rounded-md bg-white font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="#2a10c9"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07" /></svg>
                    <p className="ml-2 text-md">Continue with Facebook</p>
                </div>
                <div tabIndex="0" className="my-4 flex justify-center items-center border-2 border-gray-400 h-[2.5rem] rounded-md bg-white font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="#2a10c9"><path d="M16.46 5.79l.3.01a5.6 5.6 0 0 1 4.38 2.38c-.1.07-2.62 1.53-2.59 4.57.04 3.63 3.19 4.84 3.22 4.86-.02.08-.5 1.72-1.66 3.41-1 1.46-2.04 2.92-3.67 2.95-1.6.03-2.13-.96-3.96-.96-1.84 0-2.42.93-3.94.99-1.57.06-2.78-1.58-3.78-3.04-2.07-2.98-3.64-8.42-1.53-12.1a5.87 5.87 0 0 1 4.97-3c1.55-.03 3.01 1.04 3.96 1.04.95 0 2.73-1.29 4.6-1.1zM16.78 0a5.3 5.3 0 0 1-1.25 3.83 4.46 4.46 0 0 1-3.56 1.7 5.03 5.03 0 0 1 1.27-3.71A5.38 5.38 0 0 1 16.78 0z" /></svg>
                    <p className="ml-2 text-md">Continue with Apple</p>
                </div>

                <div className="flex">
                    <div className="w-[45%] h-[1px] bg-black float-left translate-y-3"></div>
                    <div className="w-[10%] flex justify-center items-center">Or</div>
                    <div className="w-[45%] h-[1px] bg-black float-right translate-y-3"></div>
                </div >


            </div>

            <form onSubmit={(e) => SignIn(e)} className="w-[60%] h-[80%] px-4 py-4 float-right flex flex-col">

                <p className="text-lg mb-2 mt-3 font-semibold">Email:</p>
                <input required onChange={(e) => setEmail(e.target.value)} ref={emailinput} placeholder="Enter your email..." className="mb-4 py-2 rounded-md px-3 border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 " type="email" />

                <p className="text-lg mb-2 font-semibold">Password:</p>
                <input required onChange={(e) => setPassword(e.target.value)} ref={passwordinput} placeholder="Enter your password..." className="mb-8 py-2 rounded-md px-3 border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" type="password" />

                <button type="submit" ref={submitref} className="mx-16 py-3 rounded-md bg-blue-700 text-white text-xl font-semibold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex justify-center ">
                    <p ref={loginpref}>Log in</p>
                    <div id="loadingcircle" ref={loadingcircleref} className="hidden"></div>
                </button>

                <div className="flex py-4">
                    <p className="text-center">Don’t have an account? <Link to={'/sign'} className="underline text-blue-600">Sign up</Link></p>
                </div>
            </form>


        </div>

    </div>;
}

export default LoginRework;
