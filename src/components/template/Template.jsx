import { Outlet } from "react-router"
import MyHeader from "./MyHeader"


const Template = () => {

    return <div>
        {/*  마이헤더 */}
        <MyHeader></MyHeader>

        <Outlet></Outlet>

    </div>


}
export default Template