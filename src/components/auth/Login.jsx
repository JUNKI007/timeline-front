import { useState } from "react"
import { apiNoToken, api } from '../../network/api'
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setState, setMe } from "../../feature/meSlice";


export default function Login() {

    const dispatch = useDispatch()

    //로그인 정보
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    //로그인 정보 SET
    const onChangeHandler = (e) => {
        const { value, name } = e.target
        setUser({ ...user, [name]: value })
    }

    //로그인
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const data = await apiNoToken('/api/v1/members/login', 'POST', user)
            localStorage.setItem('token', data.data)

            dispatch(setState(data))
            nav('/')
        } catch (error) {
            toast.error(error.response.data.message);
        }

        const info = await api('/api/v1/members/me', 'GET')
        console.log(info)
        dispatch(setMe({
            id: info.data.id,
            nickName: info.data.nickName,
            email: info.data.email,
            profilePath: info.data.profilePath
        }));


    }

    //로그인시 이동
    const nav = useNavigate();

    return (
        <>
            <ToastContainer position="top-center" />

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                {/* 로고 */}
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">


                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://blog.kakaocdn.net/dn/bv7hY4/btsr62izhtl/SqGJatsoQiNjLDdadee1a1/img.png"
                        alt="Your Company"
                        style={{ width: '70%', height: '10%' }}
                    />

                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                {/* 이메일 */}
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
                                    onChange={onChangeHandler}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {/* 비밀번호 */}
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={onChangeHandler}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {/* 버튼 */}
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?
                        <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">    Join as a Member</a>
                    </p>
                </div>
            </div>
        </>
    )
}