import React, { useRef, useState } from "react";

function PrintTodo({ isDelete, todo, setTodo, plus }) {

    const input = useRef('input');
    const [txtInput, setTxtInput] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [shouldBlur, setShouldBlur] = useState(true);
    const [deletedList, setDeletedList] = useState([])
    const iks = useRef([]);

    function handleO() {
        alert("Kliknuo si plavo dugme");


    }
    function handleX(e, index) {

        console.log(iks.current[index])
        iks.current[index].style.transform = 'rotate(-90deg)';
        setDeletedList([...deletedList, e.id]);

    }
    function deleting() {

    }

    function handlePrint(object) {
        let a = todo.filter((e => e.id != object.id)) //Removes the placeholder todo
        setTodo([...a, { id: object.id, value: txtInput, editable: true, completed: false }]) //Prints the todo with value from placeholder todo
        input.current.style.pointerEvents = "none"
        console.log("Ovo je txt input: ", txtInput)
        plus.current.focus();


        if (txtInput == '') {   //If the placeholder is with no value its deleted
            a = todo.filter((e => e.id != object.id))
            setTodo([...a])
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
    function inputBlur(object) {
        setShouldBlur(true)
        if (shouldBlur) {
            console.log("loguje se blur")
            handlePrint(object)
        } else return null
    }

    return (
        <>
            {todo.map((e, index) => {
                return (
                    <li key={index}>
                        <div name='paste' onClick={isDelete ? () => handleX(e, index) : null} className="flex mx-4 py-4 items-center border-b-2">  {/*Todo-part of code*/}

                            <div id="complete-btn" className="mr-1.5 py-2 translate-y-[2px] cursor-pointer	"> {/*Completed O and X button*/}

                                <div id="round-btn" onClick={handleO}>
                                    <div id="round-fill-btn"></div>
                                </div>

                                <div ref={(el) => (iks.current[index] = el)} id="iks-btn" className="invisible-completed">
                                    <div id="iks1-btn"></div>
                                    <div id="iks2-btn"></div>
                                </div>

                            </div>

                            <input /*onKeyDown={(event) => downEnter(event, e)}*/ onBlur={() => { inputBlur(e) }} onChange={(e) => setTxtInput(e.target.value)} ref={input} type="text" readOnly={e.editable} className="w-full focus:outline-none text-2xl"
                                placeholder="enter todo..." autoFocus />
                        </div>
                    </li>
                )
            })}


        </>
    )
}

export default PrintTodo;
