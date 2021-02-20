import React from 'react';
import "./PostBox.css"
import { Avatar, Button} from "@material-ui/core";
import userPic from "../images/profilePic.png";

function PostBox() {
    return (
        <div className="postBox">
            <form>
                <div className="postBox__input">
                    <Avatar src={userPic}/>
                    <input placeholder="What's New..." type="text" />
                    {/* <input placeholder="Enter image URL" type="text" /> */}
                </div>
                <Button className="postBox__postButton">Post</Button>
            </form>   
        </div>
    )
}

export default PostBox
