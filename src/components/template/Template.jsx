import { Outlet } from "react-router"
import MyHeader from "./MyHeader"
import MainLeftRail from "../main/MainLeftRail"
import RemoteController from "./RemoteController"
import { useSelector } from "react-redux"
import PostModal from "../post/Post"
import AddSubjectModal from "../user/AddSubjectModal"

const Template = () => {
    const openPostingModal = useSelector(state => state.openModal.postingModal_isOpen);
    const openAddSubjectModal = useSelector(state => state.openModal.addSubjectModal_isOpen);

    return <div>
        {/*  마이헤더 */}
        <MyHeader></MyHeader>
        <MainLeftRail></MainLeftRail>
        <RemoteController></RemoteController>
        {openPostingModal && (<PostModal />)}
        {openAddSubjectModal && (<AddSubjectModal />)}
        <Outlet></Outlet>
    </div>
}
export default Template