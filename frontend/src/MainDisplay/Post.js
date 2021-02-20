import React from 'react';
import { Avatar, Button} from "@material-ui/core";
import userPic from "../images/profilePic.png";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import "./Post.css";

function Post({name, text, image, avatar}) {
    return (
        <div className="post">      
            <div className="post__avatar">
                <Avatar src={userPic}/>
            </div>
            <div className="post__body">
                <div className="post__header">
                    <div className="post__headerText">
                        <h3> 
                            Jaden Nguyen
                        </h3>
                    </div>
                    <div className="post__headerDescription">
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                    </div>

                </div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/2019_UCLA_Royce_Hall_2.jpg"  alt=""/>

                <div className="post__footer"> 
                    <ChatBubbleOutlineIcon fontSize="small" />
                    <RepeatIcon fontSize="small" />
                    <FavoriteBorderIcon fontSize="small" />
                    <PublishIcon fontSize="small" />
                </div>
            </div>
        </div>
    )
}

export default Post
