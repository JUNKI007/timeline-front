import React from "react";
import { api } from "../../network/api";
import { useState } from "react";

const Modal = ({ isvisible, onClose }) => {


    const [imgFile, setImgFile] = useState({
        img: '',
        url: '',
        istrue: false
    });

    if (!isvisible) { return null; }

    const handleClose = (e) => {
        if (e.target.id === 'wrapper') onClose();
    };




    const handleChangeFile = (e) => {
        const files = e.target.files[0]

        setImgFile({ img: files, url: URL.createObjectURL(files), istrue: true })
    }

    const WriteBoard = () => {
        const fd = new FormData();
        fd.append("file", imgFile.img)
        console.log(fd)
        api('/api/v1/members/changeProfile', "POST", fd
        ).then((response) => {

            onClose()
            if (response.data) {
            }
        })
            .catch((error) => {
                console.log(api.url)
            })


    }


    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" id="wrapper" onClick={handleClose}>
            <div className="w-[600px] bg-white rounded shadow-lg p-4">
                <button className="text-gray-500 text-xl ml-auto" onClick={onClose}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                {imgFile && (
                    <div className="rounded overflow-hidden">
                        <img src={imgFile.url} alt="Selected" className="max-w-full h-auto" />
                    </div>
                )}
                <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Select a file:</label>
                    <input type="file" name="file" className="border rounded p-2 w-full" onChange={handleChangeFile}></input>
                </div>
                <div className="mt-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={WriteBoard}>Upload File</button>
                </div>
            </div>
        </div>
    )
}

export default Modal