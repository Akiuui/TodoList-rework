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
        <div className="w-screen h-[3.75rem] absolute top-0 flex justify-end">
            <button onClick={handleBtnLog} className="border-black text-font-color my-3 px-2 font-semibold rounded-md hover:bg-background-secondary">Log in</button>
            <button onClick={handleBtnSign} className="text-xl font-medium text-white rounded-md bg-color-primary my-2 mr-20 ml-8 px-4 py-2 hover:bg-color-primary-hover">Get Started</button>
        </div>

        {/*SECTION THAT HAS THE TEXT AND SIGNUP*/}
        <div className=" w-[50%] text-center">
            <p className="font-bold text-font-color text-6xl">Organize your<br /> work and life, finally.</p>
            <p className="my-4 text-font-color font-medium text-lg">Become focused, organized, and calm with<br /> Todoist. The world’s #1 task manager and to-do<br /> list app.</p>
            <button onClick={handleBtnSign} className="text-xl font-medium text-white rounded-md bg-color-primary my-4 px-4 py-2 hover:bg-color-primary-hover">Get Started</button>
        </div>



    </div>;
}

export default FirstScreen;
