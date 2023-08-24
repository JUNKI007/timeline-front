import { Outlet } from "react-router"
import MyHeader from "./MyHeader"
import MainLeftRail from "../main/MainLeftRail"
import RemoteController from "./RemoteController"
const Template = () => {
    return <div>
        {/*  마이헤더 */}
        <MyHeader></MyHeader>

        <MainLeftRail></MainLeftRail>
        <RemoteController></RemoteController>


        <Outlet></Outlet>
    </div>
}
export default Template