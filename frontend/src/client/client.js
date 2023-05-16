import axios from "axios";
import { useEffect } from "react";

let token=localStorage.getItem("token");

export const client = axios.create({
    baseURL: "http://localhost:9999/",
    // baseURL:"https://meet-backend-0p25.onrender.com",
    headers: {
        Accept: "application/json",
        authorization:`Bearer ${token}`
    }
})