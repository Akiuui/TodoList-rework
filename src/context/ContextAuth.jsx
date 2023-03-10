import { createContext, useEffect, useState } from "react";
import { auth, db } from '../FIrebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { collection, setDoc, addDoc } from "firebase/firestore";

export const UserContext = createContext();

export const AuthContextProvider = (props) => { //Wrap your Routes with AuthContextProvider

    const [user, setUser] = useState({});
    const [date, setDate] = useState();
    const [dark, setDark] = useState()



    const setDarkMode = () => {
        document.querySelector('body').setAttribute('data-theme', 'dark')
        localStorage.setItem('selectedTheme', 'dark')
        setDark(true)
    }
    const setLightMode = () => {
        document.querySelector('body').setAttribute('data-theme', 'light')
        localStorage.setItem('selectedTheme', 'light')
        setDark(false)
    }

    function CreateUser(email, password) {
        console.log("User is Created")
        return createUserWithEmailAndPassword(auth, email, password)
    }
    function AddName(name) {
        console.log("Added name")
        return updateProfile(auth.currentUser, { displayName: name })
    }
    function logout() {  //Logs out user out of site
        console.log("User is logged out")
        return signOut(auth)
    }
    const signIn = (email, password) => {   //Signs in user into site
        return signInWithEmailAndPassword(auth, email, password)
    }
    useEffect(() => {   //Gets users data everytime site loads

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

            setUser(currentUser)

        })
    }, [])

    /*DATA BASE FIREBASE*/

    const object = {
        name: 'Aleksa',
        surname: 'Stojanovic'
    }

    function AddToDB(content) {
        return setDoc(collection(db, 'asd'), content)
    }



    return (
        <UserContext.Provider value={{ CreateUser, AddName, setDarkMode, setLightMode, logout, signIn, user, dark, setDark, AddToDB }}>
            {props.children}
        </UserContext.Provider>
    )
}