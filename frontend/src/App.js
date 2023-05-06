import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Signup} from "./components/Signup";
import {Login} from "./components/Login"
import { Client } from "./components/ClientOrFreelancer";
import { Home } from "./components/Home";
import { DataProvider } from "./context/DataProvider";
import { Password } from "./components/Password";
import { MyProfile } from "./components/MyProfile";


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
                    <Route path="/myprofile" element={<MyProfile/>}/>
                </Routes>
            </BrowserRouter>
        </DataProvider>
    );
}

export default App;
