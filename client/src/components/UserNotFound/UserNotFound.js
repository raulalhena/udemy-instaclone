import React from 'react';
import { Link } from "react-router-dom";
import "./UserNotFound.scss";

export default function UserNotFound() {
    return (
        <div className="user-not-found">
            <p>Usuario no existe</p>
            <p>Es posible que el link que has seguido es incorrecto o el usuario se ha eliminado.</p>
            <Link to="/">Volver a Home</Link>
        </div>
    )
}
