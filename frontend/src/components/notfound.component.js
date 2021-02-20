import React from "react";
import axios from 'axios';
axios.defaults.withCredentials = true;

export default function NotFound() {
    return (
        <div>404: Page Not Found</div>
           );
}