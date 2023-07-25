import { Route, Routes } from "react-router-dom"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login.js"
import { Register } from "./auth/Register.js"
import "./Whatsinthepantry.css"


export const Whatsinthepantry = () => {
  return <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route path="*" element={
        <>
          <NavBar />
          <ApplicationViews />
        </>
    } />
  </Routes>
}

