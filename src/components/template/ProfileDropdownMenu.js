import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { api } from '../../network/api';




function ProfileDropdownMenu({ selectedUserId }) {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
    const closeModal = () => {
        setIsOpen(false);
    };


    const [id, setId] = useState()


    const set = (id) => {
        setId(id)

        console.log(id)
    }
    useEffect(() => { set(selectedUserId) }, [])



    const SendFriend = async (id) => {
        try {
            await api(`/api/v1/friends/to/${id}`, 'POST')

            alert("친구신청에 성공했습니다.")
        } catch (error) {
            alert('이미 요청을 보냈거나 이미 친구입니다.');
        }

    }

    return (
        <>
            <div className="relative inline-block text-left">
                <Transition show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        static
                        className="fixed inset-0 z-10 overflow-y-auto"
                        open={isOpen}
                        onClose={closeModal}
                    >
                        <div className="min-h-screen px-4 text-center">
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                            <span
                                className="inline-block h-screen align-middle"
                                aria-hidden="true"
                            >
                                &#8203;
                            </span>
                            <div className="inline-block w-56 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                                <div className="menu-options">
                                    <button
                                        onClick={() => {
                                            navigate(`/mypage/${selectedUserId}`);
                                            closeModal();
                                        }}
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                                        게시글 보기
                                    </button>
                                    <button
                                        onClick={() => SendFriend(id)}
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                                        친구요청보내기
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigate(`/timeline/${selectedUserId}`);
                                            closeModal();
                                        }}
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                                        타임라인 보기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    );
}

export default ProfileDropdownMenu;