import { Outlet } from "react-router"
import Header from "./Header"

const Template = () => {

    return <div>
        {/*  마이헤더 */}
        <Header></Header>
        <Outlet></Outlet>

    </div>


}
export default Template