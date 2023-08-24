import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router';


function ProfileDropdownMenu({ selectedUserId }) {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
    const closeModal = () => {
        setIsOpen(false);
    };

    return (
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
                                    Mypage로 이동하기
                                </button>
                                <button
                                    onClick={() => {
                                        // 친구 요청을 보내는 로직을 구현합니다.
                                        // 이곳에서 API 호출이 필요할 수 있습니다.
                                        // closeModal();
                                    }}
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                                    친구요청보내기
                                </button>
                                <button
                                    onClick={() => {
                                    }}
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                                    신고하기
                                </button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}

export default ProfileDropdownMenu;