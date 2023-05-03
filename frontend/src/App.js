import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Signup} from "./components/Signup";
import {Login} from "./components/Login"
import { Client } from "./components/ClientOrFreelancer";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Client/>}/>
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
