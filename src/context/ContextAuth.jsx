import { createContext, useEffect, useState } from "react";
import { auth } from '../FIrebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

export const UserContext = createContext();

export const AuthContextProvider = (props) => { //Wrap your Routes with AuthContextProvider

    const [user, setUser] = useState({});
    const [date, setDate] = useState();


    const setDarkMode = () => {
        document.querySelector('body').setAttribute('data-theme', 'dark')
        localStorage.setItem('selectedTheme', 'dark')
    }
    const setLightMode = () => {
        document.querySelector('body').setAttribute('data-theme', 'light')
        localStorage.setItem('selectedTheme', 'light')

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

    return (
        <UserContext.Provider value={{ CreateUser, AddName, setDarkMode, setLightMode, logout, signIn, user }}>
            {props.children}
        </UserContext.Provider>
    )
}