import React from "react";

function PrintSections({ allSections, setTodo, allTodos, setCurrentSection, currentSection, setLoading, loading }) {

    function LoadTodos(e) {
        setLoading(true);
        const a = allTodos.find(event => event.sectionID === e.id)
        const b = a.todos



        console.log("Ovo je b: ", b)
        // console.log("Ovo je todo koji ce da se stampa: ", b)
        setTodo([...b])
        setCurrentSection(e)
    }

    return <div>
        {allSections.map((e, index) => {
            // console.log("OVo je e iz allsections", e)
            return (
                <li key={e.id}>
                    <div onClick={() => LoadTodos(e)} className="w-auto py-[.9375rem] text-font-color text-center border-b-2 border-background-secondary hover:bg-background-secondary cursor-pointer	">{e.name}</div>
                </li>

            )

        })}



    </div>;
}

export default PrintSections;
