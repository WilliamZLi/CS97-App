import React from 'react';
import "./Feed.css";
import PostBox from "./PostBox";
import Post from "./Post";

function Feed() {
    return (
        <div className="feed">
            {/* Header */}
            <div className="feed__header">
                <h2>Home</h2>
            </div>
            <div className="feed__content">
                {/* Postbox */}
                <PostBox />
                <Post />
                <Post />
                <Post />
            </div>

        </div>
    )
}

export default Feed
