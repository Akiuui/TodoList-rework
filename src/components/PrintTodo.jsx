import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { UserContext } from '../context/ContextAuth'

function PrintTodo({ isDelete, todo, setTodo, plus, setNumberofdeleted, numberOfDeleted, deletedList, setDeletedList, completedTodo, setCompletedTodo }) {


    /*STATES*/
    const [txtInput, setTxtInput] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [shouldBlur, setShouldBlur] = useState(true);
    const [showDots, setShowDots] = useState(false);
    const [showDotsDropDown, setShowDotsDropDown] = useState(false);
    const [shouldShowNotif, setShouldShowNotif] = useState(false)

    const [currentElement, setCurrentElement] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dotsAreClicked, setDotsAreClicked] = useState(false)
    /*REFS*/
    const input = useRef('input');
    const iks = useRef([]);
    const iks1 = useRef([]);
    const iks2 = useRef([]);
    const inputref = useRef([]);
    const parent = useRef([])
    const dotsref = useRef([])
    const dotsDropDownRef = useRef([])
    /*CONTEXT*/;
    const { dark, setDark } = useContext(UserContext);



    useEffect(() => {

        if (dotsref.current[currentIndex] !== undefined)
            dotsref.current[currentIndex].classList.toggle('invisible')

    }, [showDots])

    useEffect(() => {

        if (dotsDropDownRef.current[currentIndex] !== undefined)
            dotsDropDownRef.current[currentIndex].classList.toggle('invisible')

    }, [showDotsDropDown])

    useEffect(() => {
        console.log("Rerenderovalo se")

    }, [todo]);

    function leaveDots() {
        if (!isDelete)
            if (!dotsAreClicked)
                setShowDots(false)

        // if (!isDelete)
        //     return null
        // setShowDots(false)
    }

    function handleO(object) {
        const currentDate = new Date();
        const hours = currentDate.getHours()
        const minutes = currentDate.getMinutes()


        setCompletedTodo([...deletedList, { id: object.id, value: object.id, editable: false, completed: true, hours: hours, minutes: minutes }])




        const a = todo.filter(e => e.id != object.id)//Filters into a all elements that dont match the target id
        setTodo(a);

        toast('Completed!', {
            icon: '👏',
            duration: 1000,
            className: "bg-background-primary text-font-color border-2 border-background-secondary"
        });
    }

    function handleEdit(object, index) {
        const b = !object.editable
        const f = [...todo]
        setShouldShowNotif(true)
        inputref.current[index].style.pointerEvents = "all"

        f.splice(index, 1, { "id": object.id, "value": object.value, "completed": object.completed, "editable": b })

        inputref.current[index].focus();

        setTodo(f)
    }
    function Delete(object) {
        const a = todo.filter(e => e.id != object.id)//Filters into a all elements that dont match the target id
        setTodo(a);

    }

    function handleX(e, index) {
        if (isDelete === true) {
            iks.current[index].style.transform = 'rotate(0deg)'
            inputref.current[index].style.transition = '1s all'
            inputref.current[index].style.color = 'gray'

            iks2.current[index].style.transition = 'opacity .1s ease-out, transform 1s'
            iks2.current[index].style.opacity = '0'
            iks2.current[index].style.transitionDelay = '1s'
            iks2.current[index].style.transform = 'translateY(100px)'


            iks1.current[index].style.transitionDelay = '1.5s'
            // iks1.current[index].style.transition = '1.5s'

            // iks1.current[index].style.width = '100px'
            // iks1.current[index].style.transform = 'translateX(100px)'
            iks1.current[index].style.transformOrigin = 'right'

            //     transform - origin: bottom left;
            // transform: scaleX(10);


            parent.current[index].style.pointerEvents = 'none'
            setNumberofdeleted(deletedList.length + 1)

        } else {
            console.log("QWEqwe")
        }
        // iks1.current[index].style.height = '4px'

        setDeletedList([...deletedList, e.id]);

    }

    function handlePrint(object, index) {
        let a = todo.filter((e => e.id != object.id)) //Removes the placeholder todo
        setTodo([...a, { id: object.id, value: txtInput, editable: true, completed: false }]) //Prints the todo with value from placeholder todo
        inputref.current[index].style.pointerEvents = "none"
        console.log("Ovo je txt input: ", txtInput)
        plus.current.focus();



        if (shouldShowNotif) {
            toast.success('Successfully saved!', {
                position: "bottom-left",
                className: "bg-background-primary text-font-color border-2 border-background-secondary"

            })
            setShouldShowNotif(false)
        }


        if (txtInput == '') {   //If the placeholder is with no value its deleted
            if (!shouldShowNotif) {
                a = todo.filter((e => e.id != object.id))
                setTodo([...a])

            }
        }

        setTxtInput('');
    }
    // function downEnter(event, object) {
    //     if (event.key !== 'Enter') {
    //         return null
    //     }
    //     handlePrint(object)
    //     setShouldBlur(false)
    // }
    function inputBlur(object, index) {
        setShouldBlur(true)
        if (shouldBlur) {
            console.log("loguje se blur")
            handlePrint(object, index)
        } else return null
    }

    return (
        <>
            {todo.map((e, index) => {
                return (
                    <li key={e.id}>
                        {/*Todo-part of code*/}
                        <div name='paste' ref={(el) => (parent.current[index] = el)}
                            onMouseEnter={!isDelete ? () => { setCurrentElement(e); setCurrentIndex(index); setShowDots(true); console.log("Aaaaa") } : null}
                            onMouseLeave={leaveDots}
                            onClick={isDelete ? () => handleX(e, index) : null}
                            className="flex mb-[10px] py-4 items-center border-b-2 border-background-secondary relative"
                        >


                            <div id="complete-btn" className="mr-1.5 py-2 translate-y-[2px] cursor-pointer	"> {/*Completed O and X button*/}

                                <div id="round-btn" onClick={() => handleO(e)}>
                                    <div id="round-fill-btn"></div>
                                </div>

                                <div ref={(el) => (iks.current[index] = el)} id="iks-btn" className="invisible-completed">
                                    <div ref={(el) => (iks1.current[index] = el)} id="iks1-btn"></div>
                                    <div ref={(el) => (iks2.current[index] = el)} id="iks2-btn"></div>
                                </div>

                            </div>

                            <input ref={(el) => (inputref.current[index] = el)} /*onKeyDown={(event) => downEnter(event, e)}*/
                                onBlur={() => { inputBlur(e, index) }} onChange={(e) => setTxtInput(e.target.value)} type="text"
                                readOnly={e.editable} className="w-full text-font-color focus:outline-none text-2xl bg-transparent"
                                placeholder="enter todo..." autoFocus
                            />



                            <span>
                                {/*three dots for editing*/}
                                <div onClick={() => { setTimeout(() => dotsDropDownRef.current[index].focus(), 300); setShowDotsDropDown(true); setShowDots(true); setDotsAreClicked(true); }}
                                    ref={(el) => (dotsref.current[index] = el)} className="bg-background-secondary w-[2rem] h-[30%] flex justify-center items-center rounded-lg translate-x-[-10px] cursor-pointer invisible">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--font-color)" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="bevel"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                                </div>

                                {/*Drop-down for three dots*/}
                                <div tabIndex="0" ref={(el) => (dotsDropDownRef.current[index] = el)} onBlur={() => { setDotsAreClicked(false); setShowDotsDropDown(false); setShowDots(false); }} className="w-[15%] h-fit bg-background-primary fixed px-2 py-2 shadow-2xl border-2 border-background-secondary duration-300 invisible">
                                    <div onClick={() => handleEdit(e, index)} className="py-2 px-2 rounded-lg hover:bg-background-secondary text-sm font-medium flex cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--font-color)" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="bevel"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                                        <p className="ml-2 text-font-color">Edit</p>
                                    </div>
                                    <div className="py-2 px-2 rounded-lg hover:bg-background-secondary text-sm font-medium flex cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--font-color)" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="bevel"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                                        <p className="ml-2 text-font-color">Priority</p>
                                    </div>
                                    <div onClick={() => Delete(e)} className="py-2 px-2 rounded-lg hover:bg-background-secondary text-sm font-medium flex cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--font-color)" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="bevel"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                        <p className="ml-2 text-font-color">Delete</p>
                                    </div>
                                </div>

                            </span>


                        </div>
                    </li>
                )
            })}


        </>
    )
}

export default PrintTodo;
