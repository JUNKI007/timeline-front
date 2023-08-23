
import User from "../components/user/User"
import MyPage from "../components/mypage/MyPage"
import { Route, Routes, BrowserRouter } from "react-router-dom"
import Template from "../components/template/Template"
import Singup from "../components/auth/Signup"
import Login from "../components/auth/Login"
import { useState } from "react"
import 'boxicons/css/boxicons.min.css'
import Main from "../components/main/Main"
import MyHeader from "../components/template/MyHeader"
const MyRoutes = () => {

    return <BrowserRouter>
        <MyHeader></MyHeader>
        <Routes>
            <Route path="/user" element={<User />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/login" element={<Login></Login>} />
            <Route path="/signup" element={<Singup></Singup>} />
            <Route element={<Template></Template>}>
                 <Route path='/' element={<Main/>}/>
            </Route>
        </Routes>
    </BrowserRouter>

}
export default MyRoutes