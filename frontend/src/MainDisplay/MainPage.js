import React from 'react';
import "./MainPage.css"
import Sidebar from "./Sidebar";
import Feed from "./Feed";

function MainPage() {
    return (
        <div className="background">
            <section className="app">

            {/*Sidebar*/}
            <Sidebar/>

            {/*Feed*/}
            <Feed/> 

            </section>
        </div>);
}

export default MainPage
