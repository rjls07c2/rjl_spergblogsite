import React, { Component } from 'react';

import axios from 'axios';

export default class BlogForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            desc: "",
            cats: "",
            text: "",
            editMode: false,
            apiUrl: "https://rjl-spergblogbackend-08fe3b62e5a0.herokuapp.com/api/posts/",
            apiAction: 'post'
        };

        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidUpdate() {
        if (Object.keys(this.props.blogToEdit).length > 0) {
            const {_id, title, desc, cats, text } = this.props.blogToEdit;
            this.props.clearBlogToEdit();
            this.setState({
                _id: _id,
                title: title || "",
                desc: desc || "",
                cats: cats || "",
                text: text || "",
                editMode: true,
                apiUrl: `https://rjl-spergblogbackend-08fe3b62e5a0.herokuapp.com/api/posts/${_id}`,
                apiAction: 'put'
            });
        }
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        axios({
            method: this.state.apiAction,
            url: this.state.apiUrl,
            data: {
                _id: this.state._id || null,
                title: this.state.title,
                desc: this.state.desc,
                cats: this.state.cats,
                text: this.state.text
                // writer: LOGGED_IN_USER
            },
            headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`}
        }).then(response => {
            if (response.status === 200) {
                this.props.handleSuccessfulFormSubmission();
            }
        }).catch(error => {
            console.log('submit error: ', error)
            this.props.handleFormSubmissionError(error);
        });

        this.setState({
            _id: null,
            title: "",
            desc: "",
            cats: "",
            text: "",
            editMode: false,
            apiUrl: "https://rjl-spergblogbackend-08fe3b62e5a0.herokuapp.com/api/posts/",
            apiAction: 'post'
        })

        event.preventDefault();
    }

    render() {
        return (
            <div className='blogFormLeft'>
                <h2>New Blog Post</h2>
                <form className='blogFormInner' onSubmit={this.handleSubmit}>
                    <input
                        className='blogFormItem'
                        type="text"
                        name="title"
                        placeholder="Blog Title"
                        value={this.state.title}
                        onChange={this.handleChange}
                    />
                    <input
                        className='blogFormItem'
                        type="text"
                        name="desc"
                        placeholder="Blog Description"
                        value={this.state.desc}
                        onChange={this.handleChange}
                    />
                    <input
                        className='blogFormItem'
                        type="text"
                        name="cats"
                        placeholder="Blog Category"
                        value={this.state.cats}
                        onChange={this.handleChange}
                    />
                    <textarea
                        className='blogFormItem'
                        type="text"
                        name="text"
                        placeholder="Blog Text Goes Here"
                        value={this.state.text}
                        onChange={this.handleChange}
                    />
                    <div>
                        <button className='btn' type="submit">Save</button>
                    </div>
                </form>
            </div>
        );
    }
}