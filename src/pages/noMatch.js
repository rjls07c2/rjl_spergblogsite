import React from "react";
import { Link } from "react-router-dom";

export default function() {
    return (
        <div className="errorPage">
            <h2>NO SUCH PAGE!</h2>
            <Link className="errorReturn" to="/">GO HOME</Link>
        </div>
    )
}