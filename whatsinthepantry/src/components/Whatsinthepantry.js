import { Route, Routes } from "react-router-dom"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login.js"
import { Register } from "./auth/Register.js"
import "./Whatsinthepantry.css"
import { Authorized } from "./views/Authorized.js"


export const Whatsinthepantry = () => {
  return <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={
      <Authorized>
        <>
          <NavBar />
          <ApplicationViews />
        </>
      </Authorized>
    } />
  </Routes>
}

