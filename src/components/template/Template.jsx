import { Outlet } from "react-router"
import MyHeader from "./MyHeader"
import MainLeftRail from "../main/MainLeftRail"
import RemoteController from "./RemoteController"
import { useSelector } from "react-redux"
import PostModal from "../post/Post"

const Template = () => {
    const openPostingModal = useSelector(state => state.openPostingModal.isOpen);

    return <div>
        {/*  마이헤더 */}
        <MyHeader></MyHeader>
        <MainLeftRail></MainLeftRail>
        <RemoteController></RemoteController>
        {openPostingModal && (<PostModal />)}
        <Outlet></Outlet>
    </div>
}
export default Template