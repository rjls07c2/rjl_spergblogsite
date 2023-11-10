import React, { Component } from "react";
import axios from "axios";

import BlogParse from "./blogParse";

class BlogHolder extends Component {
    constructor() {
        super();
        
        this.state = {
            isLoading: false,
            data: []
        };

        this.handleFilter = this.handleFilter.bind(this);
    }

    getBlogPosts() {
        axios.get('http://localhost:4200/api/posts')
        .then(response => {
          this.setState({
            data: response.data
        })
        })
        .catch(error => {
          console.log(error);
        });
    }

    handleFilter(filter) {
        this.setState({
            data: this.state.data.filter(item => {
                return item.cats === filter;
            })
        });
    }

    blogPosts() {
        return this.state.data.map(post => {
            // console.log("post data: ", post);
            return (
                <BlogParse
                    key={post._id} 
                    post={post}
                />
            );
        })
    }

    componentDidMount() {
        this.getBlogPosts();
    }

    render() {
        if (this.state.isLoading) {
            return <div>Now Loading...</div>;
        }

        return (
            <div className="blogHolderWrapper">
                <h3>Category Selectors</h3>
                <div className="blogPostFilterButtons">
                    {/* <div className="blogPostFilterButton">
                        <button className="btn" onClick={() => this.handleFilter("test")}>
                            Test
                        </button>
                    </div>

                    <div className="blogPostFilterButton">
                        <button className="btn" onClick={() => this.handleFilter("testing")}>
                            Testing
                        </button>
                    </div> */}
                    <div className="blogPostFilterButton">
                        <button className="btn" onClick={() => this.handleFilter("edu")}>
                            Education
                        </button>
                    </div>
                    <div className="blogPostFilterButton">
                        <button className="btn" onClick={() => this.handleFilter("work")}>
                            Employment
                        </button>
                    </div>
                    <div className="blogPostFilterButton">
                        <button className="btn" onClick={() => this.handleFilter("people")}>
                            Interpersonal
                        </button>
                    </div>
                    <div className="blogPostFilterButton">
                        <button className="btn" onClick={() => this.handleFilter("fic")}>
                            Fictional
                        </button>
                    </div>
                    <div className="blogPostFilterButton">
                        <button className="btn" onClick={() => this.handleFilter("meta")}>
                            Blog Meta
                        </button>
                    </div>
                </div>

                <h3>Previous Blogs</h3>
                <div className="blogPostsWrapper">
                    {this.blogPosts()}
                </div>
            </div>
        )
    }
}

export default BlogHolder;