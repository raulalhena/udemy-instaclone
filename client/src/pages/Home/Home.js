import React from 'react';
import useAuth from "../../hooks/useAuth";
import "./Home.scss"

export default function () {
    const auth = useAuth();
    console.log(auth);

    return (
        <div>
            <h1>Estamos en Home</h1>
        </div>
    )
}
