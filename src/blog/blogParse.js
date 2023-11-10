import React from "react";
import { Link } from "react-router-dom";

export default function(props) {
    const { _id, title, desc, cats, text, postDate, writer } = props.post;
    return (
        <div className="blogPostWrapper">
            <Link to={`/blog/${_id}`}>{title}</Link>
            <p>{desc}</p>
        </div>
    )
}