import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';


    const BlogPost = (props) => {
        const [title, setTitle ] = useState(props.title)
        const [text, setText] = useState(props.text)
       let { _id } = useParams();
       console.log("id passed in: ", _id)

    const [data, setData] = useState();

    const getPost = async () => {
        let thePost = await
        axios.get(`https://rjl-spergblogbackend-08fe3b62e5a0.herokuapp.com/api/posts/${_id}`)
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
        console.log("ERR! Foo",error);
        });
       
    }

    console.log("blog post get: ", data);

    useEffect( () => {
        getPost()
        }
    , [])
   
        return (
            <div className="blogContain">
                {data ?  
                <div className="blogDisplay">
                    <h2>{data.title}</h2>
                    <pre>{data.text}</pre>
                </div>
                :
                null}
            </div>
        )
    
}

export default BlogPost;