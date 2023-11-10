import React, { Component } from 'react';
import axios from 'axios';

import BlogForm from '../blog/blogForm';
import BlogSide from '../blog/blogSide';

class BlogManager extends Component {
    constructor() {
        super();

        this.state = {
            blogPosts: [],
            blogToEdit: {}
        };

        this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this);
        this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.clearBlogToEdit = this.clearBlogToEdit.bind(this);
    }

    handleSuccessfulFormSubmission(blogPost) {
        this.getBlogPosts();
    }

    handleFormSubmissionError(error) {
        console.log("ERR: Blog Form Submission! ", error);
    }

    handleEditClick(blogPost) {
        this.setState({
            blogToEdit: blogPost
        });
    }

    handleDeleteClick(blogPost) {
        const config = {
            headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`}
        }
        axios.delete(`http://localhost:4200/api/posts/${blogPost._id}`, config)
        .then(response => {
            this.setState({
                blogPosts: this.state.blogPosts.filter(item => {
                    return item._id !== blogPost._id;
                })
            })

            return response.data;
        }).catch(error => {
            console.log("ERR! Delete BlogPost. ", error)
        })
    }

    clearBlogToEdit() {
        this.setState({
            blogToEdit: {}
        })
    }

    getBlogPosts() {
        axios.get('http://localhost:4200/api/posts')
        .then(response => {
          console.log("response from getBlogPosts", response);
          this.setState({
            blogPosts: [...response.data]
          });
        })
        .catch(error => {
          console.log("ERR: getBlogPosts", error);
        });
    }

    componentDidMount() {
        this.getBlogPosts();
    }


    render() {
        return (
            <div className="blogManagerWrapper">
                <div className='leftColumn'>
                    <BlogForm
                        handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
                        handleFormSubmissionError={this.handleFormSubmissionError}
                        getBlogPosts={this.state.blogPosts}
                        clearBlogToEdit={this.clearBlogToEdit}
                        blogToEdit={this.state.blogToEdit}
                    />
                </div>
                <div className='rightColumn'>
                    <BlogSide
                        data={this.state.blogPosts}
                        handleEditClick={this.handleEditClick}
                        handleDeleteClick={this.handleDeleteClick}
                    />
                </div>
            </div>
        );
    }
}

export default BlogManager;