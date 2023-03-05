import React, { useContext, useEffect, useRef, useState } from "react";
import PrintTodo from "./PrintTodo";
import { auth } from '../FIrebase'
import { UserContext } from '../context/ContextAuth'
import { useNavigate } from "react-router-dom";
function Todo() {
    //STATE
    const [isDelete, setIsDelete] = useState(false);
    // const [plusTodo, setPlusTodo] = useState({});
    const [todo, setTodo] = useState([]);
    const [numberOfDeleted, setNumberofdeleted] = useState(0);
    const [deletedList, setDeletedList] = useState([])
    // const [firstCharOfUser, setFirstCharOfUser] = useState('')
    //REFS
    const plus = useRef();
    const userDropDown = useRef();
    const numberOfDeletedRef = useRef();
    const trashone = useRef();
    const trashtwo = useRef();
    //CONTEXT
    const { darkMode, setDarkMode, logout, user } = useContext(UserContext);
    const navigate = useNavigate();
    //FUNCTIONS

    let firstCharOfUser

    user.displayName ? firstCharOfUser = user.displayName.toUpperCase().charAt(0) : null //Gets the first Char of the Name


    function handleDarkMode() {
        if (darkMode) {

        } else {

        }
        setDarkMode(!darkMode)
    }



    function handleHamburger() {    //Handles the clicking of hamburger icon
        const lines = document.querySelectorAll('.line')
        lines[1].classList.toggle('move-left')
        lines[0].classList.toggle('rotate-down')
        lines[2].classList.toggle('rotate-up')
        //Add your functions
    }
    function handleTrash() {    //Handles clicking on the trash svg
        const trashsvg = document.querySelector('#trashsvg'); /*Gets trash svg*/
        const completedbtn = document.querySelectorAll('#round-btn'); /*Gets the blue round div*/
        const iksbtn = document.querySelectorAll('#iks-btn')    /*Gets X div*/
        const numberOfDeleted = document.querySelector('#numberofdeleted')  //Gets the number inside svg

        trashsvg.classList.toggle('animate__jello');
        trashsvg.classList.toggle('red');
        setTimeout(() => { trashsvg.classList.remove('animate__jello'); }, 500)

        //All round blue divs opacity is set to 0
        completedbtn.forEach((e) => {
            e.classList.toggle('invisible-completed')
        })

        //All X shaped divs opacity is set to 1
        iksbtn.forEach((e) => {
            e.classList.toggle('invisible-completed')
            e.classList.toggle('rotate')
        })

        if (isDelete) {
            console.log("Trash svg prelazi iz crvenog u plavo")

            numberOfDeletedRef.current.style.opacity = 0;
            trashone.current.style.opacity = 1
            trashtwo.current.style.opacity = 1

            // let b = [...todo]

            // console.log('Ovo treba da je isto kao todo: ', b)

            // deletedList.forEach(whatShouldDelete => {
            //     console.log('Ovo treba da se doda ', whatShouldDelete)
            //     let a = b.filter(item => item.id != whatShouldDelete)
            //     b = a
            // })

            const filteredTodo = todo.filter(item => !deletedList.includes(item.id));
            console.log("Ovo je filteredTodo koji postaje todo: ", filteredTodo)

            setTodo(filteredTodo)

            setDeletedList([])
            setNumberofdeleted(0)

        } else {
            numberOfDeletedRef.current.style.transition = '.3s all'
            numberOfDeletedRef.current.style.opacity = 1
            numberOfDeleted.classList.add('animate__jello');
            setTimeout(() => { numberOfDeleted.classList.remove('animate__jello'); }, 500)
            trashone.current.style.opacity = 0
            trashtwo.current.style.opacity = 0

            console.log("nece se obrisati nista")
        }



        setIsDelete(!isDelete); //When trash svg is red it runs handleX function


        //Add your functions
    }
    function Add() {
        if (isDelete === true) {
            const trashsvg = document.querySelector('#trashsvg'); /*Gets trash svg*/
            const completedbtn = document.querySelectorAll('#round-btn'); /*Gets the blue round div*/
            const iksbtn = document.querySelectorAll('#iks-btn')    /*Gets X div*/

            trashsvg.classList.toggle('animate__jello');
            trashsvg.classList.toggle('red');
            setTimeout(() => { trashsvg.classList.remove('animate__jello'); }, 500)


            completedbtn.forEach((e) => { //All round blue divs opacity is set to 0
                e.classList.toggle('invisible-completed')
            })

            iksbtn.forEach((e) => { //All X shaped divs opacity is set to 1
                e.classList.toggle('invisible-completed')
                e.classList.toggle('rotate')
            })

            numberOfDeletedRef.current.style.opacity = 0;
            trashone.current.style.opacity = 1
            trashtwo.current.style.opacity = 1

            setIsDelete(!isDelete);
        }

        setTodo([...todo, { id: crypto.randomUUID(), value: "", editable: false, completed: false }]);

    }



    return <div name="screen" className="w-screen h-screen bg-gray-200 flex justify-center items-center">

        <div name="top-banner" className="w-screen h-[2.8125rem] py-1 bg-white absolute top-0
         flex justify-between" >
            <div className="h-[35px] w-[35px] ml-4 flex justify-center items-center">
                <div onClick={handleHamburger} id="parent">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </div>

            <div className="flex">

                <div onClick={Add} ref={plus} tabIndex="0" className="cursor-pointer rounded-md hover:bg-gray-200  outline-gray-400">   {/*Plus icon*/}
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none"
                        stroke="#4B8CF7" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="bevel"><line x1="12"
                            y1="3" x2="12" y2="21"></line><line x1="3" y1="12" x2="21" y2="12"></line></svg>
                </div>
                <div className="w-[.125rem] bg-gray-300 py-2 mx-4" name="vertical-line"></div> {/*Vertical Line*/}

                {/*Circle with initialz*/}
                <div onClick={() => { userDropDown.current.classList.toggle('invisible'); userDropDown.current.focus(); }}
                    tabIndex="0" className="rounded-full text-xl text-blue-500 border-[.1875rem] mr-4  w-[2.375rem] h-[2.375rem] flex justify-center items-center cursor-pointer duration-500 hover:border-gray-300 ">
                    {user && firstCharOfUser}
                </div>

                {/*Dropdown window for account*/}

                <div ref={userDropDown} onBlur={() => alert("AWQEW")} className="absolute border-2 right-[25px] top-[50px] bg-white px-2 py-2 shadow-md z-50 invisible focus:bg-red-100">

                    <div className="px-2 py-2 mb-2 rounded-lg  border-2 ">  {/*Name and Email*/}
                        <div className="text-sm font-medium">Name: {user && user.displayName}</div>
                        <div className="text-sm font-medium">Email: {user && user.email}</div>
                    </div>

                    <div className="py-2 px-2 rounded-lg hover:bg-gray-200 text-sm font-medium flex cursor-pointer" > {/*Settings*/}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="bevel"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        <p className="ml-2">Settings</p>
                    </div>

                    <div onClick={handleDarkMode} className="py-2 px-2 rounded-lg hover:bg-gray-200 text-sm font-medium flex cursor-pointer">
                        {darkMode ? <svg className="sun absolute" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="bevel"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg> : <svg className="moon absolute" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="bevel"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>}
                        <p className="ml-7">Theme</p>
                    </div>

                    <div onClick={() => { logout(), navigate('/sign') }} className="py-2 px-2 rounded-lg hover:bg-gray-200 text-sm font-medium flex cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9c1935" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="bevel"><path d="M3 3h18v18H3zM15 9l-6 6m0-6l6 6" /></svg>
                        <p className="ml-2">Log Out</p>
                    </div>
                </div>

            </div>

        </div>

        <div className="bg-white w-[60%] h-[70%] px-[2.1875rem] py-[2.1875rem] drop-shadow-2xl" name="body">

            <div className="flex justify-between mb-4 mx-4">
                <h1 className="text-4xl">Todo List</h1>
                <div onClick={handleTrash} className="w-[45px] h-[45px] rounded-md flex justify-center  
                 items-center hover:bg-gray-200 ">   {/*TRASH ICON*/}
                    <div className="relative">
                        <svg id="trashsvg" className="cursor-pointer animate__animated duration-700" xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                            viewBox="0 0 24 24" fill="none" stroke="#4B8CF7" strokeWidth="1.5" strokeLinecap="butt"
                            strokeLinejoin="bevel"><polyline points="3 6 5 6 21 6"></polyline><path
                                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line ref={trashone} x1="10" y1="11" x2="10" y2="17"></line><line ref={trashtwo} x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                        <p id="numberofdeleted" ref={numberOfDeletedRef} className="animate__animated absolute top-2 left-3.5 font-semibold text-xl text-red-500 cursor-pointer opacity-0">{numberOfDeleted}</p>
                    </div>
                </div>
            </div>

            <div name='scroll' className="h-[85%] border-y-2 border-gray-300 overflow-x-hidden overflow-scroll">

                {/*Print todo-function*/}
                <PrintTodo isDelete={isDelete} setIsDelete={setIsDelete} todo={todo} setTodo={setTodo} plus={plus} numberOfDeleted={numberOfDeleted} setNumberofdeleted={setNumberofdeleted} deletedList={deletedList} setDeletedList={setDeletedList} />
                {/*Print todo-function*/}



            </div>

        </div>

    </div >;
}

export default Todo;
