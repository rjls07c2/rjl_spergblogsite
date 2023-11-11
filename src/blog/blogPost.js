import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';


// class BlogPost extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             id: 123,
//             title: "",
//             text: ""
//         }
//     }

    

    // componentWillMount() {
    //     this.getBlogItem();
    // }

    // getBlogItem() {
    //     axios.get(`localhost:4200/api/posts:${this.props.match.params._id}`
    //     ).then(response => {
    //         this.setState({
    //             id: response.data.id,
    //             title: response.data.title,
    //             text: response.data.text
    //         });
    //     }).catch(error => {
    //         console.log("ERROR! getBlogItem", error);
    //     });
    // }
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
            console.log('get response: ', response)
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
   
        // console.log("id: ", this.state.id)
        // const {id, title, text} = this.state;
        return (
            <div className="blogContain">
                {/* <h1>Blog Post at Location {_id}.</h1> */}
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