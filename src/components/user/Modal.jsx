import React from "react";
import { api } from "../../network/api";
import { useState } from "react";

const Modal = ({ isvisible, onClose }) => {


    const [imgFile, setImgFile] = useState(null);

    if (!isvisible) { return null; }

    const handleClose = (e) => {
        if (e.target.id === 'wrapper') onClose();
    };




    const handleChangeFile = (e) => {
        setImgFile(e.target.files)
    }

    const WriteBoard = async () => {
        const fd = new FormData();
        Object.values(imgFile).forEach((file) => fd.append("file", file));
        await api('/api/v1/posts/', "POST", fd, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }

        }).then((response) => {
            if (response.data) {
                console.log(response.data)
            }
        })
            .catch((error) => {
                console.log(api.url)
            })
    }


    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
            id='wrapper'
            onClick={handleClose}>
            <div className="w-[600px] flex flex-col">
                <button className="bg-white text-xl place-self-end" onClick={() => onClose()}>X</button>
                <div className="bg-white p-2 rounded">
                    <input type="file" onChange={handleChangeFile}></input>
                    <button onClick={WriteBoard}>asdsadsdas</button>
                </div>
            </div>
        </div>
    )
}

export default Modal