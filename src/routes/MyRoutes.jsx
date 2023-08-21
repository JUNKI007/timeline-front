import { Route, Routes } from "react-router"
import { BrowserRouter } from 'react-router-dom'
import Template from "../components/template/Template"
import SingUp from "../components/auth/SignUp"
import Login from "../components/auth/Login"
import { useState } from "react"
import Main from "../components/main/Main"

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
            <Route path="/signup" element={<SingUp></SingUp>} />
            <Route element={<Template></Template>}>
                {/* 여기에 각자의 페이지가 들어가야함. (템플릿 적용할 페이지) */}
                <Route path="/" element={<Main></Main>}></Route>
            </Route>
        </Routes>
    </BrowserRouter>

}
export default MyRoutes