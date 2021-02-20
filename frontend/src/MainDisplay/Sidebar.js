import React from 'react'
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import {FaHome, FaUserFriends} from "react-icons/fa";
import {CgProfile, CgLogOut} from "react-icons/cg";
import { Avatar } from "@material-ui/core";
import userPic from "../images/profilePic.png";

function Sidebar() {
    return (
        <div className="sidebar">

            <div className="userInfo"> 
                <Avatar src={userPic}/>
                {/* <img className="user" src={userPic} alt=""/> */}
                <h3>Jaden Nguyen</h3>
            </div>

            {/*SidebarOption*/}
                <SidebarOption active Icon={FaHome} text="Home" />
                <SidebarOption Icon={CgProfile} text="Profile"/>
                <SidebarOption Icon={FaUserFriends} text="Friends"/>
                <SidebarOption Icon={CgLogOut} text="Logout"/>
            
        </div>
    )
}

export default Sidebar
