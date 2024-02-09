import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "../Home/Home"
import { Login } from "../Login/Login"
import { NuestrosArtistas } from "../NuestrosArtistas/NuestrosArtistas"
import { Profile } from "../Profile/Profile"
import { Register } from "../Register/Register"

export const Body = () =>{

    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/artists" element={<NuestrosArtistas />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </>
    )
}