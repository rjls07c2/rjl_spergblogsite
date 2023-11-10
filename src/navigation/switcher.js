import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "../pages/home";
import About from "../pages/about";
import Contact from "../pages/contact";
import BlogManager from "../pages/blogManager";
import BlogAdder from "../pages/blogAdder";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BlogPost from "../blog/blogPost";
import NoMatch from "../pages/noMatch";

function Switcher() {

    const { user } = useSelector((state) => state.auth)

    function adminOnly() {
        return (
            <Route path="/BlogManager" element={<BlogManager />} />
        )
    }    

    return (
        <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              {user?.admin ? adminOnly() : null}
              <Route path="/BlogAdder" element={<BlogAdder />} />
              <Route path="/login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/blog/:_id" element={<BlogPost />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
            <Outlet />
        </div>
    )
}

export default Switcher;