import { BrowserRouter, Routes, Route } from "react-router-dom";


import {Signup} from "./components/Signup";
import {Login} from "./components/Login"
import { Client } from "./components/ClientOrFreelancer";
import { Home } from "./components/Home";
import { DataProvider } from "./context/DataProvider";
import { Password } from "./components/Password";
import { MyProfile } from "./components/MyProfile";

import { CategoryPage } from "./pages/CategoryPage";
import { JobPage } from "./pages/JobPage";


function App() {
    return (
        <DataProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Client/>}/>
                    <Route path="/signup" element={<Signup/>} />
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/password" element={<Password/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/profile/:id" element={<MyProfile/>}/>
                    <Route path="/category/:category" element={<CategoryPage/>}/>
                    <Route path="/job/:job" element={<JobPage/>}/>
                </Routes>
            </BrowserRouter>
        </DataProvider>
    );
}

export default App;
