import React from 'react';
import { Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import ImageNoFound from "../../../assets/png/avatar.png";
import "./RighHeader.scss";

export default function RighHeader() {
    const { auth } = useAuth();

    return (
       <>
            <div className="right-header">
                <Link to="/">
                    <Icon name="home" />
                </Link>
                    <Icon name="plus"/>
                <Link to={`/${auth.username}`}>
                    <Image src={ImageNoFound} avatar />
                </Link>
            </div>
       </>
    )
}
