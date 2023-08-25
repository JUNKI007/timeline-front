import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom"
import Template from "../components/template/Template"
import Login from "../components/auth/Login"
import 'boxicons/css/boxicons.min.css'
import Main from "../components/main/Main"
import SignUp from "../components/auth/SignUp"
import HotPost from "../components/hotpost/HotPost"
import User from "../components/user/User"
import MyPage from "../components/mypage/MyPage"
import { useState } from 'react';
import { useSelector } from "react-redux";


const MyRoutes = () => {
    const user = useSelector((state) => state.me);
    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login></Login>} />
            <Route path="/signup" element={<SignUp></SignUp>} />
            {user.token === '' ? (
                <Route path="*" element={<Navigate to="/login" />} />
            ) : (
                <Route element={<Template />}>
                    <Route path="/" element={<Main />} />
                    <Route path="/user/:userId" element={<User />} />
                    <Route path="/mypage/:userId" element={<MyPage />} />
                    <Route path="/hotpost" element={<HotPost />} />
                </Route>
            )}
        </Routes>
    </BrowserRouter>

}
export default MyRoutes