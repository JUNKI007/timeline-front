import { Fragment, useEffect, useState } from "react"
import { api } from '../../network/api'
import Modal from "./Modal"


export default function User() {

    const [showModal, setShowModal] = useState(false)

    const [user, setUser] = useState({
        id: '',
        email: '',
        nickname: '',
        profilePath: ''
    })

    const onChangeHandler = (e) => {
        const { value, name } = e.target
        setUser({ ...user, [name]: value })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const data = await api(`/api/v1/members/${user.id}`, 'PATCH', user)
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    }
    const getData =
        async () => {
            try {
                const data = await api('/api/v1/members/me', 'GET')
                if (data.status === 200) {
                    setUser({
                        id: data.data.id,
                        email: data.data.email,
                        nickname: data.data.nickName
                    });
                    console.log(data.data)
                }
            } catch (error) {
                console.log(error);
            }
        }
    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Fragment>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-10 w-auto"
                            src={user.profilePath}
                            alt="Your Company"
                            onClick={() => setShowModal(true)}
                        />

                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Profile
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={onSubmitHandler}>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder={user.email}
                                        onChange={onChangeHandler}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        nickname
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="nickname"
                                        type="text"
                                        placeholder={user.nickname}
                                        onChange={onChangeHandler}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <Modal isvisible={showModal} onClose={() => setShowModal(false)}></Modal>
            </Fragment>
        </>
    )
}