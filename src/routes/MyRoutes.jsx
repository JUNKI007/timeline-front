import { Route, Routes, BrowserRouter } from "react-router"
import Template from "../components/template/Template"
import Signup from "../components/auth/Signup"
import Login from "../components/auth/Login"
import { useState } from "react"

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
            <Route path="/signup" element={<Signup></Signup>} />
            <Route element={<Template></Template>}>
                {/* 여기에 각자의 페이지가 들어가야함. (템플릿 적용할 페이지) */}
            </Route>
        </Routes>
    </BrowserRouter>

}
export default MyRoutes