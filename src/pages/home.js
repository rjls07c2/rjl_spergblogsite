import React, { Component } from "react";

import BlogHolder from '../blog/blogHolder';

class Home extends Component {
    render() {
        return (
            <div>
                <h2>Welcome to the SpergBlog!</h2>
                <BlogHolder />
            </div>
        );
    }
}

export default Home;