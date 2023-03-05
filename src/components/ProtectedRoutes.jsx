import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/ContextAuth";



export function ProtectedRoute1(props) {
    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to='/' />
    }
    else return props.children
}

export function ProtectedRoute2(props) {
    const { user } = useContext(UserContext);

    if (user) {
        return <Navigate to='/todo' />
    }
    else return props.children
}


