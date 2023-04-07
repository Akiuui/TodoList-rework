import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/ContextAuth'

function FirstScreen() {

    const { setDarkMode, setLightMode } = useContext(UserContext);

    useEffect(() => { // THIS IS THE FIRST ELEMENT TO RENDER
        if (localStorage.getItem('selectedTheme') === 'dark')
            setDarkMode();
        else
            setLightMode();

    }, [])


    const navigate = useNavigate();

    function handleBtnSign() {
        navigate('/sign')
    }
    function handleBtnLog() {
        navigate('/login')
    }

    return <div className="w-screen h-screen bg-background-primary font-body flex flex-col items-center justify-center">

        {/*BANNER THATS HAS TWO BUTTONS, LOGIN AND SIGNUP*/}
        <div className="w-screen h-[3.75rem] absolute top-[15px] flex justify-end">
            <button onClick={handleBtnLog} className="border-black text-font-color text-sm sm:text-xl my-3 px-2 font-semibold rounded-md hover:bg-background-secondary">Log in</button>
            <button onClick={handleBtnSign} className="text-md sm:text-xl font-medium text-white rounded-md bg-color-primary my-2 mr-4 sm:mr-10 ml-4 sm:ml-8 px-2 sm:px-4 py-0 sm:py-2 hover:bg-color-primary-hover">Get Started</button>
        </div>

        {/*SECTION THAT HAS THE TEXT AND SIGNUP*/}
        <div className=" w-[100%] sm:w-[70%] text-center 2xl:w-[100%]">
            <p className="font-bold text-font-color text-3xl sm:text-6xl">Organize your<br /> work and life, finally.</p>
            <p className="my-4 text-font-color font-medium text-xs sm:text-xl 2xl:text-xl">Become focused, organized, and calm with<br /> Todoist. The world’s #1 task manager and to-do<br /> list app.</p>
            <button onClick={handleBtnSign} className="text-xl font-medium text-white rounded-md bg-color-primary my-4 px-4 py-2 hover:bg-color-primary-hover">Get Started</button>
        </div>



    </div>;
}

export default FirstScreen;
