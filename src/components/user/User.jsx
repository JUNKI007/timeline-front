import { Fragment, useEffect, useState } from "react"
import { api } from '../../network/api'
import Modal from "./Modal"
import { useDispatch, useSelector } from "react-redux"
import { setSubjects } from '../../feature/subjectSlice';

export default function User() {

    const [showModal, setShowModal] = useState(false)
    const [user, setUser] = useState({
        id: '',
        email: '',
        nickname: '',
        profilePath: ''
    })
    const [addSubject, setAddSubject] = useState({
        name: ""
    });

    const dispatch = useDispatch();
    const mySubjects = useSelector(state => state.subjects.subjects);

    const onAddSubjectHandler = async (e) => {
        e.preventDefault();
        try {
            await api(`/api/v1/subjects/`, 'POST', addSubject)
            getSubjects();
        } catch (error) {
            console.log(error);
            console.log(addSubject)
        }
    }
    const onChangeHandler = (e) => {
        const { value, name } = e.target
        setUser({ ...user, [name]: value })
    }

    const onChangeSubjectHandler = (e) => {
        const { value, name } = e.target
        setAddSubject({ ...addSubject, [name]: value })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            await api(`/api/v1/members/${user.id}`, 'PATCH', user)
        } catch (error) {
            console.log(error);
        }
    }

    const getSubjects =
        async () => {
            try {
                const subjects = await api('/api/v1/subjects/with-member', 'GET')
                //setSubjects(subjects.data);
                console.log(subjects.data)
                dispatch(setSubjects(subjects.data));
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
                        nickname: data.data.nickName,
                        profilePath: data.data.profilePath
                    });
                    console.log(data.data.id)
                }
            } catch (error) {
                console.log(error);
            }
        }
    useEffect(() => {
        getData();
    }, [showModal])

    return (
        <>
            <Fragment>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        {user.profilePath ? <img
                            className="mx-auto h-30 w-100 rounded-md cursor-pointer"
                            src={`http://192.168.0.226:4000/${user.profilePath}`}
                            alt="Your Company"
                            onClick={() => setShowModal(true)}></img> :
                            <img
                                className="mx-auto h-30 w-100 rounded-md cursor-pointer"
                                src={`http://192.168.0.226:4000/profiles\\1692848794647.png`}
                                alt="Your Company"
                                onClick={() => setShowModal(true)}></img>}
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