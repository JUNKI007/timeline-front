import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import Template from "../components/template/Template"
import Singup from "../components/auth/Signup"
import Login from "../components/auth/Login"
import User from "../components/user/User"
import MyHeader from "../components/template/MyHeader"
import MyPage from "../components/mypage/MyPage"


const MyRoutes = () => {

    return <BrowserRouter>
        <MyHeader></MyHeader>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Singup />} />
            <Route path="/user" element={<User />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route element={<Template></Template>}>
                {/* 여기에 각자의 페이지가 들어가야함. (템플릿 적용할 페이지) */}
            </Route>
        </Routes>
    </BrowserRouter>

}
export default MyRoutes