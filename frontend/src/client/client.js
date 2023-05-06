import axios from "axios";
import { useEffect } from "react";

// let token=localStorage.getItem("token");

export const client = axios.create({
    baseURL: "http://localhost:9999/",
    headers: {
        Accept: "application/json",
        // authorization:token
    }
})