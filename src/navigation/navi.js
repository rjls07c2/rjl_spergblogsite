import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/authSlice";

function Navi() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
    
    return (
        <div className="naviBar">
            <div className="naviBarLeft">
                <NavLink to="/" className={({ isActive }) => isActive ? "naviActive" : "naviLink" } >Home</NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? "naviActive" : "naviLink" } >About</NavLink>
                <NavLink to="/contact" className={({ isActive }) => isActive ? "naviActive" : "naviLink" } >Contact</NavLink>
                {user?.admin ? <NavLink to="/BlogManager" className={({ isActive }) => isActive ? "naviActive" : "naviLink" } >Manage</NavLink> : null}
            </div>
            {user ? 
                <div className="naviBarRight">
                    <p>{user.username}</p>
                    <button className="btn" onClick={onLogout}>Logout</button>
                </div>
            :
                <div className="naviBarRight">
                    <NavLink to="/login" className={({ isActive }) => isActive ? "naviActive" : "naviLink" } >Login</NavLink>
                    <NavLink to="/Register" className={({ isActive }) => isActive ? "naviActive" : "naviLink" } >Register</NavLink>
                </div>
            }
        </div>
    )
}

export default Navi;