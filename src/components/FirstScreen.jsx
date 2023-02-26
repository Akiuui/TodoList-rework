import React from "react";
import { useNavigate } from "react-router-dom";

function FirstScreen() {
    const navigate = useNavigate();

    function handleBtnSign() {
        navigate('/sign')
    }
    function handleBtnLog() {
        navigate('/login')
    }

    return <div className="w-screen h-screen font-body flex flex-col items-center justify-center">

        <div className="w-screen h-[3.75rem] absolute top-0 flex justify-end">

            <button onClick={handleBtnLog} className=" border-black my-3 px-2 font-semibold rounded-md hover:bg-gray-200">Log in</button>
            <button onClick={handleBtnSign} className="text-xl font-medium text-white rounded-md bg-blue-700 my-2 mr-20 ml-8 px-4 py-2 hover:bg-blue-800">Get Started</button>

        </div>


        <div className=" w-[50%] text-center">
            <p className="font-bold text-6xl">Organize your<br /> work and life, finally.</p>
            <p className="my-4 font-medium text-lg">Become focused, organized, and calm with<br /> Todoist. The world’s #1 task manager and to-do<br /> list app.</p>
            <button onClick={handleBtnSign} className="text-xl font-medium text-white rounded-md bg-blue-700 my-4 px-4 py-2 hover:bg-blue-800">Get Started</button>
        </div>



    </div>;
}

export default FirstScreen;
