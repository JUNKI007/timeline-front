import { Route, Routes, BrowserRouter } from "react-router-dom"
import Template from "../components/template/Template"
import Login from "../components/auth/Login"
import 'boxicons/css/boxicons.min.css'
import Main from "../components/main/Main"
import SignUp from "../components/auth/SignUp"
import HotPost from "../components/hotpost/HotPost"
import User from "../components/user/User"
import MyPage from "../components/mypage/MyPage"
import { useState } from 'react';



const MyRoutes = () => {
    const [me, setMe] = useState({
        id: '',
        money: '',
        name: '',
        token: '',
    })

    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login></Login>} />
            <Route path="/signup" element={<SignUp></SignUp>} />
            <Route element={<Template></Template>}>
                <Route path='/' element={<Main />} />
                <Route path="/user" element={<User />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/hotpost" element={<HotPost></HotPost>} />
            </Route>
        </Routes>
    </BrowserRouter>

}
export default MyRoutes